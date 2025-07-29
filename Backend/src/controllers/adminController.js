import { loginAdmin, logoutAdminService, findAllUsers } from "../services/adminServices.js";
import { generateToken } from '../utils/token.js';

export const loginAdminHandler = async (req, res) => {
    try {
        const response = await loginAdmin(req.body);

        const token = generateToken(response.admin.id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ ...response, token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const logoutAdminHandler = async (req, res) => {
    try {
        await logoutAdminService();

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

export const allUsershandler = async (req, res) => {
    await findAllUsers();
}


export const getCurrentAdmin = (req, res) => {
    if (!req.admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({
        admin: req.admin,
    });
};
