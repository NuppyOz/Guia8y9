# Laboratorio 8 y 9 - Intercambio de datos - Realizado por Luisa Téllez y Stephanie Tenorio

Implementación basada en las tareas independientes de la guía suministrada: autenticación con JWT, validación de registro, ruta protegida, CRUD REST de líneas de investigación, CRUD de estudiantes relacionado con líneas mediante ObjectId y `populate()`, colección Postman e integración frontend-backend con Fetch, indicador de carga, creación asíncrona y logout.

## Requisitos

- Node.js
- MongoDB local disponible en `mongodb://127.0.0.1:27017`
- Postman (para importar la colección)

## Ejecución

1. Copiar `.env.example` como `.env` y reemplazar `JWT_SECRET`.
2. Ejecutar `npm install`.
3. Asegurar que MongoDB esté iniciado.
4. Ejecutar `npm start`.
5. Backend: `http://localhost:5000`.
6. Para respetar exactamente el CORS propuesto por la guía, servir `public/` desde `http://127.0.0.1:5500` (por ejemplo, Live Server). También puede cambiarse `FRONTEND_ORIGIN` en `.env`.

## Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile` (JWT)
- `GET|POST /api/lineas` (JWT)
- `PUT|DELETE /api/lineas/:id` (JWT)
- `GET|POST /api/estudiantes` (JWT)
- `GET|PUT|DELETE /api/estudiantes/:id` (JWT)

## Postman

Importar `postman/API_Tesis_UNI.postman_collection.json`. La petición Login guarda automáticamente `token`; Crear línea guarda `lineaId`; Crear estudiante guarda `estudianteId`.

Orden recomendado: Registrar -> Login -> Perfil -> Crear línea -> Listar/Actualizar línea -> Crear estudiante -> Obtener estudiante con populate -> Actualizar/Eliminar estudiante -> Eliminar línea.

## Alcance y evidencia

No se incluyen capturas falsas ni resultados de Postman inventados. La guía exige pruebas exitosas y transformar las vistas del Proyecto Final de Fase 1, pero dicho proyecto no fue suministrado. Este paquete contiene una implementación independiente del caso de estudio para poder ejecutar y obtener esas evidencias reales.
