import mongoose, { Mongoose } from "mongoose";
import config from "../config";
import logger from "../logger";

const uri = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;

const connectDb = async (): Promise<Mongoose | Error> => {
  return await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      logger.info("DB Successfully Connected!");

      return mongoose;
    })
    .catch(err => {
      logger.error(err, `Impossible to connect to database. URI: ${uri}`);

      return Promise.reject(err);
    });
};

export default connectDb;
