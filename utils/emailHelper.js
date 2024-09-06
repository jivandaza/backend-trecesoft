import nodemailer from 'nodemailer';

// Función para crear un transportador de correo electrónico
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

// Función para enviar un correo electrónico de restablecimiento de contraseña
export const sendResetPasswordEmail = async (to, resetToken) => {
    const resetURL = `${process.env.CLIENT_URL}/forgot-password?token=${resetToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Password Recovery',
        text: `You have requested to recover your password. Click on the following link to reset your password: ${resetURL}`
    };

    await transporter.sendMail(mailOptions);
};