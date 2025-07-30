import { MongoUserRepository } from "../repositories/User/MongouserRepository.js";
import { MongoAdminRepository } from "../repositories/Admin/MongoAdminRepository.js";
import { loginAdmin, logoutAdminService, findAllUsers, editUserDetails, deleteUser, addUser, searchUser } from "../services/adminServices.js";
import { generateToken } from '../utils/token.js';

const userRepo = new MongoUserRepository();
const adminRepo = new MongoAdminRepository();

export const loginAdminHandler = async (req, res) => {
    try {
        const response = await loginAdmin(req.body, adminRepo);

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

export const allUsersHandler = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const response = await findAllUsers(page, limit, userRepo);
        res.status(200).json(response);
    } catch (error) {
        console.error('Failed to fetch users:', error.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};


export const getCurrentAdmin = (req, res) => {
    if (!req.admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({
        admin: req.admin,
    });
};


export const editUserDetailshandler = async (req, res) => {
    try {
        const response = await editUserDetails(req.body, userRepo);

        res.status(201).json(response);
    } catch (error) {
        // console.log(error.message)
        res.status(400).json({ error: error.message });
    }
};


export const deleteUserHandler = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await deleteUser(userId, userRepo);

        res.status(201).json(response);
    } catch (error) {
        // console.log(error.message)
        res.status(400).json({ error: error.message });
    }
}

export const addNewUserHandler = async (req, res) => {
    try {
        const response = await addUser(req.body, userRepo);
        res.status(201).json(response);
    } catch (error) {
        // console.log(error.message);
        res.status(400).json({ error: error.message });
    }
}


export const searchUsersHandler = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const query = req.query.query || '';

        const response = await searchUser(query, page, limit, userRepo);
        res.status(201).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
}