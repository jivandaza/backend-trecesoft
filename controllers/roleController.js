import roleService from '../services/roleService.js';

// Función para crear un nuevo rol
const createRole = async (req, res) => {
    try {
        const role = await roleService.createRole(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error: error.message });
    }
};

// Función para obtener todos los roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error getting roles', error: error.message });
    }
};

// Función para obtener un rol por ID
const getRoleById = async (req, res) => {
    try {
        const role = await roleService.getRoleById(req.params.id);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting role', error: error.message });
    }
};

// Función para actualizar un rol por ID
const updateRole = async (req, res) => {
    try {
        const updatedRole = await roleService.updateRole(req.params.id, req.body);
        if (updatedRole) {
            res.status(200).json(updatedRole);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error: error.message });
    }
};

// Función para eliminar un rol por ID
const deleteRole = async (req, res) => {
    try {
        const deletedRole = await roleService.deleteRole(req.params.id);
        if (deletedRole) {
            res.status(200).json({ message: 'Role successfully deleted' });
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting role', error: error.message });
    }
};

export default {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};