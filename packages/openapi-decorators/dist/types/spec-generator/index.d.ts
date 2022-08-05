import * as oa from 'openapi3-ts';
import { MetadataStorage } from '../metadata-builder/MetadataStorage';
import { Options } from '../Options';
export * from './generateSpec';
export * from './parseMetadata';
export * from './optimzeSchema';
/**
 * Convert metadata into an OpenAPI specification.
 *
 * @param storage metadata storage
 * @param options options
 * @param additionalProperties Additional OpenAPI Spec properties
 */
export declare function generateSpec(storage: MetadataStorage, options?: Options, additionalProperties?: Partial<oa.OpenAPIObject>): oa.OpenAPIObject;
