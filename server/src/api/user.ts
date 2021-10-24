import express, { Request, Response } from 'express';
import AsyncHandler from '../utils/AsyncHandler';
import { BadRequestError } from '../utils/ErrorHandler';

const router = express.Router();

router.get('/signup', async (req, res) => {});
export default router;
