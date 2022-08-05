/* eslint-disable @typescript-eslint/ban-types */
import { PropertyMetadataArgs } from './types';

export class DynamooseMetadataStorage {
  properties: PropertyMetadataArgs[] = [];

  public findPropertiesForModel(target: Function | string): PropertyMetadataArgs[] {
    return this.properties.filter((prop) => {
      const resultA = prop.target.constructor === target;
      const resultB = typeof target === 'string' && (prop.target as Function).name === target;
      return resultA || resultB;
    });
  }
  public findPropertyForModel(target: Function | string, propertyName: string): PropertyMetadataArgs | undefined {
    return this.findPropertiesForModel(target).filter((prop) => prop.name === propertyName)[0];
  }
  public findTypePropertyForModel(target: Function | string, propertyName: string): PropertyMetadataArgs | undefined {
    return this.findPropertiesForModel(target).filter((prop) => prop.name === propertyName && prop.type === 'type')[0];
  }
}
