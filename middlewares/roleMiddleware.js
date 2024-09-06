import Role from '../models/roleModel.js';

// Función para autorizar roles de usuario en solicitudes
const authorizeRole = (role) => {
    return async (req, res, next) => {
        try {
            const userRole = await Role.findById(req.user.role);
            if (userRole && userRole.description === role) {
                next();
            } else {
                res.status(403).json({ message: 'Access denied' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Authorization error', error: error.message });
        }
    };
};

export default authorizeRole;