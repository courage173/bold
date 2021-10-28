import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import AsyncHandler from '../utils/AsyncHandler';
import { SuccessResponse } from '../utils/Response';
import ScholarshipService from '../services/scholarshipService';
import {
  validateScholarship,
  validateScholarshipAward,
  validateScholarshipSupport,
} from '../middleware/validation';
import User from '../middleware/user';

const router = express.Router();

router.post(
  '/',
  User.getUser,
  User.UserIsSponsor,
  validateScholarship,
  AsyncHandler(async (req: any, res: Response): Promise<any> => {
    const data = await ScholarshipService.create(req.user, req.body);
    new SuccessResponse('success', data).send(res);
  }),
);

router.get(
  '/:scholarshipId',
  User.getUser,
  AsyncHandler(async (req: any, res: Response): Promise<any> => {
    const data = await ScholarshipService.findOneBy({
      _id: new Types.ObjectId(req.params.scholarshipId),
    });
    new SuccessResponse('success', data).send(res);
  }),
);

router.get(
  '/',
  User.getUser,
  AsyncHandler(async (req: any, res: Response): Promise<any> => {
    const { skip, limit } = req.query;
    skip ? Number(skip) : 0;
    limit ? Number(limit) : 10;
    const data = await ScholarshipService.findBy({}, skip, limit);
    new SuccessResponse('success', data).send(res);
  }),
);

router.put(
  '/award/:scholarshipId',
  User.getUser,
  User.UserIsSponsor,
  validateScholarshipAward,
  AsyncHandler(async (req: any, res: Response): Promise<any> => {
    const data = await ScholarshipService.awardScholarship(req.user, {
      scholarshipId: req.params.scholarshipId,
      studentId: req.body.studentId,
    });
    new SuccessResponse('success', data).send(res);
  }),
);

router.put(
  '/support/:scholarshipId',
  User.getUser,
  User.UserIsSponsor,
  validateScholarshipSupport,
  AsyncHandler(async (req: any, res: Response): Promise<any> => {
    const data = await ScholarshipService.support(
      req.user,
      req.params.scholarshipId,
      req.body.amount,
    );
    new SuccessResponse('success', data).send(res);
  }),
);

export default router;
