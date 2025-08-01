import jwt from 'jsonwebtoken';
import { MongoAdminRepository } from '../repositories/Admin/MongoAdminRepository.js';

const adminRepo = new MongoAdminRepository();

export const protect = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ message: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const admin = await adminRepo.findById(decoded.id);

        req.admin = admin;

        if (!admin) return res.status(401).json({ message: 'Admin not found' });

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
