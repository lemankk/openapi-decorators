import 'reflect-metadata';
import { ActionMetadataArgs } from 'src/metadata/args/ActionMetadataArgs';
import { ControllerMetadataArgs } from '../metadata/args/ControllerMetadataArgs';
import { ParamMetadataArgs } from '../metadata/args/ParamMetadataArgs';
import { ResponseHandlerMetadataArgs } from '../metadata/args/ResponseHandleMetadataArgs';

/**
 * Storage all metadatas read from decorators.
 */
export class MetadataStorage {
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  /**
   * Registered controller metadata args.
   */
  controllers: ControllerMetadataArgs[] = [];

  /**
   * Registered param metadata args.
   */
  params: ParamMetadataArgs[] = [];

  /**
   * Registered response handler metadata args.
   */
  responseHandlers: ResponseHandlerMetadataArgs[] = [];

  /**
   * Registered action metadata args.
   */
  actions: ActionMetadataArgs[] = [];

  /**
   * Filters registered controllers by a given classes.
   */
  filterControllerMetadatasForClasses(classes: Function[]): ControllerMetadataArgs[] {
    return this.controllers.filter((ctrl) => {
      return classes.filter((cls) => ctrl.target === cls).length > 0;
    });
  }

  /**
   * Filters parameters by a given classes.
   */
  filterParamsWithTargetAndMethod(target: Function, methodName: string): ParamMetadataArgs[] {
    return this.params.filter((param) => {
      return param.object.constructor === target && param.method === methodName;
    });
  }

  /**
   * Filters registered actions by a given classes.
   */
  filterActionsWithTarget(target: Function): ActionMetadataArgs[] {
    return this.actions.filter((action) => action.target === target);
  }

  /**
   * Filters response handlers by a given class.
   */
  filterResponseHandlersWithTarget(target: Function): ResponseHandlerMetadataArgs[] {
    return this.responseHandlers.filter((property) => {
      return property.target === target;
    });
  }

  /**
   * Filters response handlers by a given classes.
   */
  filterResponseHandlersWithTargetAndMethod(target: Function, methodName: string): ResponseHandlerMetadataArgs[] {
    return this.responseHandlers.filter((property) => {
      return property.target === target && property.method === methodName;
    });
  }

  /**
   * Removes all saved metadata.
   */
  reset() {
    this.controllers = [];
    this.params = [];
    this.responseHandlers = [];
    this.actions = [];
  }
}
