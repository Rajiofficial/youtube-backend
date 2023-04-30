import express from 'express';
import { googleAuth, signin, signup, signout } from '../controllers/auth.js';

const router = express.Router();

//CREATE A USER
router.post('/signup', signup);

//SIGN IN
router.post('/signin', signin);

//GOOGLE AUTH
router.post('/google', googleAuth);

router.get('/signout', signout);

export default router;
