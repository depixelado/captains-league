import connectDb from "../src/db/connection";
import logger from "../src/logger";
import mongoose from "mongoose";

Promise.resolve()
  .then(() => logger.info("Dropping collections"))
  .then(() => connectDb())
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => logger.info("Database succesfully dropped"))
  .catch(e => logger.error(e, "There was some problem seeding the database"));
