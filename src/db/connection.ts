import mongoose from "mongoose";
import config from "../config";

const uri = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;

const connectDb = async (): Promise<any> => {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err: any) => {
      if (err) {
        return Promise.reject(err);
      } else {
        console.log("DB Successfully Connected!");
        return Promise.resolve();
      }
    }
  );
};

export default connectDb;
