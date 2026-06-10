import express from 'express';
import {register,login,logout,verifyToken} from '../controllers/auth.controller.js'
import auth from '../middlewares/middleware.js'
const router=express.Router();

router.post('/register',register);
router.post('/login',login)
router.post('/logout',logout)
router.get('/verify', auth, verifyToken)
export default router;