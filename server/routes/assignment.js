import express from 'express';

import {
  createAssignment,
  deleteAssignment,
  getAllAssignments,
  getAllAssignmentsById,
  getAllAssignmentsByTeacherId,
  updateAssignment,
} from '../controllers/assignment';

const router = express.Router();

router.get('/', getAllAssignments);
router.get('/:id', getAllAssignmentsById);
router.get('/user/:id', getAllAssignmentsByTeacherId);
router.post('/', createAssignment);
router.put('/update', updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;
