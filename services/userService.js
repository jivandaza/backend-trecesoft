import User from '../models/userModel.js';
import Role from '../models/roleModel.js';

// Función para crear un nuevo usuario
const createUser = async (userData) => {
    const { username, password, email, name, role } = userData;

    // Crear el nuevo usuario
    const user = new User({
        username,
        password,
        email,
        name,
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

// Función para obtener todos los usuarios de una búsqueda
const getAllUserBySearch = async (search) => {
    const regex = new RegExp(search, 'i');

    const roleId = await Role.find({
        '$or' : [
            { description: regex }
        ]
    });

    return await User.find({
        '$or' : [
            { username: regex },
            { email: regex },
            { name: regex },
            { role: roleId }
        ]
    }).select('-password').populate('role');
};

// Función para actualizar un usuario por ID
const updateUser = async (id, userData) => {
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
    getAllUserBySearch,
    updateUser,
    deleteUser
};