import { graphql } from "graphql";
import typeDefs from "../../schema";
import resolvers from "../../resolvers";
import { makeExecutableSchema } from "graphql-tools";
import { getContext, getConnectionWrapper } from "../utils/utils";

describe("getLogs", () => {
  it("should return logs from all places and captains", async () => {
    const logDate = new Date("2020-03-02T15:39:08.563+0000");
    const log = {
      vesselName: "The ship",
      captainName: "The captain",
      port: "The port",
      arrivalDate: logDate
    };
    const dataFromService = getConnectionWrapper([log]);
    const expected = getConnectionWrapper(
      [
        {
          ...log,
          arrivalDate: logDate.getTime()
        }
      ],
      {
        endCursor: null,
        hasNextPage: false
      }
    );

    const query = `
      query {
        places: getLogs(sort: DESC) {
          edges {
            node {
              captainName
              vesselName
              port
              arrivalDate
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const rootValue = {};
    const context = getContext("Logs", "findLogs", dataFromService);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const result = await graphql(schema, query, rootValue, context);
    const { data } = result;

    expect(data).toEqual({ places: expected });
  });
});

describe("getLogsByCaptain", () => {
  it("should return logs by captain", async () => {
    const logDate = new Date("2020-03-02T15:39:08.563+0000");
    const log = {
      vesselName: "The ship",
      captainName: "The captain",
      port: "The port",
      arrivalDate: logDate
    };
    const dataFromService = getConnectionWrapper([log]);
    const expected = getConnectionWrapper(
      [
        {
          ...log,
          arrivalDate: logDate.getTime()
        }
      ],
      {
        endCursor: null,
        hasNextPage: false
      }
    );

    const query = `
      query {
        places: getLogsByCaptain(name: "The captain", sort: DESC){
          edges {
            node {
              captainName
              vesselName
              port
              arrivalDate
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const rootValue = {};
    const context = getContext("Logs", "findLogsByCaptain", dataFromService);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const result = await graphql(schema, query, rootValue, context);
    const { data } = result;

    expect(data).toEqual({ places: expected });
  });
});

describe("createLog", () => {
  it("should return log when it is created", async () => {
    const input = {
      vesselName: "The ship",
      captainName: "The captain",
      port: "The port",
      arrivalDate: 1583163548563
    };

    const dataFromDb = {
      ...input,
      arrivalDate: new Date(input.arrivalDate)
    };

    const query = `
      mutation addLog($input: LogInput!) {
        data: createLog(log: $input) {
          vesselName
          captainName
          port
          arrivalDate
        }
      }
    `;

    const rootValue = {};
    const context = getContext("Logs", "createLog", dataFromDb);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const result = await graphql(schema, query, rootValue, context, {
      input
    });
    const { data } = result;

    expect(data).toEqual({ data: input });
  });
});
