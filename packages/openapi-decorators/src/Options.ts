export interface Options {
  routePrefix?: string;
  operationIdWithController?: boolean;
  defaults?: {
    summary?: string;
    paramOptions?: {
      required?: boolean;
    };
  };
}
