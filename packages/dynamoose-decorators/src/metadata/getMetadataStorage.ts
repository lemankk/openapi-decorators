/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamooseMetadataStorage } from './MetadataStorage';

export const getDynamooseMetadataStorage = (): DynamooseMetadataStorage => {
  (global as any).dynamooseMetadataStorage = (global as any).dynamooseMetadataStorage || new DynamooseMetadataStorage();
  return (global as any).dynamooseMetadataStorage;
};
