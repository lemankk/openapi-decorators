export type SetValueType = {
  wrapperName: 'Set';
  values: ValueType[];
  type: string;
};
export type GeneralValueType = string | boolean | number | Buffer | Date;
export type ValueType =
  | GeneralValueType
  | {
      [key: string]: ValueType;
    }
  | ValueType[]
  | SetValueType;

export interface IndexDefinition {
  name?: string;
  global?: boolean;
  rangeKey?: string;
  project?: boolean | string[];
  throughput?:
    | 'ON_DEMAND'
    | number
    | {
        read: number;
        write: number;
      };
}

export interface ModelPropertyOptions {
  hashKey?: boolean;
  rangeKey?: boolean;
  index?: boolean | IndexDefinition | IndexDefinition[];
  validate?: ValueType | RegExp | ((value: ValueType) => boolean | Promise<boolean>);
  get?: (value: ValueType) => ValueType;
  set?: (value: ValueType, oldValue?: ValueType) => ValueType | Promise<ValueType>;
  default?: ValueType | (() => ValueType);
  forceDefault?: boolean;
  enum?: ValueType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: any;
}

export interface PropertyMetadataArgs {
  target: object;

  name: string | symbol;

  type: 'add' | 'timestamp' | 'type';

  options?: ModelPropertyOptions;
}
