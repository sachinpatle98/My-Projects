import express from 'express';
import { register, login, forgetPassword, logout, resetPassword, googleLogin, getUserLoginSessions, getProfile, updateProfile } from '../controllers/authController.js';
import authMiddleware from './../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.post('/logout', logout);
router.post("/reset-password/:token", resetPassword);
router.post("/google", googleLogin);
router.post("/get-login-sessions", authMiddleware,getUserLoginSessions);

router.get("/get-profile-data",authMiddleware,getProfile);
router.put("/update-profile-data",authMiddleware,updateProfile);

export default router;