import LogModel, { Log } from "../src/models/Log";
import faker from "faker";

const NUM_CAPTAINS = 10;
const MIN_LOGS_PER_CAPTAIN = 2;
const MAX_LOGS_PER_CAPTAIN = 20;

const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

const captains: string[] = [...new Array(NUM_CAPTAINS)].map(() =>
  faker.name.findName()
);

const data: Log[] = captains.reduce((acc: Log[], captain: string) => {
  const logsAmount = getRandomNumber(
    MIN_LOGS_PER_CAPTAIN,
    MAX_LOGS_PER_CAPTAIN
  );

  const logs: Log[] = [...new Array(logsAmount)].map(() => ({
    captainName: captain,
    vesselName: `The ${faker.commerce.productAdjective()} ship`,
    arrivalDate: faker.date.future(),
    port: `${faker.address.city()} port`
  }));

  return [...acc, ...logs];
}, []);

export default async (): Promise<Log[]> => LogModel.create(data);
