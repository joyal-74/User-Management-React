import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv({ debug: false });

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRE = '7d';

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: TOKEN_EXPIRE,
    });
};