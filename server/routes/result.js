import express from 'express';

import { createResult, getAllResults } from '../controllers/result';

const router = express.Router();

router.get('/', getAllResults);
router.post('/', createResult);

export default router;
