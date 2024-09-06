import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import bcrypt from 'bcryptjs';

// Función para crear un nuevo usuario
const createUser = async (userData) => {
    const { username, password, email, name, role } = userData;

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

    // Crear el nuevo usuario
    const user = new User({
        username,
        password,
        email,
        name,
        status: true,
        role
    });

    return await user.save();
};

// Función para obtener todos los usuarios
const getAllUsers = async () => {
    return await User.find().select('-password').populate('role');
};

// Función para obtener un usuario por ID
const getUserById = async (id) => {
    return await User.findById(id).select('-password').populate('role');
};

// Función para actualizar un usuario por ID
const updateUser = async (id, userData) => {
    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found');
    }

    delete userData.password;

    return await User.findByIdAndUpdate(id, userData, { new: true });
};

// Función para eliminar un usuario por ID
const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};