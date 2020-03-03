import { gql } from "apollo-server";

const schema = gql`
  scalar Date
  scalar Cursor

  type Log {
    captainName: String
    vesselName: String
    arrivalDate: Date
    port: String
  }

  type LogEdge {
    node: Log
    cursor: Cursor
  }

  type LogConnection {
    edges: [LogEdge]
    pageInfo: PageInfo!
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

  type PageInfo {
    hasNextPage: Boolean
    endCursor: Cursor
  }

  input PaginationInput {
    first: Int!
    after: Cursor
  }

  type Query {
    getLogsByCaptain(
      name: String!
      pagination: PaginationInput
      sort: SORT
    ): LogConnection
    getLogs(pagination: PaginationInput, sort: SORT): LogConnection
  }

  type Mutation {
    createLog(log: LogInput): Log
  }
`;

export default schema;
