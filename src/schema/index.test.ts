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
          places: getLogs(sort: DESC){
            vesselName
            captainName
            port
            arrivalDate
          }
        }
      `;
      tester.test(true, validQuery);
    });

    it("Should pass if the sort is ASC", () => {
      const validQuery = `
        {
          places: getLogs(sort: ASC){
            vesselName
          }
        }
      `;
      tester.test(true, validQuery);
    });

    it("Should fail if the sort is non ASC or DESC", () => {
      const validQuery = `
        {
          places: getLogs(sort: FOO){
            vesselName
            captainName
            port
            arrivalDate
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
          places: getLogsByCaptain(name: "The captain", sort: DESC){
            vesselName
            captainName
            port
            arrivalDate
          }
        }
      `;
      tester.test(true, validQuery);
    });

    it("Should pass if the sort is ASC", () => {
      const validQuery = `
        {
          places: getLogsByCaptain(name: "The captain", sort: DESC){
            vesselName
            captainName
            port
            arrivalDate
          }
        }
      `;
      tester.test(true, validQuery);
    });

    it("Should fail if the sort is non ASC or DESC", () => {
      const validQuery = `
        {
          places: getLogsByCaptain(name: "The captain", sort: FOO){
            vesselName
            captainName
            port
            arrivalDate
          }
        }
      `;
      tester.test(false, validQuery);
    });

    it("Should fail if the name is missing", () => {
      const validQuery = `
        {
          places: getLogsByCaptain(sort: FOO){
            vesselName
            captainName
            port
            arrivalDate
          }
        }
      `;
      tester.test(false, validQuery);
    });
  });
});
