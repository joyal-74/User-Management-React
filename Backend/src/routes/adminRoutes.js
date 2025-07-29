import express from 'express';
import { loginAdminHandler, logoutAdminHandler, getCurrentAdmin, editUserDetailshandler, allUsersHandler, deleteUserHandler } from '../controllers/adminController.js'
import { adminLogged, protect } from '../middlewares/authAdminMiddleware.js';


const router = express.Router();

router.post('/login', loginAdminHandler);

router.get('/logout', protect, logoutAdminHandler);
router.get('/me', protect, adminLogged, getCurrentAdmin);
router.get('/users', protect, allUsersHandler);
router.put('/edit', protect,editUserDetailshandler );
router.delete('/delete/:id', protect, deleteUserHandler);

export default router;