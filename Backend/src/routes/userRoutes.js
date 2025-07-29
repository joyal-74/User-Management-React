import express from 'express';
import { registerUserHandler, loginUserHandler, logoutUserHandler, getUserProfileHandler, getCurrentUser, updateCurrentUserHandler } from '../controllers/userController.js'
import { protect } from '../middlewares/authUserMiddleware.js';


const router = express.Router();

router.post('/register', registerUserHandler);
router.post('/login', loginUserHandler);

router.get('/logout', protect, logoutUserHandler);
router.get('/profile', protect, getUserProfileHandler);
router.get('/me', protect, getCurrentUser);
router.put('/me', protect, updateCurrentUserHandler);

export default router;