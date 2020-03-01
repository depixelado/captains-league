import { gql } from "apollo-server";

const schema = gql`
  type Log {
    captainName: String
    vesselName: String
    arrivalDate: String
    port: String
  }

  enum SORT {
    ASC
    DESC
  }

  type Query {
    getLogsByCaptain(name: String!, sort: SORT): [Log]
    getLogs(sort: String!, sort: SORT): [Log]
  }
`;

export default schema;
