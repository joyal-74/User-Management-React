import Admin from '../models/adminSchema.js';
import bcrypt from 'bcryptjs';
import { MongoUserRepository } from '../repositories/User/MongouserRepository.js';
import { MongoAdminRepository } from '../repositories/Admin/MongoAdminRepository.js';

const userRepo = new MongoUserRepository();
const adminRepo = new MongoAdminRepository();

export const loginAdmin = async ({ email, password }) => {
    const admin = await adminRepo.findByEmail({ email });
    if (!admin) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return {
        message: 'Login successful',
        admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
        }
    };
};


export const logoutAdminService = async () => {
    return { message: 'Logout handled (client should clear token)' };
};


export const getAdminProfile = async (adminId) => {
    const admin = await adminRepo.findById(adminId).select('-password');
    if (!admin) throw new Error('admin not found');

    return {
        id: admin._id,
        name: admin.name,
        email: admin.email,
    };
};


export const findAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const data = await userRepo.findAll(page, limit);

        res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch users:', error.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};