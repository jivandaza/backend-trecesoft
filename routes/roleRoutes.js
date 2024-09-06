import express from 'express';
import roleController from '../controllers/roleController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRole from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Rutas Protegidas de Roles
router.post('/', authenticateToken, authorizeRole('Super Admin'), roleController.createRole);
router.get('/', authenticateToken, authorizeRole('Super Admin'), roleController.getAllRoles);
router.get('/:id', authenticateToken, authorizeRole('Super Admin'), roleController.getRoleById);
router.put('/:id', authenticateToken, authorizeRole('Super Admin'), roleController.updateRole);
router.delete('/:id', authenticateToken, authorizeRole('Super Admin'), roleController.deleteRole);

export default router;