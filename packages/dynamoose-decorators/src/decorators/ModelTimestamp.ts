import { getDynamooseMetadataStorage } from '../metadata/getMetadataStorage';

export function ModelTimestamp(): PropertyDecorator {
  return (target, propertyKey) => {
    getDynamooseMetadataStorage().properties.push({
      target: target,
      name: propertyKey,
      type: 'timestamp',
    });
  };
}
