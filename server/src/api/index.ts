import express from 'express';
import UserRouter from './user';
const router = express.Router();

//user api
router.use('/auth', UserRouter);

export default router;
