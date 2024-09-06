import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    description: {
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
});

const Role = mongoose.model('Role', roleSchema);

export default Role;