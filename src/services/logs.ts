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
  }
};

export default Service;
