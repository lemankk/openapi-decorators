// -------------------------------------------------------------------------
// Main Functions
// -------------------------------------------------------------------------

import { MetadataStorage } from './metadata-builder/MetadataStorage';

/**
 * Gets metadata args storage.
 * Metadata args storage follows the best practices and stores metadata in a global variable.
 */
export function getMetadataArgsStorage(): MetadataStorage {
  if (!(global as any).openapiMetadataArgsStorage) (global as any).openapiMetadataArgsStorage = new MetadataStorage();

  return (global as any).openapiMetadataArgsStorage;
}
