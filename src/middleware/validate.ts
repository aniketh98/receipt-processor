import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from '../utils/errorHandler';

export const validateReceipt = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    retailer: Joi.string().required(),
    purchaseDate: Joi.date().iso().required(),
    purchaseTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
    items: Joi.array().items(
      Joi.object({
        shortDescription: Joi.string().required(),
        price: Joi.string().pattern(/^\d+\.\d{2}$/).required()
      })
    ).min(1).required(),
    total: Joi.string().pattern(/^\d+\.\d{2}$/).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }
  next();
};