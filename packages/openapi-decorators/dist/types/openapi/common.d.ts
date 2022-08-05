import * as oa from 'openapi3-ts';
import { ActionMetadataArgs } from '../metadata/args/ActionMetadataArgs';
import { ControllerMetadataArgs } from '../metadata/args/ControllerMetadataArgs';
import { ParamMetadataArgs } from '../metadata/args/ParamMetadataArgs';
import { ResponseHandlerMetadataArgs } from '../metadata/args/ResponseHandleMetadataArgs';
import { Options } from '../Options';
/**
 * All the context for a single route.
 */
export interface IRoute {
    readonly action: ActionMetadataArgs;
    readonly controller: ControllerMetadataArgs;
    readonly options: Options;
    readonly params: ParamMetadataArgs[];
    readonly responseHandlers: ResponseHandlerMetadataArgs[];
}
/**
 * Return the content type of given route.
 */
export declare function getContentType(route: IRoute): string;
/**
 * Return the status code of given route.
 */
export declare function getStatusCode(route: IRoute): string;
/**
 * Return OpenAPI Responses object of given route.
 */
export declare function getResponses(route: IRoute): oa.ResponsesObject;
/**
 * All the context for a single route.
 */
export interface IRoute {
    readonly action: ActionMetadataArgs;
    readonly controller: ControllerMetadataArgs;
    readonly options: Options;
    readonly params: ParamMetadataArgs[];
    readonly responseHandlers: ResponseHandlerMetadataArgs[];
}
