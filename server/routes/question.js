import express from 'express';

import { createQuestion, deleteQuestion, getAllQuestions, updateQuestion } from '../controllers/question';

const router = express.Router();

router.get('/', getAllQuestions);
router.post('/', createQuestion);
router.put('/update', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
