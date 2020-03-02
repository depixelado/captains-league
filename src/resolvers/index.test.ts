import { getContext } from "../tests/utils/getContext";
import { getLogsByCaptain, getLogs, createLog } from "./index";

describe("getLogsByCaptain", () => {
  it("should return logs", async () => {
    const expected = [
      {
        vesselName: "The ship",
        captainName: "The captain",
        port: "The port",
        arrivalDate: new Date("2020-03-02T15:39:08.563+0000")
      },
      {
        vesselName: "The ship",
        captainName: "The captain",
        port: "The port",
        arrivalDate: new Date("2020-03-02T15:39:08.563+0000")
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
        arrivalDate: new Date("2020-03-02T15:39:08.563+0000")
      }
    ];
    const context = getContext("Logs", "findLogs", expected);
    const result = await getLogs({}, {}, context);

    expect(result).toBe(expected);
  });
});

describe("createLog", () => {
  it("should return created log", async () => {
    const newLog = {
      vesselName: "The ship",
      captainName: "The captain",
      port: "The port",
      arrivalDate: new Date("1583162334416")
    };

    const context = getContext("Logs", "createLog", newLog);
    const result = await createLog({}, { log: newLog }, context);

    expect(result).toBe(newLog);
  });
});
