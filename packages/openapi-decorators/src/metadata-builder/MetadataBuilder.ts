import { ActionMetadata } from '../metadata/ActionMetadata';
import { ControllerMetadata } from '../metadata/ControllerMetadata';
import { ParamMetadata } from '../metadata/ParamMetadata';
import { ParamMetadataArgs } from '../metadata/args/ParamMetadataArgs';
import { ResponseHandlerMetadata } from '../metadata/ResponseHandleMetadata';
import { Options } from '../Options';
import { getMetadataArgsStorage } from '../getMetadataArgsStorage';
import { ActionMetadataArgs } from '../metadata/args/ActionMetadataArgs';

/**
 * Builds metadata from the given metadata arguments.
 */
export class MetadataBuilder {
  constructor(private options: Options) {}

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  /**
   * Builds controller metadata from a registered controller metadata args.
   */
  buildControllerMetadata(classes?: Function[]): ControllerMetadata[] {
    return this.createControllers(classes);
  }

  // -------------------------------------------------------------------------
  // Protected Methods
  // -------------------------------------------------------------------------

  /**
   * Creates controller metadatas.
   */
  protected createControllers(classes?: Function[]): ControllerMetadata[] {
    const controllers = !classes
      ? getMetadataArgsStorage().controllers
      : getMetadataArgsStorage().filterControllerMetadatasForClasses(classes);
    return controllers.map((controllerArgs) => {
      const controller = new ControllerMetadata(controllerArgs);
      controller.build(this.createControllerResponseHandlers(controller));
      // controller.options = controllerArgs.options
      controller.actions = this.createActions(controller);
      return controller;
    });
  }

  /**
   * Creates action metadatas.
   */
  protected createActions(controller: ControllerMetadata): ActionMetadata[] {
    let target = controller.target;
    const actionsWithTarget: ActionMetadataArgs[] = [];
    while (target) {
      const actions = getMetadataArgsStorage()
        .filterActionsWithTarget(target)
        .filter((action) => {
          return actionsWithTarget.map((a) => a.method).indexOf(action.method) === -1;
        });

      actions.forEach((a) => {
        a.target = controller.target;

        actionsWithTarget.push(a);
      });

      target = Object.getPrototypeOf(target);
    }

    return actionsWithTarget.map((actionArgs) => {
      const action = new ActionMetadata(controller, actionArgs);
      action.options = { ...controller.options, ...actionArgs.options };
      action.params = this.createParams(action);
      action.build(this.createActionResponseHandlers(action));
      return action;
    });
  }

  /**
   * Creates param metadatas.
   */
  protected createParams(action: ActionMetadata): ParamMetadata[] {
    return getMetadataArgsStorage()
      .filterParamsWithTargetAndMethod(action.target, action.method)
      .map((paramArgs) => new ParamMetadata(action, this.decorateDefaultParamOptions(paramArgs)));
  }

  /**
   * Creates response handler metadatas for action.
   */
  protected createActionResponseHandlers(action: ActionMetadata): ResponseHandlerMetadata[] {
    return getMetadataArgsStorage()
      .filterResponseHandlersWithTargetAndMethod(action.target, action.method)
      .map((handlerArgs) => new ResponseHandlerMetadata(handlerArgs));
  }

  /**
   * Creates response handler metadatas for controller.
   */
  protected createControllerResponseHandlers(controller: ControllerMetadata): ResponseHandlerMetadata[] {
    return getMetadataArgsStorage()
      .filterResponseHandlersWithTarget(controller.target)
      .map((handlerArgs) => new ResponseHandlerMetadata(handlerArgs));
  }

  /**
   * Decorate paramArgs with default settings
   */
  private decorateDefaultParamOptions(paramArgs: ParamMetadataArgs) {
    const options = this.options.defaults && this.options.defaults.paramOptions;
    if (!options) return paramArgs;

    if (paramArgs.required === undefined) paramArgs.required = options.required || false;

    return paramArgs;
  }
}
