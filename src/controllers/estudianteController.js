const Estudiante = require('../models/Estudiante');

exports.obtenerEstudiantes = async (req, res) => res.json(await Estudiante.find().populate('lineaInvestigacion', 'nombre codigo'));
exports.obtenerEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id).populate('lineaInvestigacion', 'nombre codigo');
    if (!estudiante) return res.status(404).json({ msg: 'Estudiante no encontrado' });
    return res.json(estudiante);
  } catch (e) { return res.status(400).json({ msg: 'Identificador de estudiante inválido' }); }
};
exports.crearEstudiante = async (req, res) => {
  try { const estudiante = await new Estudiante(req.body).save(); return res.status(201).json(estudiante); }
  catch (e) { return res.status(400).json({ msg: 'No se pudo crear el estudiante' }); }
};
exports.actualizarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!estudiante) return res.status(404).json({ msg: 'Estudiante no encontrado' });
    return res.json(estudiante);
  } catch (e) { return res.status(400).json({ msg: 'No se pudo actualizar el estudiante' }); }
};
exports.eliminarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndDelete(req.params.id);
    if (!estudiante) return res.status(404).json({ msg: 'Estudiante no encontrado' });
    return res.json({ msg: 'Estudiante eliminado' });
  } catch (e) { return res.status(400).json({ msg: 'No se pudo eliminar el estudiante' }); }
};
