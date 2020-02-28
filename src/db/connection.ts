import mongoose from "mongoose";
import config from "../config";
import logger from "../logger";

const uri = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;

const connectDb = async (): Promise<any> => {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err: any) => {
      if (err) {
        logger.error(err, `Impossible to connect to database. URI: ${uri}`);

        return Promise.reject(err);
      } else {
        logger.info("DB Successfully Connected!");

        return Promise.resolve();
      }
    }
  );
};

export default connectDb;
