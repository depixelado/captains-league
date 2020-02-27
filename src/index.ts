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
    logsByCaptain: (name: string) => {}
  }
};

const server = new ApolloServer({ typeDefs, resolvers, mocks: true });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
