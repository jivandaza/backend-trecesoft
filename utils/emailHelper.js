import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Función para crear un transportador de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Función para enviar un correo electrónico de restablecimiento de contraseña
export const sendResetPasswordEmail = async (to, resetToken) => {
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Password Recovery',
        text: `You have requested to recover your password. Click on the following link to reset your password: ${resetURL}`
    };

    await transporter.sendMail(mailOptions);
};