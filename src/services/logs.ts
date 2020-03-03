import LogModel, { Log } from "../models/Log";
import logger from "../logger";
import { SORT, PaginationInterface, Connection } from "../commonTypes";
import { Pagination } from "@limit0/mongoose-graphql-pagination";

const getConnectionStructure = <T>(paginated): Connection<T> => {
  return {
    edges: paginated.getEdges(),
    pageInfo: {
      hasNextPage: paginated.hasNextPage(),
      endCursor: paginated.getEndCursor()
    }
  };
};
export interface LogService {
  findLogsByCaptain: (
    dependencies: { logger: typeof logger },
    name: string,
    pagination: PaginationInterface,
    sort: SORT
  ) => Promise<Connection<Log[]>> | {};
  findLogs: (
    dependencies: { logger: typeof logger },
    pagination: PaginationInterface,
    sort: SORT
  ) => Promise<Connection<Log[]>> | {};
  createLog: (
    dependencies: { logger: typeof logger },
    log: Log
  ) => Promise<Log>;
}

const Service: LogService = {
  findLogsByCaptain: async ({ logger }, name, pagination, sort = SORT.DESC) => {
    logger.info("findLogsByCaptain: Fetching logs by captain name");
    try {
      const paginated = new Pagination(LogModel, {
        criteria: {
          captainName: name
        },
        pagination,
        sort: {
          arrivalDate: SORT[sort]
        }
      });
      const result = getConnectionStructure(paginated);
      logger.trace(result);

      return result;
    } catch (error) {
      logger.error(
        error,
        "findLogsByCaptain: Impossible to retrieve logs by captain name"
      );

      return {};
    }
  },

  findLogs: async ({ logger }, pagination, sort = SORT.DESC) => {
    logger.info("findLogs: Fetching logs");
    try {
      const paginated = new Pagination(LogModel, {
        pagination,
        sort: {
          arrivalDate: SORT[sort]
        }
      });
      const result = getConnectionStructure(paginated);
      logger.trace(result);

      return result;
    } catch (error) {
      logger.error(error, "findLogs: Impossible to retrieve logs");

      return {};
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
