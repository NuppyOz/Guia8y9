const express = require('express');
const { body } = require('express-validator');
const ctrl = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const router = express.Router();

router.post('/register', [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().normalizeEmail().withMessage('El email debe tener un formato válido'),
  body('password').isLength({ min: 8 }).withMessage('La password debe tener mínimo 8 caracteres'),
  validate
], ctrl.register);
router.post('/login', ctrl.login);
router.get('/profile', auth.verifyToken, ctrl.profile);
module.exports = router;
