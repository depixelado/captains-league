import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import connectDb from "./db/connection";
import logger from "./logger";
import injector from "./services/serviceInjector";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { logger, injector }
});

connectDb()
  .then(() => server.listen())
  .then(({ url }) => {
    logger.info(`🚀  Server ready at ${url}`);
  })
  .catch(e => {
    logger.error(e, "Imposible to initialise Apollo Server");
  });
