import logger from "../logger";
import { InjectorInterface } from "../services/serviceInjector";

export enum SORT {
  ASC = 1,
  DESC = -1
}

export interface ContextInterface {
  logger: typeof logger;
  injector: InjectorInterface;
}

export interface PaginationInterface {
  first?: string;
  after?: string;
}

export type Connection<T> = {
  edges: { node: T }[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string;
  };
};
