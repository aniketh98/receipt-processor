import { Router } from 'express';
import { processReceipt, getPoints } from '../controllers/receiptController';
import { validateReceipt } from '../middleware/validate';

const router = Router();

router.post('/process', validateReceipt, processReceipt);
router.get('/:id/points', getPoints);

export default router;