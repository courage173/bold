import express from 'express';
import AuthRoute from './user';
import userRoute from './profiles';
import scholarship from './scholarship';
import application from './application';

const router = express.Router();

//user api
router.use('/auth', AuthRoute);
router.use('/user', userRoute);
router.use('/scholarship', scholarship);
router.use('/application', application);

export default router;
