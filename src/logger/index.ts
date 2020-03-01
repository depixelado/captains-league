import pino, { Logger } from "pino";
import config from "../config";

const options = {
  level: config.LOGGER_LEVEL || "info"
};

const logger: Logger = pino(
  options,
  pino.destination(config.LOGGER_DESTINATION)
);

export default logger;
