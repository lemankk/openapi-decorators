import type { MetadataStorage as _ClassTransformerMetadataStorage } from 'class-transformer/types/MetadataStorage';

/**
 * A global setting to store internally
 */
const config = {
  storage: null,
};

export type ClassTransformerMetadataStorage = _ClassTransformerMetadataStorage;

export function getTransformerMetadataStorage(): ClassTransformerMetadataStorage {
  let classTransformer: ClassTransformerMetadataStorage;
  try {
    /** "class-transformer" >= v0.3.x */
    classTransformer = require('class-transformer/cjs/storage').defaultMetadataStorage;
  } catch {
    /** "class-transformer" <= v0.3.x */
    classTransformer = require('class-transformer/storage').defaultMetadataStorage;
  }
  return classTransformer;
}

export function setDefaultMetadataStorage(defaultStorage: ClassTransformerMetadataStorage | null) {
  return (config.storage = defaultStorage);
}

export function getDefaultMetadataStorage(): ClassTransformerMetadataStorage {
  return config.storage || getTransformerMetadataStorage();
}
