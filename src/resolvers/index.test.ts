import { getContext } from "../tests/utils/getContext";
import { getLogsByCaptain, getLogs } from "./index";

describe("getLogsByCaptain", () => {
  it("should return logs", async () => {
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
    const context = getContext("Logs", "findLogsByCaptain", expected);
    const result = await getLogsByCaptain({}, { name: "Captain" }, context);

    expect(result).toBe(expected);
  });
});

describe("getLogs", () => {
  it("should return logs", async () => {
    const expected = [
      {
        vesselName: "The ship",
        captainName: "The captain",
        port: "The port",
        arrivalDate: "1234567"
      }
    ];
    const context = getContext("Logs", "findLogs", expected);
    const result = await getLogs({}, {}, context);

    expect(result).toBe(expected);
  });
});
