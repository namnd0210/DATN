import express from 'express';
import passport from 'passport';

import { createClass, deleteClass, getClass, getClasses, updateClass } from '../controllers/class';
import admin from '../utils/admin';

const router = express.Router();

router.post('/', getClasses);
router.post('/:id', getClass);
router.put('/update', passport.authenticate('jwt', { session: false }), admin, updateClass);
router.post('/', passport.authenticate('jwt', { session: false }), admin, createClass);
router.delete('/:id', passport.authenticate('jwt', { session: false }), admin, deleteClass);

export default router;
