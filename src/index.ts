import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Log {
    captainName: String
    veselName: String
    arrivalDate: String
    port: String
  }

  type Query {
    logsByCaptain(name: String): [Log]
  }
`;

const resolvers = {
  Query: {
    logsByCaptain: (): void => {} // eslint-disable-line @typescript-eslint/no-empty-function
  }
};

const server = new ApolloServer({ typeDefs, resolvers, mocks: true });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
