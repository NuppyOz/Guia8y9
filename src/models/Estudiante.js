const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  carnet: { type: String, required: true, unique: true, trim: true },
  nombre: { type: String, required: true, trim: true },
  carrera: { type: String, required: true, trim: true },
  lineaInvestigacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LineaInvestigacion',
    required: true
  }
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
