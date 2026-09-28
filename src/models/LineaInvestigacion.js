const mongoose = require('mongoose');

const lineaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  codigo: { type: String, required: true, unique: true, trim: true },
  activa: { type: Boolean, default: true }
});

module.exports = mongoose.model('LineaInvestigacion', lineaSchema);
