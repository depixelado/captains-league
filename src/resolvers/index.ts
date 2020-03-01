import { Log } from "../models/Log";
import { SORT, ContextInterface } from "../commonTypes";

export const getLogsByCaptain = async (
  parent,
  args: { name: string; sort: SORT } = { name: "", sort: SORT.DESC },
  ctx: ContextInterface
): Promise<Log[]> => {
  ctx.logger.info("Resolver: logsByCaptain called.");
  ctx.logger.trace(args);

  return await ctx.injector
    .get("Logs")
    .findLogsByCaptain({ logger: ctx.logger }, args.name, args.sort);
};

export const getLogs = async (
  parent,
  args: { sort: SORT } = { sort: SORT.DESC },
  ctx: ContextInterface
): Promise<Log[]> => {
  ctx.logger.info("Resolver: getLogs called.");
  ctx.logger.trace(args);

  return await ctx.injector
    .get("Logs")
    .findLogs({ logger: ctx.logger }, args.sort);
};

const resolvers = {
  Query: {
    getLogsByCaptain,
    getLogs
  }
};

export default resolvers;
