import { Options } from '../Options';
import { MetadataStorage } from '../metadata-builder/MetadataStorage';
import { IRoute } from '../openapi/common';
/**
 * Parse routing-controllers metadata into an IRoute objects array.
 */
export declare function parseRoutes(storage: MetadataStorage, options?: Options): IRoute[];
