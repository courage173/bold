export const environment = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 3003;

export const logDirectory = process.env.LOG_DIR;

//db url
export const mongoUrl = process.env['MONGO_URL'] || 'mongodb://127.0.0.1:27017/borg';
