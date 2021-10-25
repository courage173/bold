import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import AsyncHandler from '../utils/AsyncHandler';
import { SuccessResponse } from '../utils/Response';
import ApplicationService from '../services/applicationService';
import { validateApplication } from '../middleware/validation';
import User from '../middleware/user';

const router = express.Router();

router.post(
  '/',
  User.getUser,
  User.UserIsStudent,
  validateApplication,
  AsyncHandler(async (req: any, res: Response): Promise<any> => {
    const data = await ApplicationService.create(req.user, req.body);
    new SuccessResponse('success', data).send(res);
  }),
);

router.get(
  '/',
  User.getUser,
  validateApplication,
  AsyncHandler(async (req: any, res: Response): Promise<any> => {
    const data = await ApplicationService.findBy({ studentId: req.user.id });
    new SuccessResponse('success', data).send(res);
  }),
);

router.get(
  '/:applicationId',
  User.getUser,
  validateApplication,
  AsyncHandler(async (req: any, res: Response): Promise<any> => {
    const data = await ApplicationService.findOneBy({
      _id: new Types.ObjectId(req.params.applicationId),
    });
    new SuccessResponse('success', data).send(res);
  }),
);

export default router;
