import express, { Request, Response } from 'express';
import AsyncHandler from '../utils/AsyncHandler';
import { SuccessResponse } from '../utils/Response';
import { BadRequestError, InternalError } from '../utils/ErrorHandler';
import UserService from '../services/user';
import { validateRegisterFields, validateLoginFields } from '../middleware/validation';

const router = express.Router();

router.post(
  '/signup',
  validateRegisterFields,
  AsyncHandler(async (req: Request, res: Response) => {
    //call the register service
    const data = await UserService.registerUser(req.body);
    new SuccessResponse('success', data).send(res);
  }),
);

router.post(
  '/signin',
  validateLoginFields,
  AsyncHandler(async (req: Request, res: Response) => {
    //call the login service
    const data = await UserService.loginUser(req.body);
    new SuccessResponse('success', data).send(res);
  }),
);
export default router;
