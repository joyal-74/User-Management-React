import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv({ debug: false });

export const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
};

export const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
};