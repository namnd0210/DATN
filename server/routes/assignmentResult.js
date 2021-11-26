import express from 'express';

import { createResult, getResultByAssignmentId, getResultByUserId } from '../controllers/assignmentResult';

const router = express.Router();

// router.get('/', getAllResults);
// router.get('/class/:id', getAllByClassId);
router.get('/assignment/:id', getResultByAssignmentId);
router.get('/user/:id', getResultByUserId);
router.post('/', createResult);

export default router;
