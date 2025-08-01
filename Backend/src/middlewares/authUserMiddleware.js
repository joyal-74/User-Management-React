import jwt from 'jsonwebtoken';
import { MongoUserRepository } from '../repositories/User/MongouserRepository.js';
const userRepo = new MongoUserRepository();

export const protect = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ message: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await userRepo.findById(decoded.id);
        req.user = decoded;

        if (!user) return res.status(401).json({ message: 'User not found' });

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

