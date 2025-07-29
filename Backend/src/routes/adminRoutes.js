import express from 'express';
import { loginAdminHandler, logoutAdminHandler, getCurrentAdmin } from '../controllers/adminController.js'
import { adminLogged, protect } from '../middlewares/authAdminMiddleware.js';
import { findAllUsers } from '../services/adminServices.js';


const router = express.Router();

router.post('/login', loginAdminHandler);

router.get('/logout', protect, logoutAdminHandler);
router.get('/me', protect, adminLogged, getCurrentAdmin);
router.get('/users', protect, findAllUsers);

export default router;