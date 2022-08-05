import { ControllerOptions } from '../decorator-options/ControllerOptions';
import { ActionMetadata } from './ActionMetadata';
import { ControllerMetadataArgs } from './args/ControllerMetadataArgs';
import { ResponseHandlerMetadata } from './ResponseHandleMetadata';
/**
 * Controller metadata.
 */
export declare class ControllerMetadata {
    /**
     * Controller actions.
     */
    actions: ActionMetadata[];
    /**
     * Indicates object which is used by this controller.
     */
    target: Function;
    /**
     * Base route for all actions registered in this controller.
     */
    route: string;
    /**
     * Controller type. Can be default or json-typed. Json-typed controllers operate with json requests and responses.
     */
    type: 'default' | 'json';
    /**
     * Options that apply to all controller actions.
     */
    options: ControllerOptions;
    /**
     * Indicates if this action uses Authorized decorator.
     */
    isAuthorizedUsed: boolean;
    /**
     * Roles set by @Authorized decorator.
     */
    authorizedRoles: any[];
    constructor(args: ControllerMetadataArgs);
    /**
     * Builds everything controller metadata needs.
     * Controller metadata should be used only after its build.
     */
    build(responseHandlers: ResponseHandlerMetadata[]): void;
}
