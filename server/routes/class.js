import express from 'express';

import { createClass, deleteClass, getClassById, getClasses, getClassesByIds, updateClass } from '../controllers/class';

const router = express.Router();

router.get('/', getClasses);
router.get('/ids', getClassesByIds);
router.get('/:id', getClassById);
router.post('/', createClass);
router.put('/update', updateClass);
router.delete('/:id', deleteClass);

export default router;
