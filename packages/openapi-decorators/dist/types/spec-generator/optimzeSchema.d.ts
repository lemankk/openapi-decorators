import 'reflect-metadata';
import { ReferenceObject, SchemaObject } from 'openapi3-ts';
/**
 * Reducing schema to be generate in output
 * @param listedSchemas
 * @param refPointerPrefix
 * @returns
 */
export declare const optimizeSchemas: (listedSchemas: Record<string, SchemaObject | ReferenceObject>, refPointerPrefix?: string) => {};
