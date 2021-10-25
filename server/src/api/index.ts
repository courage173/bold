import express from 'express';
import AuthRoute from './user';
import userRoute from './profiles';
const router = express.Router();

//user api
router.use('/auth', AuthRoute);
router.use('/user', userRoute);

export default router;
