import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 250,
        unique: true,
    },
    password: {
        type: String,
        required: false,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        maxlength: 250,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 250,
    },
    status: {
        type: Boolean,
        default: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
});

// Middleware para encriptar el password antes de guardar el usuario
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;