import { getDynamooseMetadataStorage } from '../metadata/getMetadataStorage';
import { ModelPropertyOptions } from '../metadata/types';

export function ModelType(options?: ModelPropertyOptions): PropertyDecorator {
  return (target, propertyKey) => {
    getDynamooseMetadataStorage().properties.push({
      target: target,
      name: propertyKey,
      type: 'type',
      options,
    });
  };
}
