import express from 'express';

import {
  createAssignment,
  deleteAssignment,
  getAllAssignments,
  getAllAssignmentsByUserId,
  updateAssignment,
} from '../controllers/assignment';

const router = express.Router();

router.get('/', getAllAssignments);
router.get('/:id', getAllAssignmentsByUserId);
router.post('/', createAssignment);
router.put('/update', updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;
