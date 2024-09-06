import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { dbConfig } from './config/index.js';
import seedDatabase from './utils/seedDatabase.js';
import errorHandler from './middlewares/errorHandler.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware para analizar JSON en el cuerpo de la solicitud
app.use(express.json());
// Middleware para analizar datos codificados en URL
app.use(express.urlencoded({ extended: false }));
// Middleware para habilitar CORS
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));

// Función para verificar alguna falla antes de iniciar el servidor
const startServer = async () => {
    try {
        // Conectar a la base de datos
        await dbConfig.connectDB();

        // Ejecutar la siembra de la base de datos si se está en desarrollo
        if (process.env.NODE_ENV === 'development') {
            await seedDatabase();
        }

        // Declaración de rutas
        app.use('/api/users', userRoutes);
        app.use('/api/roles', roleRoutes);
        app.use('/api/auth', authRoutes);

        // Middleware para manejar errores
        app.use(errorHandler);

        // Iniciar el servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        // Mostrar mensaje de error y termina la aplicación en caso de alguna falla
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
};

startServer();