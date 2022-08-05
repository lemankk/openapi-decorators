import { ActionMetadata } from '../metadata/ActionMetadata';
import { ControllerMetadata } from '../metadata/ControllerMetadata';
import { ParamMetadata } from '../metadata/ParamMetadata';
import { ResponseHandlerMetadata } from '../metadata/ResponseHandleMetadata';
import { Options } from '../Options';
/**
 * Builds metadata from the given metadata arguments.
 */
export declare class MetadataBuilder {
    private options;
    constructor(options: Options);
    /**
     * Builds controller metadata from a registered controller metadata args.
     */
    buildControllerMetadata(classes?: Function[]): ControllerMetadata[];
    /**
     * Creates controller metadatas.
     */
    protected createControllers(classes?: Function[]): ControllerMetadata[];
    /**
     * Creates action metadatas.
     */
    protected createActions(controller: ControllerMetadata): ActionMetadata[];
    /**
     * Creates param metadatas.
     */
    protected createParams(action: ActionMetadata): ParamMetadata[];
    /**
     * Creates response handler metadatas for action.
     */
    protected createActionResponseHandlers(action: ActionMetadata): ResponseHandlerMetadata[];
    /**
     * Creates response handler metadatas for controller.
     */
    protected createControllerResponseHandlers(controller: ControllerMetadata): ResponseHandlerMetadata[];
    /**
     * Decorate paramArgs with default settings
     */
    private decorateDefaultParamOptions;
}
