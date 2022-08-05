import 'reflect-metadata';
import { ActionMetadataArgs } from 'src/metadata/args/ActionMetadataArgs';
import { ControllerMetadataArgs } from '../metadata/args/ControllerMetadataArgs';
import { ParamMetadataArgs } from '../metadata/args/ParamMetadataArgs';
import { ResponseHandlerMetadataArgs } from '../metadata/args/ResponseHandleMetadataArgs';
/**
 * Storage all metadatas read from decorators.
 */
export declare class MetadataStorage {
    /**
     * Registered controller metadata args.
     */
    controllers: ControllerMetadataArgs[];
    /**
     * Registered param metadata args.
     */
    params: ParamMetadataArgs[];
    /**
     * Registered response handler metadata args.
     */
    responseHandlers: ResponseHandlerMetadataArgs[];
    /**
     * Registered action metadata args.
     */
    actions: ActionMetadataArgs[];
    /**
     * Filters registered controllers by a given classes.
     */
    filterControllerMetadatasForClasses(classes: Function[]): ControllerMetadataArgs[];
    /**
     * Filters parameters by a given classes.
     */
    filterParamsWithTargetAndMethod(target: Function, methodName: string): ParamMetadataArgs[];
    /**
     * Filters registered actions by a given classes.
     */
    filterActionsWithTarget(target: Function): ActionMetadataArgs[];
    /**
     * Filters response handlers by a given class.
     */
    filterResponseHandlersWithTarget(target: Function): ResponseHandlerMetadataArgs[];
    /**
     * Filters response handlers by a given classes.
     */
    filterResponseHandlersWithTargetAndMethod(target: Function, methodName: string): ResponseHandlerMetadataArgs[];
    /**
     * Removes all saved metadata.
     */
    reset(): void;
}
