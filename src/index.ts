import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import connectDb from "./db/connection";

const server = new ApolloServer({ typeDefs, resolvers, mocks: true });

connectDb()
  .then(() => server.listen())
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch(e => {
    console.log("Error: ", e);
  });
