import Logs from "../seeds/Logs";
import connectDb from "../src/db/connection";
import logger from "../src/logger";

const seeds = [Logs];

Promise.resolve()
  .then(() => logger.info("Start seeding process"))
  .then(() => connectDb())
  .then(() => seeds.forEach(async seed => await seed()))
  .then(() => logger.info("Seeder: Elements added"))
  .then(() => logger.info("Seeding process finished"))
  .catch(e => logger.error(e, "There was some problem seeding the database"));
