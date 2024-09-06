import express from 'express';
import userController from '../controllers/userController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRole from '../middlewares/roleMiddleware.js';
import {validateUserCreation, validateUserUpdate} from '../middlewares/validateRequest.js';

const router = express.Router();

// // Rutas Protegidas de Usuario
router.post('/', authenticateToken, authorizeRole('Super Admin'), validateUserCreation, userController.createUser);
router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, authorizeRole('Super Admin'), validateUserUpdate, userController.updateUser);
router.delete('/:id', authenticateToken, authorizeRole('Super Admin'), userController.deleteUser);

export default router;