import 'reflect-metadata';
import * as oa from 'openapi3-ts';
import { IRoute } from '../openapi/common';
import { Options } from 'src';
/** Return full Express path of given route. */
export declare function getFullExpressPath(route: IRoute): string;
/**
 * Return full OpenAPI-formatted path of given route.
 */
export declare function getFullPath(route: IRoute): string;
/**
 * Return OpenAPI Operation object for given route.
 */
export declare function getOperation(route: IRoute, options: Options, schemas: {
    [p: string]: oa.SchemaObject;
}): oa.OperationObject;
/**
 * Return OpenAPI Operation ID for given route.
 */
export declare function getOperationId(route: IRoute, withControllerName?: boolean): string;
/**
 * Return OpenAPI Paths Object for given routes
 */
export declare function getPaths(routes: IRoute[], options: Options, schemas: {
    [p: string]: oa.SchemaObject;
}): oa.PathObject;
/**
 * Return header parameters of given route.
 */
export declare function getHeaderParams(route: IRoute): oa.ParameterObject[];
/**
 * Return path parameters of given route.
 *
 * Path parameters are first parsed from the path string itself, and then
 * supplemented with possible @Param() decorator values.
 */
export declare function getPathParams(route: IRoute): oa.ParameterObject[];
/**
 * Return query parameters of given route.
 */
export declare function getQueryParams(route: IRoute, schemas: {
    [p: string]: oa.SchemaObject;
}): oa.ParameterObject[];
/**
 * Return OpenAPI requestBody of given route, if it has one.
 */
export declare function getRequestBody(route: IRoute): oa.RequestBodyObject | void;
/**
 * Return OpenAPI specification for given routes.
 */
export declare function getSpec(routes: IRoute[], options: Options, schemas: {
    [p: string]: oa.SchemaObject;
}): oa.OpenAPIObject;
/**
 * Return OpenAPI Operation summary string for given route.
 */
export declare function getSummary(route: IRoute): string;
/**
 * Return OpenAPI tags for given route.
 */
export declare function getTags(route: IRoute): string[];
/**
 * Convert an Express path into an OpenAPI-compatible path.
 */
export declare function expressToOpenAPIPath(expressPath: string): string;
