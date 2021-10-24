const mongoose = require('mongoose');
import { mongoUrl } from './constants';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(mongoUrl, options)
  .then(() => {
    // eslint-disable-next-line
    return console.log('Mongo connected');
  })
  .catch((err: any) => {
    // mongoose connection error will be handled here
    // eslint-disable-next-line
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

export default mongoose;
