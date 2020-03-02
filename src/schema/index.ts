import { gql } from "apollo-server";

const schema = gql`
  scalar Date

  type Log {
    captainName: String
    vesselName: String
    arrivalDate: Date
    port: String
  }

  input LogInput {
    captainName: String!
    vesselName: String!
    arrivalDate: Date!
    port: String!
  }

  enum SORT {
    ASC
    DESC
  }

  type Query {
    getLogsByCaptain(name: String!, sort: SORT): [Log]
    getLogs(sort: SORT): [Log]
  }

  type Mutation {
    createLog(log: LogInput): Log
  }
`;

export default schema;
