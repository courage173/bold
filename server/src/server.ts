import * as dotenv from 'dotenv';
dotenv.config();

import Logger from './utils/Logger';
import { port } from './config/constants';
import app from './app';

app
  .listen(port, () => {
    Logger.info(`server running on port : ${port}`);
  })
  .on('error', (e) => Logger.error(e));
