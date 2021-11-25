import express from 'express';

import {
  createAssignment,
  deleteAssignment,
  getAllAssignments,
  getAllAssignmentsById,
  getAllAssignmentsByUserId,
  updateAssignment,
} from '../controllers/assignment';

const router = express.Router();

router.get('/', getAllAssignments);
router.get('/:id', getAllAssignmentsById);
router.get('/user/:id', getAllAssignmentsByUserId);
router.post('/', createAssignment);
router.put('/update', updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;
