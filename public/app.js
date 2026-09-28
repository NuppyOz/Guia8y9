const API = 'http://localhost:5000/api';
const loginSection = document.getElementById('login-section');
const appSection = document.getElementById('app-section');
const spinner = document.getElementById('spinner');
const mensaje = document.getElementById('mensaje');
const setLoading = (value) => { spinner.hidden = !value; };
const token = () => localStorage.getItem('jwt_token');

function mostrarApp() { loginSection.hidden = true; appSection.hidden = false; cargarLineasInvestigacion(); }
function cerrarSesion() { localStorage.removeItem('jwt_token'); appSection.hidden = true; loginSection.hidden = false; }

document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault(); setLoading(true); mensaje.textContent = '';
  try {
    const response = await fetch(`${API}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email:email.value, password:password.value }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg || 'No fue posible iniciar sesión');
    localStorage.setItem('jwt_token', data.token); mostrarApp();
  } catch (error) { mensaje.textContent = error.message; } finally { setLoading(false); }
});

async function cargarLineasInvestigacion() {
  setLoading(true);
  try {
    const response = await fetch(`${API}/lineas`, { headers:{Authorization:`Bearer ${token()}`} });
    if (response.status === 401) return cerrarSesion();
    if (!response.ok) throw new Error('No fue posible cargar las líneas');
    const lineas = await response.json();
    const contenedor = document.getElementById('lista-lineas'); contenedor.innerHTML = '';
    lineas.forEach((linea) => {
      const card = document.createElement('article'); card.className = 'card';
      const h3 = document.createElement('h3'); h3.textContent = linea.nombre;
      const p = document.createElement('p'); p.textContent = `Código: ${linea.codigo}`;
      const btn = document.createElement('button'); btn.textContent = 'Eliminar'; btn.addEventListener('click', () => eliminarLinea(linea._id));
      card.append(h3,p,btn); contenedor.appendChild(card);
    });
  } catch (error) { mensaje.textContent = error.message; } finally { setLoading(false); }
}

document.getElementById('formLinea').addEventListener('submit', async (e) => {
  e.preventDefault(); setLoading(true);
  try {
    const response = await fetch(`${API}/lineas`, { method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${token()}`}, body:JSON.stringify({nombre:nombreLinea.value,codigo:codigoLinea.value}) });
    if (response.status === 401) return cerrarSesion();
    if (response.status !== 201) throw new Error('No fue posible crear la línea');
    e.target.reset(); await cargarLineasInvestigacion(); mensaje.textContent = 'Línea creada';
  } catch (error) { mensaje.textContent = error.message; } finally { setLoading(false); }
});

async function eliminarLinea(id) {
  if (!confirm('¿Está seguro de eliminar esta línea?')) return;
  setLoading(true);
  try {
    const response = await fetch(`${API}/lineas/${id}`, { method:'DELETE', headers:{Authorization:`Bearer ${token()}`} });
    if (response.status === 401) return cerrarSesion();
    if (!response.ok) throw new Error('No fue posible eliminar la línea');
    await cargarLineasInvestigacion(); mensaje.textContent = 'Línea eliminada';
  } catch (error) { mensaje.textContent = error.message; } finally { setLoading(false); }
}

document.getElementById('logout').addEventListener('click', cerrarSesion);
if (token()) mostrarApp();
