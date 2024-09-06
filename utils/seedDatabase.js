import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import bcrypt from 'bcryptjs';

// Función para insertar roles predeterminados
const seedRoles = async () => {
    try {
        // Crear roles si no existen
        const superAdminRole = await Role.findOne({ description: 'Super Admin' });
        if (!superAdminRole) {
            await Role.create({ description: 'Super Admin', status: true });
            console.log('Super Admin role created.');
        }

        const genericRole = await Role.findOne({ description: 'Genérico' });
        if (!genericRole) {
            await Role.create({ description: 'Genérico', status: true });
            console.log('Generic role created.');
        }
    } catch (error) {
        console.error(`Error creating roles: ${error.message}`);
    }
};

// Función para insertar 1 usuario con role Super Admin
const seedUsers = async () => {
    try {
        // Encontrar roles
        const superAdminRole = await Role.findOne({ description: 'Super Admin' });

        if (!superAdminRole) {
            console.error('Super Admin role not found.');
            return;
        }

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ username: 'superadmin' });
        if (!userExists) {
            const password = 'admin123';

            await User.create({
                username: 'superadmin',
                password,
                email: 'superadmin@gmail.com',
                name: 'Super Admin',
                status: true,
                role: superAdminRole._id,
            });
            console.log('Super Admin User Created.');
        }
    } catch (error) {
        console.error(`Error creating users: ${error.message}`);
    }
};

// Función principal para ejecutar la semilla
const seedDatabase = async () => {
    try {
        // Ejecutar las funciones de siembra
        await seedRoles();
        await seedUsers();

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error(`Error seeding database: ${error.message}`);
    }
};

export default seedDatabase;