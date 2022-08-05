// tslint:disable:no-submodule-imports
import { Options } from '../Options';
import { MetadataStorage } from '../metadata-builder/MetadataStorage';
import { ControllerMetadataArgs } from '../metadata/args/ControllerMetadataArgs';
import { IRoute } from '../openapi/common';

/**
 * Parse routing-controllers metadata into an IRoute objects array.
 */
export function parseRoutes(storage: MetadataStorage, options: Options = {}): IRoute[] {
  return storage.actions.map((action) => ({
    action,
    controller: storage.controllers.find((c) => c.target === action.target) as ControllerMetadataArgs,
    options,
    params: storage.filterParamsWithTargetAndMethod(action.target, action.method).sort((a, b) => a.index - b.index),
    responseHandlers: storage.filterResponseHandlersWithTargetAndMethod(action.target, action.method),
  }));
}
