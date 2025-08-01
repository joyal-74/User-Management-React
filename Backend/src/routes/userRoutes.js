import express from 'express';
import { registerUserHandler, loginUserHandler, logoutUserHandler, getUserProfileHandler, getCurrentUserHandler, updateCurrentUserHandler } from '../controllers/userController.js'
import { protect } from '../middlewares/authUserMiddleware.js';
import { refreshAccessToken } from '../middlewares/refreshTokenMiddleware.js';


const router = express.Router();

router.post('/register', registerUserHandler);
router.post('/login', loginUserHandler);

router.get('/logout', protect, logoutUserHandler);
router.get('/profile', protect, getUserProfileHandler);
router.get('/me', protect, getCurrentUserHandler );
router.put('/me', protect, updateCurrentUserHandler);
router.get('/refresh-token', refreshAccessToken);

export default router;