const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

const loginSchema = require('../validationSchema/loginSchema');
const registerSchema = require('../validationSchema/registerSchema');

const validationMiddleware = require('../middlewares/validationMiddleware');

router.post('/login', validationMiddleware.validate(loginSchema), userController.login);
router.post('/register', validationMiddleware.validate(registerSchema), userController.register);

module.exports = router;