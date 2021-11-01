import express from 'express';

// import passport from 'passport';
import { deleteUser, getUsers, login, register, updateUser } from '../controllers/user';
// import admin from './../utils/admin';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update', updateUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);

export default router;
