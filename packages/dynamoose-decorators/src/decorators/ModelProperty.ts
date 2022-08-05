import { getDynamooseMetadataStorage } from '../metadata/getMetadataStorage';
import { ModelPropertyOptions } from '../metadata/types';

export function ModelProperty(options?: ModelPropertyOptions): PropertyDecorator {
  return (target, propertyKey) => {
    getDynamooseMetadataStorage().properties.push({
      target: target,
      name: propertyKey,
      type: 'add',
      options,
    });
  };
}
