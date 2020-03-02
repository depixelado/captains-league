import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { Log } from "../models/Log";
import { SORT, ContextInterface } from "../commonTypes";

export const getLogsByCaptain = async (
  parent,
  args: { name: string; sort?: SORT } = { name: "", sort: SORT.DESC },
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
  args: { sort?: SORT } = { sort: SORT.DESC },
  ctx: ContextInterface
): Promise<Log[]> => {
  ctx.logger.info("Resolver: getLogs called.");
  ctx.logger.trace(args);

  return await ctx.injector
    .get("Logs")
    .findLogs({ logger: ctx.logger }, args.sort);
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

const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date type",
  serialize(value): number {
    return value.getTime();
  },
  parseValue(value): Date {
    return new Date(value);
  },
  parseLiteral(ast): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
});

const resolvers = {
  Date: DateScalar,
  Query: {
    getLogsByCaptain,
    getLogs
  },
  Mutation: {
    createLog
  }
};

export default resolvers;
