import { MongoUserRepository } from "../repositories/User/MongouserRepository.js";
import { registerUser, loginUser, getUserProfile, logoutUserService } from "../services/userServices.js";
import { generateToken } from '../utils/token.js';


const userRepo = new MongoUserRepository();

export const registerUserHandler = async (req, res) => {
    try {
        const response = await registerUser(req.body, userRepo);

        const token = generateToken(response.user.id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json(response);
    } catch (error) {
        // console.log(error.message)
        res.status(400).json({ error: error.message });
    }
};

export const loginUserHandler = async (req, res) => {
    try {
        const response = await loginUser(req.body, userRepo);

        const token = generateToken(response.user.id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({...response, token});
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const logoutUserHandler = async (req, res) => {
    try {
        await logoutUserService();

        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserProfileHandler = async (req, res) => {
    try {
        const response = await getUserProfile(req.userId, userRepo);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


export const getCurrentUser = (req, res) => {
    if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
        user: req.user,
    });
};
