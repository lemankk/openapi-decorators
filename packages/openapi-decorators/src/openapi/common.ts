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
export function getContentType(route: IRoute): string {
  const defaultContentType = route.controller.type === 'json' ? 'application/json' : 'text/html; charset=utf-8';
  const contentMeta = route.responseHandlers.find((h) => h.type === 'content-type');
  return contentMeta ? contentMeta.value : defaultContentType;
}

/**
 * Return the status code of given route.
 */
export function getStatusCode(route: IRoute): string {
  const successMeta = route.responseHandlers.find((h) => h.type === 'success-code');
  return successMeta ? successMeta.value + '' : '200';
}

/**
 * Return OpenAPI Responses object of given route.
 */
export function getResponses(route: IRoute): oa.ResponsesObject {
  const contentType = getContentType(route);
  const successStatus = getStatusCode(route);

  return {
    [successStatus]: {
      content: { [contentType]: {} },
      description: 'Successful response',
    },
  };
}

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
