import express from 'express';

import { createAssignment, deleteAssignment, getAllAssignments, updateAssignment } from '../controllers/assignment';

const router = express.Router();

router.get('/', getAllAssignments);
router.post('/', createAssignment);
router.put('/update', updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;
