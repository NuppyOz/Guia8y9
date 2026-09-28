const Linea = require('../models/LineaInvestigacion');

exports.obtenerLineas = async (req, res) => res.json(await Linea.find());
exports.crearLinea = async (req, res) => {
  try { const linea = await new Linea(req.body).save(); return res.status(201).json(linea); }
  catch (e) { return res.status(400).json({ msg: 'No se pudo crear la línea de investigación' }); }
};
exports.actualizarLinea = async (req, res) => {
  try {
    const linea = await Linea.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!linea) return res.status(404).json({ msg: 'No encontrada' });
    return res.json(linea);
  } catch (e) { return res.status(400).json({ msg: 'No se pudo actualizar la línea de investigación' }); }
};
exports.eliminarLinea = async (req, res) => {
  try {
    const linea = await Linea.findByIdAndDelete(req.params.id);
    if (!linea) return res.status(404).json({ msg: 'No encontrada' });
    return res.json({ msg: 'Línea eliminada' });
  } catch (e) { return res.status(400).json({ msg: 'No se pudo eliminar la línea de investigación' }); }
};
