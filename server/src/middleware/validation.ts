import Joi, { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../utils/ErrorHandler';

export function validateRegisterFields(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  validateRequest(req, res, next, schema);
}

export function validateLoginFields(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  validateRequest(req, res, next, schema);
}

function validateRequest(req: Request, res: Response, next: NextFunction, schema: Schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error } = schema.validate(req.body, options);
  if (error) {
    throw new BadRequestError(error.message);
  } else {
    next();
  }
}
