import { CursorType, DateType } from "@limit0/graphql-custom-types";
import { Log } from "../models/Log";
import {
  SORT,
  ContextInterface,
  PaginationInterface,
  Connection
} from "../commonTypes";

export const getLogsByCaptain = async (
  parent,
  args: { name: string; pagination?: PaginationInterface; sort?: SORT } = {
    name: "",
    sort: SORT.DESC
  },
  ctx: ContextInterface
): Promise<Connection<Log[]> | {}> => {
  ctx.logger.info("Resolver: logsByCaptain called.");
  ctx.logger.trace(args);

  return await ctx.injector
    .get("Logs")
    .findLogsByCaptain(
      { logger: ctx.logger },
      args.name,
      args.pagination,
      args.sort
    );
};

export const getLogs = async (
  parent,
  args: { pagination?: PaginationInterface; sort?: SORT } = { sort: SORT.DESC },
  ctx: ContextInterface
): Promise<Connection<Log[]> | {}> => {
  ctx.logger.info("Resolver: getLogs called.");
  ctx.logger.trace(args);

  return await ctx.injector
    .get("Logs")
    .findLogs({ logger: ctx.logger }, args.pagination, args.sort);
};

export const createLog = async (
  parent,
  args: { log: Log },
  ctx: ContextInterface
): Promise<Log> => {
  ctx.logger.info("Resolver: createLog called.");
  ctx.logger.trace(args);

  return await ctx.injector
    .get("Logs")
    .createLog({ logger: ctx.logger }, args.log);
};

const resolvers = {
  Date: DateType,
  Cursor: CursorType,
  Query: {
    getLogsByCaptain,
    getLogs
  },
  Mutation: {
    createLog
  }
};

export default resolvers;
