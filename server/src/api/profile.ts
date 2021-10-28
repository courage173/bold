import express, { Request, Response } from 'express';
import AsyncHandler from '../utils/AsyncHandler';
import { SuccessResponse } from '../utils/Response';
import { BadRequestError, InternalError } from '../utils/ErrorHandler';
import ProfileService from '../services/profileService';
import { validateSponsorProfile, validateStudentProfile } from '../middleware/validation';
import User from '../middleware/user';

const router = express.Router();

router.put(
  '/profile/sponsor',
  User.getUser,
  validateSponsorProfile,
  AsyncHandler(async (req: any, res: Response): Promise<any> => {
    const data = await ProfileService.updateSponsorProfile(req.user, req.body);
    new SuccessResponse('success', data).send(res);
  }),
);

router.put(
  '/profile/student',
  User.getUser,
  validateStudentProfile,
  AsyncHandler(async (req: any, res: Response): Promise<any> => {
    const data = await ProfileService.updateStudentProfile(req.user, req.body);
    new SuccessResponse('success', data).send(res);
  }),
);

router.get(
  '/profile',
  User.getUser,
  AsyncHandler(async (req: any, res: Response): Promise<any> => {
    const data = await ProfileService.getProfile(req.user);
    new SuccessResponse('success', data).send(res);
  }),
);

export default router;
