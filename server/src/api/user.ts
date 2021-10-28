import express, { Request, Response } from 'express';
import AsyncHandler from '../utils/AsyncHandler';
import { SuccessResponse } from '../utils/Response';
import UserService from '../services/userService';
import { validateRegisterFields, validateLoginFields } from '../middleware/validation';
import User from '../middleware/user';

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

router.get(
  '/user',
  User.getUser,
  AsyncHandler(async (req: any, res: Response) => {
    const data = await UserService.getUser(req.user);
    new SuccessResponse('success', data).send(res);
  }),
);
router.put(
  '/user',
  User.getUser,
  AsyncHandler(async (req: any, res: Response) => {
    const data = await UserService.updateUser(req.user, req.body);
    new SuccessResponse('success', data).send(res);
  }),
);
export default router;
