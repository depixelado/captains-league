import { graphql } from "graphql";
import typeDefs from "../../schema";
import resolvers from "../../resolvers";
import { makeExecutableSchema } from "graphql-tools";
import { getContext } from "../utils/getContext";

describe("getLogs", () => {
  it("should eturn logs from all places and captains", async () => {
    const expected = [
      {
        vesselName: "The ship",
        captainName: "The captain",
        port: "The port",
        arrivalDate: "1234567"
      },
      {
        vesselName: "The ship",
        captainName: "The captain",
        port: "The port",
        arrivalDate: "1234567"
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
    const context = getContext("Logs", "findLogs", expected);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const result = await graphql(schema, query, rootValue, context);
    const { data } = result;

    expect(data).toEqual({ places: expected });
  });
});

describe("getLogsByCaptain", () => {
  it("should return logs by captain", async () => {
    const expected = [
      {
        vesselName: "The ship",
        captainName: "The captain",
        port: "The port",
        arrivalDate: "1234567"
      },
      {
        vesselName: "The ship",
        captainName: "The captain",
        port: "The port",
        arrivalDate: "1234567"
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
    const context = getContext("Logs", "findLogsByCaptain", expected);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const result = await graphql(schema, query, rootValue, context);
    const { data } = result;

    expect(data).toEqual({ places: expected });
  });
});
