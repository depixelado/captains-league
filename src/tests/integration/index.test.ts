import { graphql } from "graphql";
import typeDefs from "../../schema";
import resolvers from "../../resolvers";
import { makeExecutableSchema } from "graphql-tools";
import { getContext } from "../utils/getContext";

describe("getLogs", () => {
  it("should return logs from all places and captains", async () => {
    const logDate = new Date("2020-03-02T15:39:08.563+0000");

    const dataFromDb = [
      {
        vesselName: "The ship",
        captainName: "The captain",
        port: "The port",
        arrivalDate: logDate
      },
      {
        vesselName: "The ship",
        captainName: "The captain",
        port: "The port",
        arrivalDate: logDate
      }
    ];

    const expected = [
      {
        ...dataFromDb[0],
        arrivalDate: logDate.getTime()
      },
      {
        ...dataFromDb[1],
        arrivalDate: logDate.getTime()
      }
    ];

    const query = `
      query {
        places: getLogs(sort: DESC){
          vesselName
          captainName
          port
          arrivalDate
        }
      }
    `;

    const rootValue = {};
    const context = getContext("Logs", "findLogs", dataFromDb);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const result = await graphql(schema, query, rootValue, context);
    const { data } = result;

    expect(data).toEqual({ places: expected });
  });
});

describe("getLogsByCaptain", () => {
  it("should return logs by captain", async () => {
    const logDate = new Date("2020-03-02T15:39:08.563+0000");

    const dataFromDb = [
      {
        vesselName: "The ship",
        captainName: "The captain",
        port: "The port",
        arrivalDate: logDate
      },
      {
        vesselName: "The ship",
        captainName: "The captain",
        port: "The port",
        arrivalDate: logDate
      }
    ];

    const expected = [
      {
        ...dataFromDb[0],
        arrivalDate: logDate.getTime()
      },
      {
        ...dataFromDb[1],
        arrivalDate: logDate.getTime()
      }
    ];

    const query = `
      query {
        places: getLogsByCaptain(name: "The captain", sort: DESC){
          vesselName
          captainName
          port
          arrivalDate
        }
      }
    `;

    const rootValue = {};
    const context = getContext("Logs", "findLogsByCaptain", dataFromDb);
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
