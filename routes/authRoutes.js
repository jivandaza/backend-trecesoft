import express from 'express';
import {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
} from '../controllers/authController.js';
import {
    validateUserRegistration,
    validateUserLogin,
    validateUserForgotPassword,
    validateUserResetPassword,
} from '../middlewares/validateRequest.js';
import authenticateToken from "../middlewares/passResetMiddleware.js";

const router = express.Router();

// Rutas de autenticación
router.post('/register', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);
router.post('/forgot-password', validateUserForgotPassword, forgotPassword);
router.put('/reset-password/:id', authenticateToken, validateUserResetPassword,  resetPassword);

export default router;