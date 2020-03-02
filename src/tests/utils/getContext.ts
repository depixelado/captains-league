import logger from "../../logger";
jest.mock("../../logger");

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getContext = (
  serviceName: string,
  func: string,
  returnVal
): { logger; injector } => ({
  logger,
  injector: {
    get(service: string): any {
      const services = {
        [serviceName]: (): any => ({
          [func]: (): any => {
            return returnVal;
          }
        })
      };
      return services[service]();
    }
  }
});
/* eslint-enable @typescript-eslint/no-explicit-any */
