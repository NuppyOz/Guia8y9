const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ msg: 'El usuario ya existe' });
    const user = new User({ nombre, email, password });
    await user.save();
    return res.status(201).json({ msg: 'Usuario creado exitosamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Error del servidor' });
  }
};
