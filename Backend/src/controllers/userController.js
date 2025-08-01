import User from "../models/userSchema.js";
import { MongoUserRepository } from "../repositories/User/MongouserRepository.js";
import { registerUser, loginUser, getUserProfile, logoutUserService, updateCurrentUser, getCurrentUser } from "../services/userServices.js";
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';

const userRepo = new MongoUserRepository();

export const registerUserHandler = async (req, res) => {
    try {
        const response = await registerUser(req.body, userRepo);

        const accessToken = generateAccessToken(response.user.id);
        const refreshToken = generateRefreshToken(response.user.id);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUserHandler = async (req, res) => {
    try {
        const response = await loginUser(req.body, userRepo);
        const user = response.user

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        res.status(401).json({ error: error.message });
    }
};

export const logoutUserHandler = async (req, res) => {
    try {
        await logoutUserService();

        res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: 'Lax',
            secure: process.env.NODE_ENV === 'production'
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'Lax',
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


export const getCurrentUserHandler = async (req, res) => {
    try {
        const response = await getCurrentUser(req.user, userRepo);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const updateCurrentUserHandler = async (req, res) => {
    try {
        const updatedUser = await updateCurrentUser(req.body, userRepo);
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
};
