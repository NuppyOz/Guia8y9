require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
  console.error('Faltan JWT_SECRET o MONGODB_URI en el archivo .env');
  process.exit(1);
}

const app = express();
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:5500';
app.use(cors({ origin: frontendOrigin }));
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/lineas', require('./routes/lineaRoutes'));
app.use('/api/estudiantes', require('./routes/estudianteRoutes'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`API disponible en http://localhost:${port}`)))
  .catch((error) => { console.error('No fue posible conectar con MongoDB:', error.message); process.exit(1); });
