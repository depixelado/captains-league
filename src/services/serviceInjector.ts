import logger from "../logger";
import logs, { LogService } from "./logs";

const services = {
  Logs: (): LogService => logs
};

type ServiceKeys = keyof typeof services;
type AvailableServices = ReturnType<typeof services[ServiceKeys]>;

export interface InjectorInterface {
  get: (service: ServiceKeys) => AvailableServices;
}

const injector: InjectorInterface = {
  get(service) {
    try {
      return services[service]();
    } catch (error) {
      logger.error(error, "Service doesn't exist");
    }
  }
};

export default injector;
