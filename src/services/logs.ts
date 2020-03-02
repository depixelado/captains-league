import LogModel, { Log } from "../models/Log";
import logger from "../logger";
import { SORT } from "../commonTypes";

export interface LogService {
  findLogsByCaptain: (
    dependencies: { logger: typeof logger },
    name: string,
    sort: SORT
  ) => Promise<Log[]>;
  findLogs: (
    dependencies: { logger: typeof logger },
    sort: SORT
  ) => Promise<Log[]>;
  createLog: (
    dependencies: { logger: typeof logger },
    log: Log
  ) => Promise<Log>;
}

const Service: LogService = {
  findLogsByCaptain: async ({ logger }, name, sort = SORT.DESC) => {
    logger.info(
      `findLogsByCaptain: Fetching logs by captain name. Name: ${name}`
    );
    try {
      const logs = await LogModel.find({ captainName: name }).sort({
        arrivalDate: SORT[sort]
      });
      logger.trace(logs);

      return logs;
    } catch (error) {
      logger.error(
        error,
        "findLogsByCaptain: Impossible to retrieve logs by captain name"
      );

      return [];
    }
  },

  findLogs: async ({ logger }, sort = SORT.DESC) => {
    logger.info(`findLogs: Fetching logs by captain name. Sort: ${sort}`);
    try {
      const logs = await LogModel.find().sort({
        arrivalDate: SORT[sort]
      });
      logger.trace(logs);

      return logs;
    } catch (error) {
      logger.error(error, "findLogs: Impossible to retrieve logs");

      return [];
    }
  },

  createLog: async ({ logger }, log) => {
    logger.info("createLog: Creating log");
    logger.trace(log);

    try {
      const result = LogModel.create(log);
      logger.info("createLog: Log created");
      logger.trace(result);

      return log;
    } catch (error) {
      logger.error(error, "createLog: Impossible to create log");
    }
  }
};

export default Service;
