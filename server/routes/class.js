import express from 'express';

import { createClass, deleteClass, getClass, getClasses, getClassesByIds, updateClass } from '../controllers/class';

const router = express.Router();

router.get('/', getClasses);
router.get('/ids', getClassesByIds);
router.get('/:id', getClass);
router.post('/', createClass);
router.put('/update', updateClass);
router.delete('/:id', deleteClass);

export default router;
