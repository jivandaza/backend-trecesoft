import { generateToken } from '../utils/tokenHelper.js';
import jwt from 'jsonwebtoken';
import { sendResetPasswordEmail } from '../utils/emailHelper.js';
import authService from "../services/authService.js";

// Función para registrar un usuario
export const registerUser = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({ message: 'Registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Función para inicio de sesión de un usuario
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await authService.getUserByUsername(username);

        if ( !user ) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if ( !user.password ) {
            return res.status(400).json({ error: 'You need to recover your password' });
        }

        // Verificar la contraseña
        const isMatch = await authService.verifyPassword(password, user.password);
        if ( !isMatch ) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generar un token JWT
        const token = generateToken(user);

        res.status(200).json({ message: 'Logging in', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Función para recuperar la contraseña de un usuario
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await authService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generar un token de recuperación
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Enviar correo electrónico con el token de recuperación
        await sendResetPasswordEmail(user.email, token);

        res.status(200).json({ message: 'Recovery email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error forgot password', error: error.message });
    }
};

// Función para establecer una nueva contraseña
export const resetPassword = async (req, res) => {
    const { password } = req.body;

    try {
        await authService.resetPassword(req.params.id, password);
        res.status(200).json({ message: 'Password save'});
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error reset password', error: error.message });
    }
};