import jwt from 'jsonwebtoken';

// Función para autenticar tokens JWT en solicitudes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Session closed' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Session expired' });
        req.user = user;
        next();
    });
};

export default authenticateToken;