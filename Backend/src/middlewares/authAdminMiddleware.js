import jwt from 'jsonwebtoken';
import Admin from '../models/adminSchema.js';

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id).select('-password');

        if (!admin) {
            return res.status(401).json({ message: 'Admin not found' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized, invalid token' });
    }
};

export const adminLogged = (req, res, next)=> {
    if(!req.admin){
        res.status(403).json({ message: 'Admin access denied' });
    }else{
        next();
    }
}