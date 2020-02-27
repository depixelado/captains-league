import { gql } from "apollo-server";

const schema = gql`
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

export default schema;
