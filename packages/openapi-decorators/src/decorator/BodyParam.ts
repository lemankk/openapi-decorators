import { ParamOptions } from '../decorator-options/ParamOptions';
import { getMetadataArgsStorage } from '../getMetadataArgsStorage';

/**
 * Takes partial data of the request body.
 * Must be applied on a controller action parameter.
 */
export function BodyParam(name: string, options?: ParamOptions): Function {
  return function (object: Object, methodName: string, index: number) {
    getMetadataArgsStorage().params.push({
      type: 'body-param',
      object: object,
      method: methodName,
      index: index,
      name: name,
      parse: options?.parse || false,
      required: options?.required || false,
      explicitType: options ? options.type : undefined,
      classTransform: options ? options.transform : undefined,
      validate: options ? options.validate : undefined,
    });
  };
}
