import EasyGraphQLTester from "easygraphql-tester";
import typeDefs from "../schema";

describe("All", () => {
  let tester;

  beforeAll(() => {
    tester = new EasyGraphQLTester([typeDefs]);
  });

  describe("getLogs", () => {
    it("Should pass if the query is valid", () => {
      const validQuery = `
        {
          places:getLogs(sort: DESC) {
            edges {
              node {
                captainName
                vesselName
                port
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
      tester.test(true, validQuery);
    });

    it("Should pass if the sort is ASC", () => {
      const validQuery = `
        {
          places:getLogs(sort: ASC) {
            edges {
              node {
                captainName
                vesselName
                port
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
      tester.test(true, validQuery);
    });

    it("Should fail if the sort is non ASC or DESC", () => {
      const validQuery = `
        {
          places:getLogs(sort: FOO) {
            edges {
              node {
                captainName
                vesselName
                port
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
      tester.test(false, validQuery);
    });
  });

  describe("getLogsByCaptain", () => {
    it("Should pass if the query is valid", () => {
      const validQuery = `
        {
          places:getLogsByCaptain(name: "The captain", sort: DESC) {
            edges {
              node {
                captainName
                vesselName
                port
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
      tester.test(true, validQuery);
    });

    it("Should pass if the sort is ASC", () => {
      const validQuery = `
        {
          places:getLogsByCaptain(name: "The captain", sort: ASC) {
            edges {
              node {
                captainName
                vesselName
                port
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
      tester.test(true, validQuery);
    });

    it("Should fail if the sort is non ASC or DESC", () => {
      const invalidQuery = `
        {
          places:getLogsByCaptain(name: "The captain", sort: FOO) {
            edges {
              node {
                captainName
                vesselName
                port
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
      tester.test(false, invalidQuery);
    });

    it("Should fail if the name is missing", () => {
      const invalidQuery = `
        {
          places:getLogsByCaptain(sort: DESC) {
            edges {
              node {
                captainName
                vesselName
                port
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;
      tester.test(false, invalidQuery);
    });
  });

  describe("createLog", () => {
    it("Should pass if the query is valid", () => {
      const validQuery = `
        mutation addLog($input: LogInput!) {
          createLog(log: $input) {
            vesselName
            captainName
            port
            arrivalDate
          }
        }
      `;
      tester.test(true, validQuery, {
        input: {
          captainName: "The captain",
          vesselName: "The ship",
          port: "The port",
          arrivalDate: 1583162334416
        }
      });
    });

    it("Should fail if missing input params", () => {
      const invalidQuery = `
        mutation addLog($input: LogInput!) {
          createLog(log: $input) {
            vesselName
            captainName
            port
            arrivalDate
          }
        }
      `;
      tester.test(false, invalidQuery, {
        input: {
          port: "The port",
          arrivalDate: 1583162334416
        }
      });
    });

    it("Should fail if arrivalDate has a wrong type", () => {
      const invalidQuery = `
        mutation addLog($input: LogInput!) {
          createLog(log: $input) {
            vesselName
            captainName
            port
            arrivalDate
          }
        }
      `;
      tester.test(false, invalidQuery, {
        input: {
          port: "The port",
          arrivalDate: "1583162334416"
        }
      });
    });
  });
});
