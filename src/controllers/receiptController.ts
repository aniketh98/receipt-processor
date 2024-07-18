import { Request, Response, NextFunction } from 'express';
import { receiptService } from '../services/receiptService';
import { AppError } from '../utils/errorHandler';

export const processReceipt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = receiptService.processReceipt(req.body);
    res.status(200).json({ id });
  } catch (error) {
    next(error);
  }
};

export const getPoints = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const points = receiptService.getPoints(id);
    if (points === null) {
      throw new AppError('Receipt not found', 404);
    }
    res.status(200).json({ points });
  } catch (error) {
    next(error);
  }
};