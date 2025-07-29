import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';


export const registerUser = async (userData, userRepo) => {
    const { name, email, password } = userData;

    const userExists = await userRepo.findByEmail(email);
    if (userExists) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepo.create({
        name,
        email,
        password: hashedPassword,
        phone : phone || 'N/A',
        profileImg : imageUrl || ''
    });

    return {
        message: 'User registered successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    };
};


export const loginUser = async (userData, userRepo) => {
    const { email, password } = userData;

    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return {
        message: 'Login successful',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    };
};


export const logoutUserService = async () => {
    return { message: 'Logout handled (client should clear token)' };
};


export const getUserProfile = async (userId, userRepo) => {
    const user = await userRepo.findById(userId).select('-password');
    if (!user) throw new Error('User not found');

    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
};