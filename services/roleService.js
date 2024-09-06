import Role from '../models/roleModel.js';

// Función para crear un nuevo rol
const createRole = async (roleData) => {
    const { description } = roleData;

    // Verificar si el rol ya existe
    const existingRole = await Role.findOne({ description });
    if (existingRole) {
        throw new Error('Role already exists');
    }

    const role = new Role({
        description,
        status: true
    });

    return await role.save();
};

// Función para obtener todos los roles
const getAllRoles = async () => {
    return await Role.find();
};

// Función para obtener un rol por ID
const getRoleById = async (id) => {
    return await Role.findById(id);
};

// Función para actualizar un rol por ID
const updateRole = async (id, roleData) => {
    // Verificar si el rol existe
    const role = await Role.findById(id);
    if (!role) {
        throw new Error('Role not found');
    }

    // Actualizar la información del rol
    return await Role.findByIdAndUpdate(id, roleData, { new: true });
};

// Función para eliminar un rol por ID
const deleteRole = async (id) => {
    return await Role.findByIdAndDelete(id);
};

export default {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};