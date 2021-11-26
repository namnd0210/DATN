import express from 'express';

import { createResult, getResultByUserId } from '../controllers/assignmentResult';

const router = express.Router();

// router.get('/', getAllResults);
// router.get('/assignment/:id', getAllByAssignmentId);
// router.get('/class/:id', getAllByClassId);
router.get('/user/:id', getResultByUserId);
router.post('/', createResult);

export default router;
