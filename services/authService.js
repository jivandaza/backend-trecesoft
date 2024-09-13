import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Role from "../models/roleModel.js";

// Función para obtener un usuario por nombre de usuario
const getUserByUsername = async (username) => {
    return await User.findOne({ username });
};

// Función para obtener un usuario por correo electrónico
const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Función para registrar un usuario
const registerUser = async (userData) => {
    const { username, password, email, name } = userData;

    const existingUser = await User.findOne({
        $or: [
            { email: userData.email },
            { username: userData.username }
        ]
    });

    // Verificar si el usuario ya existe por email o username
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Obtener role Genérico
    const genericRole = await Role.findOne({ description: 'Genérico' });

    //Verificar que él role Genérico exista
    if (!genericRole) {
        throw new Error('Unable to register user');
    }

    // Crear el nuevo usuario
    const user = new User({
        username,
        password,
        email,
        name,
        status: true,
        role: genericRole
    });

    return await user.save();
};

// Función para verificar la contraseña
const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const resetPassword = async (id, password) => {
    const user = await User.findById(id);
    user.password = password;
    await user.save();
};

export default {
    getUserByUsername,
    getUserByEmail,
    registerUser,
    verifyPassword,
    resetPassword
};