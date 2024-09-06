import express from 'express';
import { registerUser, loginUser, forgotPassword, newPassword } from '../controllers/authController.js';
import { validateUserRegistration, validateUserLogin, validateUserForgotPassword, validateUserNewPassword } from '../middlewares/validateRequest.js';
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas de autenticación
router.post('/register', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);
router.post('/forgot-password', validateUserForgotPassword, forgotPassword);
router.put('/new-password', authenticateToken, validateUserNewPassword,  newPassword);

export default router;