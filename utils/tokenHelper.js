import { jwtConfig } from '../config/index.js';
import jwt from 'jsonwebtoken';

// Función para generar un token JWT
export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};