declare namespace OBC {
import { Component, Disposable, Event } from "../Types";
/**
 * The entry point of the Components library. It can create, delete and access all the components of the library globally, update all the updatable components automatically and dispose all the components, preventing memory leaks.
 */
export declare class Components implements Disposable {
    /**
     * The version of the @thatopen/components library.
     */
    static readonly release = "2.4.10";
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<void>;
    /**
     * The list of components created in this app.
     * The keys are UUIDs and the values are instances of the components.
     */
    readonly list: Map<string, Component>;
    /**
     * If disabled, the animation loop will be stopped.
     * Default value is false.
     */
    enabled: boolean;
    private _clock;
    /**
     * Event that triggers the Components instance is initialized.
     *
     * @remarks
     * This event is triggered once when the {@link Components.init} method has been called and finish processing.
     * This is useful to set configuration placeholders that need to be executed when the components instance is initialized.
     * For example, enabling and configuring custom effects in a post-production renderer.
     *
     * @example
     * '''typescript
     * const components = new Components();
     * components.onInit.add(() => {
     *   // Enable custom effects in the post-production renderer
     *   // or any other operation dependant on the component initialization
     * });
     * components.init();
     * '''
     */
    readonly onInit: Event<undefined>;
    /**
     * Adds a component to the list of components.
     * Throws an error if a component with the same UUID already exists.
     *
     * @param uuid - The unique identifier of the component.
     * @param instance - The instance of the component to be added.
     *
     * @throws Will throw an error if a component with the same UUID already exists.
     *
     * @internal
     */
    add(uuid: string, instance: Component): void;
    /**
     * Retrieves a component instance by its constructor function.
     * If the component does not exist in the list, it will be created and added.
     *
     * @template U - The type of the component to retrieve.
     * @param Component - The constructor function of the component to retrieve.
     *
     * @returns The instance of the requested component.
     *
     * @throws Will throw an error if a component with the same UUID already exists.
     *
     * @internal
     */
    get<U extends Component>(Component: new (components: Components) => U): U;
    constructor();
    /**
     * Initializes the Components instance.
     * This method starts the animation loop, sets the enabled flag to true,
     * and calls the update method.
     */
    init(): void;
    /**
     * Disposes the memory of all the components and tools of this instance of
     * the library. A memory leak will be created if:
     *
     * - An instance of the library ends up out of scope and this function isn't
     * called. This is especially relevant in Single Page Applications (React,
     * Angular, Vue, etc).
     *
     * - Any of the objects of this instance (meshes, geometries,materials, etc) is
     * referenced by a reference type (object or array).
     *
     * You can learn more about how Three.js handles memory leaks
     * [here](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects).
     *
     */
    dispose(): void;
    private update;
    private static setupBVH;
}
import * as THREE from "three";
import { Components } from "../Components";
import { Component } from "../Types";
/**
 * A tool to safely remove meshes, geometries, materials and other items from memory to [prevent memory leaks](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects).
 */
export declare class Disposer extends Component {
    private _disposedComponents;
    /** {@link Component.enabled} */
    enabled: boolean;
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "76e9cd8e-ad8f-4753-9ef6-cbc60f7247fe";
    constructor(components: Components);
    /**
     * Return the UUIDs of all disposed components.
     */
    get(): Set<string>;
    /**
     * Removes a mesh, its geometry and its materials from memory. If you are
     * using any of these in other parts of the application, make sure that you
     * remove them from the mesh before disposing it.
     *
     * @param object - the [object](https://threejs.org/docs/#api/en/core/Object3D)
     * to remove.
     *
     * @param materials - whether to dispose the materials of the mesh.
     *
     * @param recursive - whether to recursively dispose the children of the mesh.
     */
    destroy(object: THREE.Object3D, materials?: boolean, recursive?: boolean): void;
    /**
     * Disposes a geometry from memory.
     *
     * @param geometry - the
     * [geometry](https://threejs.org/docs/#api/en/core/BufferGeometry)
     * to remove.
     */
    disposeGeometry(geometry: THREE.BufferGeometry): void;
    private disposeGeometryAndMaterials;
    private disposeChildren;
    private static disposeMaterial;
}
import { Component, Disposable, World, Event } from "../Types";
import { SimpleRaycaster } from "./src";
import { Components } from "../Components";
/**
 * A component that manages a raycaster for each world and automatically disposes it when its corresponding world is disposed. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/Raycasters). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/Raycasters).
 */
export declare class Raycasters extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "d5d8bdf0-db25-4952-b951-b643af207ace";
    /** {@link Component.enabled} */
    enabled: boolean;
    /**
     * A Map that stores raycasters for each world.
     * The key is the world's UUID, and the value is the corresponding SimpleRaycaster instance.
     */
    list: Map<string, SimpleRaycaster>;
    /** {@link Disposable.onDisposed} */
    onDisposed: Event<unknown>;
    constructor(components: Components);
    /**
     * Retrieves a SimpleRaycaster instance for the given world.
     * If a SimpleRaycaster instance already exists for the world, it will be returned.
     * Otherwise, a new SimpleRaycaster instance will be created and added to the list.
     *
     * @param world - The world for which to retrieve or create a SimpleRaycaster instance.
     * @returns The SimpleRaycaster instance for the given world.
     */
    get(world: World): SimpleRaycaster;
    /**
     * Deletes the SimpleRaycaster instance associated with the given world.
     * If a SimpleRaycaster instance exists for the given world, it will be disposed and removed from the list.
     *
     * @param world - The world for which to delete the SimpleRaycaster instance.
     * @returns {void}
     */
    delete(world: World): void;
    /** {@link Disposable.dispose} */
    dispose(): void;
}
import { SimpleScene, SimpleSceneConfig, SimpleSceneConfigManager } from "../Worlds";
import { DistanceRenderer } from "./src";
import { Configurable, Disposable } from "../Types";
/**
 * Configuration interface for the {@link ShadowedScene}. Defines properties for directional and ambient lights, as well as shadows.
 */
export interface ShadowedSceneConfig extends SimpleSceneConfig {
    shadows: {
        cascade: number;
        resolution: number;
    };
}
/**
 * A scene that supports efficient cast shadows. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/ShadowedScene). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/ShadowedScene).
 */
export declare class ShadowedScene extends SimpleScene implements Disposable, Configurable<SimpleSceneConfigManager, ShadowedSceneConfig> {
    private _distanceRenderer?;
    /**
     * Whether the bias property should be set automatically depending on the shadow distance.
     */
    autoBias: boolean;
    protected _defaultShadowConfig: {
        cascade: number;
        resolution: number;
    };
    private _lightsWithShadow;
    private _isComputingShadows;
    private _shadowsEnabled;
    private _bias;
    /**
     * The getter for the bias to prevent artifacts (stripes). It usually ranges between 0 and -0.005.
     */
    get bias(): number;
    /**
     * The setter for the bias to prevent artifacts (stripes). It usually ranges between 0 and -0.005.
     */
    set bias(value: number);
    /**
     * Getter to see whether the shadows are enabled or not in this scene instance.
     */
    get shadowsEnabled(): boolean;
    /**
     * Setter to control whether the shadows are enabled or not in this scene instance.
     */
    set shadowsEnabled(value: boolean);
    /**
     * Getter to get the renderer used to determine the farthest distance from the camera.
     */
    get distanceRenderer(): DistanceRenderer;
    /** {@link Configurable.setup} */
    setup(config?: Partial<ShadowedSceneConfig>): void;
    /** {@link Disposable.dispose} */
    dispose(): void;
    /** Update all the shadows of the scene. */
    updateShadows(): Promise<void>;
    private recomputeShadows;
}
import { Component, Disposable, Updateable, World, Event, BaseScene, BaseCamera, BaseRenderer, DataMap } from "../Types";
import { Components } from "../Components";
import { SimpleWorld } from "./src";
/**
 * A class representing a collection of worlds within a game engine. It manages the creation, deletion, and update of worlds. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/Worlds). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/Worlds).
 */
export declare class Worlds extends Component implements Updateable, Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "fdb61dc4-2ec1-4966-b83d-54ea795fad4a";
    /** {@link Updateable.onAfterUpdate} */
    readonly onAfterUpdate: Event<unknown>;
    /** {@link Updateable.onBeforeUpdate} */
    readonly onBeforeUpdate: Event<unknown>;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /**
     * A collection of worlds managed by this component.
     * The key is the unique identifier (UUID) of the world, and the value is the World instance.
     */
    list: DataMap<string, World>;
    /** {@link Component.enabled} */
    enabled: boolean;
    constructor(components: Components);
    /**
     * Creates a new instance of a SimpleWorld and adds it to the list of worlds.
     *
     * @template T - The type of the scene, extending from BaseScene. Defaults to BaseScene.
     * @template U - The type of the camera, extending from BaseCamera. Defaults to BaseCamera.
     * @template S - The type of the renderer, extending from BaseRenderer. Defaults to BaseRenderer.
     *
     * @throws {Error} - Throws an error if a world with the same UUID already exists in the list.
     */
    create<T extends BaseScene = BaseScene, U extends BaseCamera = BaseCamera, S extends BaseRenderer = BaseRenderer>(): SimpleWorld<T, U, S>;
    /**
     * Deletes a world from the list of worlds.
     *
     * @param {World} world - The world to be deleted.
     *
     * @throws {Error} - Throws an error if the provided world is not found in the list.
     */
    delete(world: World): void;
    /**
     * Disposes of the Worlds component and all its managed worlds.
     * This method sets the enabled flag to false, disposes of all worlds, clears the list,
     * and triggers the onDisposed event.
     */
    dispose(): void;
    /** {@link Updateable.update} */
    update(delta?: number): void | Promise<void>;
}
import * as THREE from "three";
import { Components } from "../Components";
import { MeshCullerRenderer } from "./src";
import { Component, Event, Disposable, World } from "../Types";
/**
 * A component that provides culling functionality for meshes in a 3D scene. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/Cullers). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/Cullers).
 */
export declare class Cullers extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "69f2a50d-c266-44fc-b1bd-fa4d34be89e6";
    /**
     * An event that is triggered when the Cullers component is disposed.
     */
    readonly onDisposed: Event<unknown>;
    private _enabled;
    /**
     * A map of MeshCullerRenderer instances, keyed by their world UUIDs.
     */
    list: Map<string, MeshCullerRenderer>;
    /** {@link Component.enabled} */
    get enabled(): boolean;
    /** {@link Component.enabled} */
    set enabled(value: boolean);
    constructor(components: Components);
    /**
     * Creates a new MeshCullerRenderer for the given world.
     * If a MeshCullerRenderer already exists for the world, it will return the existing one.
     *
     * @param world - The world for which to create the MeshCullerRenderer.
     *
     * @returns The newly created or existing MeshCullerRenderer for the given world.
     */
    create(world: World): MeshCullerRenderer;
    /**
     * Deletes the MeshCullerRenderer associated with the given world.
     * If a MeshCullerRenderer exists for the given world, it will be disposed and removed from the list.
     *
     * @param world - The world for which to delete the MeshCullerRenderer.
     *
     * @returns {void}
     */
    delete(world: World): void;
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Updates the given instanced meshes inside the all the cullers. You should use this if you change the count property, e.g. when changing the visibility of fragments.
     *
     * @param meshes - The meshes to update.
     *
     */
    updateInstanced(meshes: Iterable<THREE.InstancedMesh>): void;
}
import { Component, Disposable, World, Event } from "../Types";
import { SimpleGrid } from "./src";
import { Components } from "../Components";
/**
 * A component that manages grid instances. Each grid is associated with a unique world. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/Grids). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/Grids).
 */
export declare class Grids extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "d1e814d5-b81c-4452-87a2-f039375e0489";
    /**
     * A map of world UUIDs to their corresponding grid instances.
     */
    list: Map<string, SimpleGrid>;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /** {@link Component.enabled} */
    enabled: boolean;
    constructor(components: Components);
    /**
     * Creates a new grid for the given world.
     * Throws an error if a grid already exists for the world.
     *
     * @param world - The world to create the grid for.
     * @returns The newly created grid.
     *
     * @throws Will throw an error if a grid already exists for the given world.
     */
    create(world: World): SimpleGrid;
    /**
     * Deletes the grid associated with the given world.
     * If a grid does not exist for the given world, this method does nothing.
     *
     * @param world - The world for which to delete the grid.
     *
     * @remarks
     * This method will dispose of the grid and remove it from the internal list.
     * If the world is disposed before calling this method, the grid will be automatically deleted.
     */
    delete(world: World): void;
    /** {@link Disposable.dispose} */
    dispose(): void;
}
import * as THREE from "three";
import { Component, Configurable, Createable, Disposable, Event, Hideable, World } from "../Types";
import { SimplePlane } from "./src";
import { Components } from "../Components";
import { ClipperConfig, ClipperConfigManager } from "./src/clipper-config";
/**
 * A lightweight component to easily create, delete and handle [clipping planes](https://threejs.org/docs/#api/en/materials/Material.clippingPlanes). 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/Clipper). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/Clipper).
 *
 * @param components - the instance of {@link Components} used.
 * E.g. {@link SimplePlane}.
 */
export declare class Clipper extends Component implements Createable, Disposable, Hideable, Configurable<ClipperConfigManager, ClipperConfig> {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "66290bc5-18c4-4cd1-9379-2e17a0617611";
    /** {@link Configurable.onSetup} */
    readonly onSetup: Event<unknown>;
    /** Event that fires when the user starts dragging a clipping plane. */
    readonly onBeforeDrag: Event<void>;
    /** Event that fires when the user stops dragging a clipping plane. */
    readonly onAfterDrag: Event<void>;
    /**
     * Event that fires when the user starts creating a clipping plane.
     */
    readonly onBeforeCreate: Event<unknown>;
    /**
     * Event that fires when the user cancels the creation of a clipping plane.
     */
    readonly onBeforeCancel: Event<unknown>;
    /**
     * Event that fires after the user cancels the creation of a clipping plane.
     */
    readonly onAfterCancel: Event<unknown>;
    /**
     * Event that fires when the user starts deleting a clipping plane.
     */
    readonly onBeforeDelete: Event<unknown>;
    /**
     * Event that fires after a clipping plane has been created.
     * @param plane - The newly created clipping plane.
     */
    readonly onAfterCreate: Event<SimplePlane>;
    /**
     * Event that fires after a clipping plane has been deleted.
     * @param plane - The deleted clipping plane.
     */
    readonly onAfterDelete: Event<SimplePlane>;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<string>;
    /** {@link Configurable.isSetup} */
    isSetup: boolean;
    /**
     * Whether to force the clipping plane to be orthogonal in the Y direction
     * (up). This is desirable when clipping a building horizontally and a
     * clipping plane is created in its roof, which might have a slight
     * slope for draining purposes.
     */
    orthogonalY: boolean;
    /**
     * The tolerance that determines whether an almost-horizontal clipping plane
     * will be forced to be orthogonal to the Y direction. {@link orthogonalY}
     * has to be 'true' for this to apply.
     */
    toleranceOrthogonalY: number;
    /**
     * The type of clipping plane to be created.
     * Default is {@link SimplePlane}.
     */
    Type: new (...args: any) => SimplePlane;
    /**
     * A list of all the clipping planes created by this component.
     */
    list: SimplePlane[];
    /** {@link Configurable.config} */
    config: ClipperConfigManager;
    protected _defaultConfig: ClipperConfig;
    /** The material used in all the clipping planes. */
    private _material;
    private _size;
    private _enabled;
    private _visible;
    /** {@link Component.enabled} */
    get enabled(): boolean;
    /** {@link Component.enabled} */
    set enabled(state: boolean);
    /** {@link Hideable.visible } */
    get visible(): boolean;
    /** {@link Hideable.visible } */
    set visible(state: boolean);
    /** The material of the clipping plane representation. */
    get material(): THREE.MeshBasicMaterial;
    /** The material of the clipping plane representation. */
    set material(material: THREE.MeshBasicMaterial);
    /** The size of the geometric representation of the clippings planes. */
    get size(): number;
    /** The size of the geometric representation of the clippings planes. */
    set size(size: number);
    constructor(components: Components);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /** {@link Createable.create} */
    create(world: World): SimplePlane | null;
    /**
     * Creates a plane in a certain place and with a certain orientation,
     * without the need of the mouse.
     *
     * @param world - the world where this plane should be created.
     * @param normal - the orientation of the clipping plane.
     * @param point - the position of the clipping plane.
     * navigation.
     */
    createFromNormalAndCoplanarPoint(world: World, normal: THREE.Vector3, point: THREE.Vector3): SimplePlane;
    /**
     * {@link Createable.delete}
     *
     * @param world - the world where the plane to delete is.
     * @param plane - the plane to delete. If undefined, the first plane
     * found under the cursor will be deleted.
     */
    delete(world: World, plane?: SimplePlane): void;
    /**
     * Deletes all the existing clipping planes.
     *
     * @param types - the types of planes to be deleted. If not provided, all planes will be deleted.
     */
    deleteAll(types?: Set<string>): void;
    /** {@link Configurable.setup} */
    setup(config?: Partial<ClipperConfig>): void;
    private deletePlane;
    private pickPlane;
    private getAllPlaneMeshes;
    private createPlaneFromIntersection;
    private getWorldNormal;
    private normalizePlaneDirectionY;
    private newPlane;
    private updateMaterialsAndPlanes;
    private _onStartDragging;
    private _onEndDragging;
}
import { World, Component, Disposable, Event, DataMap, Configurable } from "../Types";
import { Components } from "../Components";
import { BCFViewpoint, Viewpoint } from "./src";
import { ViewpointsConfigManager, ViewpointsConfig } from "./src/viewpoints-config";
export declare class Viewpoints extends Component implements Disposable, Configurable<ViewpointsConfigManager, ViewpointsConfig> {
    static readonly uuid: "ee867824-a796-408d-8aa0-4e5962a83c66";
    enabled: boolean;
    /**
     * A DataMap that stores Viewpoint instances, indexed by their unique identifiers (guid).
     * This map is used to manage and retrieve Viewpoint instances within the Viewpoints component.
     */
    readonly list: DataMap<string, Viewpoint>;
    /**
     * Creates a new Viewpoint instance and adds it to the list.
     *
     * @param world - The world in which the Viewpoint will be created.
     * @param data - Optional partial data for the Viewpoint. If not provided, default data will be used.
     *
     * @returns The newly created Viewpoint instance.
     */
    create(world: World, data?: Partial<BCFViewpoint>): Viewpoint;
    constructor(components: Components);
    isSetup: boolean;
    setup(): void;
    onSetup: Event<unknown>;
    config: ViewpointsConfigManager;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /**
     * Disposes of the Viewpoints component and its associated resources.
     *
     * This method is responsible for cleaning up any resources held by the Viewpoints component,
     * such as disposing of the DataMap of Viewpoint instances and triggering and resetting the
     * onDisposed event.
     */
    dispose(): void;
}
import { MiniMap } from "./src";
import { Component, Updateable, World, Event, Disposable } from "../Types";
import { Components } from "../Components";
/**
 * A component that manages multiple {@link MiniMap} instances, each associated with a unique world ID. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/MiniMap). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/MiniMaps).
 */
export declare class MiniMaps extends Component implements Updateable, Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "39ad6aad-84c8-4adf-a1e0-7f25313a9e7f";
    /** {@link Updateable.onAfterUpdate} */
    readonly onAfterUpdate: Event<unknown>;
    /** {@link Updateable.onBeforeUpdate} */
    readonly onBeforeUpdate: Event<unknown>;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /** {@link Configurable.onSetup} */
    readonly onSetup: Event<unknown>;
    /** {@link Component.enabled} */
    enabled: boolean;
    /**
     * A collection of {@link MiniMap} instances, each associated with a unique world ID.
     */
    list: Map<string, MiniMap>;
    constructor(components: Components);
    /**
     * Creates a new {@link MiniMap} instance associated with the given world.
     * If a {@link MiniMap} instance already exists for the given world, an error will be thrown.
     *
     * @param world - The {@link World} for which to create a {@link MiniMap} instance.
     * @returns The newly created {@link MiniMap} instance.
     * @throws Will throw an error if a {@link MiniMap} instance already exists for the given world.
     */
    create(world: World): MiniMap;
    /**
     * Deletes a {@link MiniMap} instance associated with the given world ID.
     * If a {@link MiniMap} instance does not exist for the given ID, nothing happens.
     *
     * @param id - The unique identifier of the world for which to delete the {@link MiniMap} instance.
     * @returns {void}
     */
    delete(id: string): void;
    /** {@link Disposable.dispose} */
    dispose(): void;
    /** {@link Updateable.update} */
    update(): void;
}
import { Component, DataMap } from "../Types";
import { Components } from "../Components";
import { Configurator } from "./src";
/**
 * A tool to manage all the configuration from the app centrally.
 */
export declare class ConfigManager extends Component {
    /**
     * The list of all configurations of this app.
     */
    list: DataMap<string, Configurator<any, any>>;
    /** {@link Component.enabled} */
    enabled: boolean;
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "b8c764e0-6b24-4e77-9a32-35fa728ee5b4";
    constructor(components: Components);
}
import * as THREE from "three";
import { Components } from "../Components";
import { SimpleCamera } from "..";
import { NavigationMode, NavModeID, ProjectionManager } from "./src";
/**
 * A flexible camera that uses [yomotsu's cameracontrols](https://github.com/yomotsu/camera-controls) to control the camera in 2D and 3D. It supports multiple navigation modes, such as 2D floor plan navigation, first person and 3D orbit. This class extends the SimpleCamera class and adds additional functionality for managing different camera projections and navigation modes. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/OrthoPerspectiveCamera). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/OrthoPerspectiveCamera).
 */
export declare class OrthoPerspectiveCamera extends SimpleCamera {
    /**
     * A ProjectionManager instance that manages the projection modes of the camera.
     */
    readonly projection: ProjectionManager;
    /**
     * A THREE.OrthographicCamera instance that represents the orthographic camera.
     * This camera is used when the projection mode is set to orthographic.
     */
    readonly threeOrtho: THREE.OrthographicCamera;
    /**
     * A THREE.PerspectiveCamera instance that represents the perspective camera.
     * This camera is used when the projection mode is set to perspective.
     */
    readonly threePersp: THREE.PerspectiveCamera;
    protected readonly _userInputButtons: any;
    protected readonly _frustumSize = 50;
    protected readonly _navigationModes: Map<NavModeID, NavigationMode>;
    protected _mode: NavigationMode | null;
    private previousSize;
    /**
     * Getter for the current navigation mode.
     * Throws an error if the mode is not found or the camera is not initialized.
     *
     * @returns {NavigationMode} The current navigation mode.
     *
     * @throws {Error} Throws an error if the mode is not found or the camera is not initialized.
     */
    get mode(): NavigationMode;
    constructor(components: Components);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Sets a new {@link NavigationMode} and disables the previous one.
     *
     * @param mode - The {@link NavigationMode} to set.
     */
    set(mode: NavModeID): void;
    /**
     * Make the camera view fit all the specified meshes.
     *
     * @param meshes the meshes to fit. If it is not defined, it will
     * evaluate {@link Components.meshes}.
     * @param offset the distance to the fit object
     */
    fit(meshes: Iterable<THREE.Mesh>, offset?: number): Promise<void>;
    /**
     * Allows or prevents all user input.
     *
     * @param active - whether to enable or disable user inputs.
     */
    setUserInput(active: boolean): void;
    private disableUserInput;
    private enableUserInput;
    private newOrthoCamera;
    private setOrthoPerspCameraAspect;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import { Disposable, Component, Event, Components } from "../../core";
/**
 * Interface representing a classification system. The classification is organized by system and class name, and each class contains a map of fragment IDs with extra information.
 */
export interface Classification {
    /**
     * A system within the classification.
     * The key is the system name, and the value is an object representing the classes within the system.
     */
    [system: string]: {
        /**
         * A class within the system.
         * The key is the class name, and the value is an object containing a map of fragment IDs with extra information.
         */
        [groupName: string]: {
            map: FRAGS.FragmentIdMap;
            name: string;
            id: number | null;
        };
    };
}
interface ExportedClassification {
    [system: string]: {
        [groupName: string]: {
            map: {
                [name: string]: number[];
            };
            name: string;
            id: number | null;
        };
    };
}
/**
 * The Classifier component is responsible for classifying and categorizing fragments based on various criteria. It provides methods to add, remove, find, and filter fragments based on their classification. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/Classifier). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/Classifier).
 */
export declare class Classifier extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "e25a7f3c-46c4-4a14-9d3d-5115f24ebeb7";
    /** {@link Component.enabled} */
    enabled: boolean;
    /**
     * A map representing the classification systems.
     * The key is the system name, and the value is an object representing the classes within the system.
     */
    list: Classification;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    constructor(components: Components);
    private onFragmentsDisposed;
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Removes a fragment from the classification based on its unique identifier (guid).
     * This method iterates through all classification systems and classes, and deletes the fragment with the specified guid from the respective group.
     *
     * @param guid - The unique identifier of the fragment to be removed.
     */
    remove(guid: string): void;
    /**
     * Finds and returns fragments based on the provided filter criteria.
     * If no filter is provided, it returns all fragments.
     *
     * @param filter - An optional object containing filter criteria.
     * The keys of the object represent the classification system names,
     * and the values are arrays of class names to match.
     *
     * @returns A map of fragment GUIDs to their respective express IDs,
     * where the express IDs are filtered based on the provided filter criteria.
     *
     * @throws Will throw an error if the fragments map is malformed.
     */
    find(filter?: {
        [name: string]: string[];
    }): FRAGS.FragmentIdMap;
    /**
     * Classifies fragments based on their modelID.
     *
     * @param modelID - The unique identifier of the model to classify fragments by.
     * @param group - The FragmentsGroup containing the fragments to be classified.
     *
     * @remarks
     * This method iterates through the fragments in the provided group,
     * and classifies them based on their modelID.
     * The classification is stored in the 'list.models' property,
     * with the modelID as the key and a map of fragment IDs to their respective express IDs as the value.
     *
     */
    byModel(modelID: string, group: FRAGS.FragmentsGroup): void;
    /**
     * Classifies fragments based on their PredefinedType property.
     *
     * @param group - The FragmentsGroup containing the fragments to be classified.
     *
     * @remarks
     * This method iterates through the properties of the fragments in the provided group,
     * and classifies them based on their PredefinedType property.
     * The classification is stored in the 'list.predefinedTypes' property,
     * with the PredefinedType as the key and a map of fragment IDs to their respective express IDs as the value.
     *
     * @throws Will throw an error if the fragment ID is not found.
     */
    byPredefinedType(group: FRAGS.FragmentsGroup): Promise<void>;
    /**
     * Classifies fragments based on their entity type.
     *
     * @param group - The FragmentsGroup containing the fragments to be classified.
     *
     * @remarks
     * This method iterates through the relations of the fragments in the provided group,
     * and classifies them based on their entity type.
     * The classification is stored in the 'list.entities' property,
     * with the entity type as the key and a map of fragment IDs to their respective express IDs as the value.
     *
     * @throws Will throw an error if the fragment ID is not found.
     */
    byEntity(group: FRAGS.FragmentsGroup): void;
    /**
     * Classifies fragments based on a specific IFC relationship.
     *
     * @param group - The FragmentsGroup containing the fragments to be classified.
     * @param ifcRel - The IFC relationship number to classify fragments by.
     * @param systemName - The name of the classification system to store the classification.
     *
     * @remarks
     * This method iterates through the relations of the fragments in the provided group,
     * and classifies them based on the specified IFC relationship.
     * The classification is stored in the 'list' property under the specified system name,
     * with the relationship name as the class name and a map of fragment IDs to their respective express IDs as the value.
     *
     * @throws Will throw an error if the fragment ID is not found or if the IFC relationship is not valid.
     */
    byIfcRel(group: FRAGS.FragmentsGroup, ifcRel: number, systemName: string): Promise<void>;
    /**
     * Classifies fragments based on their spatial structure in the IFC model.
     *
     * @param model - The FragmentsGroup containing the fragments to be classified.
     * @param config - The configuration for the classifier. It includes "useProperties", which is true by default
     * (if false, the classification will use the expressIDs instead of the names), and "isolate", which will make
     * the classifier just pick the WEBIFC categories provided.
     *
     * @remarks
     * This method iterates through the relations of the fragments in the provided group,
     * and classifies them based on their spatial structure in the IFC model.
     * The classification is stored in the 'list' property under the system name "spatialStructures",
     * with the relationship name as the class name and a map of fragment IDs to their respective express IDs as the value.
     *
     * @throws Will throw an error if the fragment ID is not found or if the model relations do not exist.
     */
    bySpatialStructure(model: FRAGS.FragmentsGroup, config?: {
        useProperties?: boolean;
        isolate?: Set<number>;
        systemName?: string;
    }): Promise<void>;
    /**
     * Sets the color of the specified fragments.
     *
     * @param items - A map of fragment IDs to their respective express IDs.
     * @param color - The color to set for the fragments.
     * @param override - A boolean indicating whether to override the existing color of the fragments.
     *
     * @remarks
     * This method iterates through the provided fragment IDs, retrieves the corresponding fragments,
     * and sets their color using the 'setColor' method of the FragmentsGroup class.
     *
     * @throws Will throw an error if the fragment with the specified ID is not found.
     */
    setColor(items: FRAGS.FragmentIdMap, color: THREE.Color, override?: boolean): void;
    /**
     * Resets the color of the specified fragments to their original color.
     *
     * @param items - A map of fragment IDs to their respective express IDs.
     *
     * @remarks
     * This method iterates through the provided fragment IDs, retrieves the corresponding fragments,
     * and resets their color using the 'resetColor' method of the FragmentsGroup class.
     *
     * @throws Will throw an error if the fragment with the specified ID is not found.
     */
    resetColor(items: FRAGS.FragmentIdMap): void;
    /**
     * Exports the computed classification to persists them and import them back
     * later for faster loading.
     */
    export(): ExportedClassification;
    /**
     * Imports a classification previously exported with .export().
     * @param data the serialized classification to import.
     */
    import(data: ExportedClassification): void;
    protected saveItem(group: FRAGS.FragmentsGroup, systemName: string, className: string, expressID: number, parentID?: number | null): void;
}
export {};
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import { FragmentsGroup } from "@thatopen/fragments";
import { Component, Components, Disposable, Event } from "../../core";
/**
 * A simple implementation of bounding box that works for fragments. The resulting bbox is not 100% precise, but it's fast, and should suffice for general use cases such as camera zooming or general boundary determination. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/BoundingBoxer). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/BoundingBoxer).
 */
export declare class BoundingBoxer extends Component implements Disposable {
    static readonly uuid: "d1444724-dba6-4cdd-a0c7-68ee1450d166";
    /** {@link Component.enabled} */
    enabled: boolean;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    private _absoluteMin;
    private _absoluteMax;
    private _meshes;
    constructor(components: Components);
    /**
     * A static method to calculate the dimensions of a given bounding box.
     *
     * @param bbox - The bounding box to calculate the dimensions for.
     * @returns An object containing the width, height, depth, and center of the bounding box.
     */
    static getDimensions(bbox: THREE.Box3): {
        width: number;
        height: number;
        depth: number;
        center: THREE.Vector3;
    };
    /**
     * A static method to create a new bounding box boundary.
     *
     * @param positive - A boolean indicating whether to create a boundary for positive or negative values.
     * @returns A new THREE.Vector3 representing the boundary.
     *
     * @remarks
     * This method is used to create a new boundary for calculating bounding boxes.
     * It sets the x, y, and z components of the returned vector to positive or negative infinity,
     * depending on the value of the 'positive' parameter.
     *
     * @example
     * '''typescript
     * const positiveBound = BoundingBoxer.newBound(true);
     * console.log(positiveBound); // Output: Vector3 { x: Infinity, y: Infinity, z: Infinity }
     *
     * const negativeBound = BoundingBoxer.newBound(false);
     * console.log(negativeBound); // Output: Vector3 { x: -Infinity, y: -Infinity, z: -Infinity }
     * '''
     */
    static newBound(positive: boolean): THREE.Vector3;
    /**
     * A static method to calculate the bounding box of a set of points.
     *
     * @param points - An array of THREE.Vector3 representing the points.
     * @param min - An optional THREE.Vector3 representing the minimum bounds. If not provided, it will be calculated.
     * @param max - An optional THREE.Vector3 representing the maximum bounds. If not provided, it will be calculated.
     * @returns A THREE.Box3 representing the bounding box of the given points.
     *
     * @remarks
     * This method calculates the bounding box of a set of points by iterating through each point and updating the minimum and maximum bounds accordingly.
     * If the 'min' or 'max' parameters are provided, they will be used as the initial bounds. Otherwise, the initial bounds will be set to positive and negative infinity.
     *
     * @example
     * '''typescript
     * const points = [
     *   new THREE.Vector3(1, 2, 3),
     *   new THREE.Vector3(4, 5, 6),
     *   new THREE.Vector3(7, 8, 9),
     * ];
     *
     * const bbox = BoundingBoxer.getBounds(points);
     * console.log(bbox); // Output: Box3 { min: Vector3 { x: 1, y: 2, z: 3 }, max: Vector3 { x: 7, y: 8, z: 9 } }
     * '''
     */
    static getBounds(points: THREE.Vector3[], min?: THREE.Vector3, max?: THREE.Vector3): THREE.Box3;
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Returns the bounding box of the calculated fragments.
     *
     * @returns A new THREE.Box3 instance representing the bounding box.
     *
     * @remarks
     * This method clones the internal minimum and maximum vectors and returns a new THREE.Box3 instance.
     * The returned box represents the bounding box of the calculated fragments.
     *
     * @example
     * '''typescript
     * const boundingBox = boundingBoxer.get();
     * console.log(boundingBox); // Output: Box3 { min: Vector3 { x: -10, y: -10, z: -10 }, max: Vector3 { x: 10, y: 10, z: 10 } }
     * '''
     */
    get(): THREE.Box3;
    /**
     * Calculates and returns a sphere that encompasses the entire bounding box.
     *
     * @returns A new THREE.Sphere instance representing the calculated sphere.
     *
     * @remarks
     * This method calculates the center and radius of a sphere that encompasses the entire bounding box.
     * The center is calculated as the midpoint between the minimum and maximum bounds of the bounding box.
     * The radius is calculated as the distance from the center to the minimum bound.
     *
     * @example
     * '''typescript
     * const boundingBoxer = components.get(BoundingBoxer);
     * boundingBoxer.add(fragmentsGroup);
     * const boundingSphere = boundingBoxer.getSphere();
     * console.log(boundingSphere); // Output: Sphere { center: Vector3 { x: 0, y: 0, z: 0 }, radius: 10 }
     * '''
     */
    getSphere(): THREE.Sphere;
    /**
     * Returns a THREE.Mesh instance representing the bounding box.
     *
     * @returns A new THREE.Mesh instance representing the bounding box.
     *
     * @remarks
     * This method calculates the dimensions of the bounding box using the 'getDimensions' method.
     * It then creates a new THREE.BoxGeometry with the calculated dimensions.
     * A new THREE.Mesh is created using the box geometry, and it is added to the '_meshes' array.
     * The position of the mesh is set to the center of the bounding box.
     *
     * @example
     * '''typescript
     * const boundingBoxer = components.get(BoundingBoxer);
     * boundingBoxer.add(fragmentsGroup);
     * const boundingBoxMesh = boundingBoxer.getMesh();
     * scene.add(boundingBoxMesh);
     * '''
     */
    getMesh(): THREE.Mesh<THREE.BoxGeometry, THREE.Material | THREE.Material[], THREE.Object3DEventMap>;
    /**
     * Resets the internal minimum and maximum vectors to positive and negative infinity, respectively.
     * This method is used to prepare the BoundingBoxer for a new set of fragments.
     *
     * @remarks
     * This method is called when a new set of fragments is added to the BoundingBoxer.
     * It ensures that the bounding box calculations are accurate and up-to-date.
     *
     * @example
     * '''typescript
     * const boundingBoxer = components.get(BoundingBoxer);
     * boundingBoxer.add(fragmentsGroup);
     * // ...
     * boundingBoxer.reset();
     * '''
     */
    reset(): void;
    /**
     * Adds a FragmentsGroup to the BoundingBoxer.
     *
     * @param group - The FragmentsGroup to add.
     *
     * @remarks
     * This method iterates through each fragment in the provided FragmentsGroup,
     * and calls the 'addMesh' method for each fragment's mesh.
     *
     * @example
     * '''typescript
     * const boundingBoxer = components.get(BoundingBoxer);
     * boundingBoxer.add(fragmentsGroup);
     * '''
     */
    add(group: FragmentsGroup): void;
    /**
     * Adds a mesh to the BoundingBoxer and calculates the bounding box.
     *
     * @param mesh - The mesh to add. It can be an instance of THREE.InstancedMesh, THREE.Mesh, or FRAGS.CurveMesh.
     * @param itemIDs - An optional iterable of numbers representing the item IDs.
     *
     * @remarks
     * This method calculates the bounding box of the provided mesh and updates the internal minimum and maximum vectors.
     * If the mesh is an instance of THREE.InstancedMesh, it calculates the bounding box for each instance.
     * If the mesh is an instance of FRAGS.FragmentMesh and itemIDs are provided, it calculates the bounding box for the specified item IDs.
     *
     * @example
     * '''typescript
     * const boundingBoxer = components.get(BoundingBoxer);
     * boundingBoxer.addMesh(mesh);
     * '''
     */
    addMesh(mesh: THREE.InstancedMesh | THREE.Mesh | FRAGS.CurveMesh, itemIDs?: Iterable<number>): void;
    /**
     * Uses a FragmentIdMap to add its meshes to the bb calculation.
     *
     * This method iterates through the provided 'fragmentIdMap', retrieves the corresponding fragment from the 'FragmentsManager',
     * and then calls the 'addMesh' method for each fragment's mesh, passing the expression IDs as the second parameter.
     *
     * @param fragmentIdMap - A mapping of fragment IDs to their corresponding expression IDs.
     *
     * @remarks
     * This method is used to add a mapping of fragment IDs to their corresponding expression IDs.
     * It ensures that the bounding box calculations are accurate and up-to-date by updating the internal minimum and maximum vectors.
     *
     * @example
     * '''typescript
     * const boundingBoxer = components.get(BoundingBoxer);
     * const fragmentIdMap: FRAGS.FragmentIdMap = {
     *   '5991fa75-2eef-4825-90b3-85177f51a9c9': [123, 245, 389],
     *   '3469077e-39bf-4fc9-b3e6-4a1d78ad52b0': [454, 587, 612],
     * };
     * boundingBoxer.addFragmentIdMap(fragmentIdMap);
     * '''
     */
    addFragmentIdMap(fragmentIdMap: FRAGS.FragmentIdMap): void;
    private static getFragmentBounds;
}
import { Component, Disposable, Event, Components } from "../../core";
/**
 * The Exploder component is responsible for managing the explosion of 3D model fragments (generally by floor). 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/Exploder). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/Exploder).
 */
export declare class Exploder extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "d260618b-ce88-4c7d-826c-6debb91de3e2";
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /** {@link Component.enabled} */
    enabled: boolean;
    /**
     * The height of the explosion animation.
     * This property determines the vertical distance by which fragments are moved during the explosion.
     * Default value is 10.
     */
    height: number;
    /**
     * The group name used for the explosion animation.
     * This property specifies the group of fragments that will be affected by the explosion.
     * Default value is "storeys".
     */
    groupName: string;
    /**
     * A set of strings representing the exploded items.
     * This set is used to keep track of which items have been exploded.
     */
    list: Set<string>;
    constructor(components: Components);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Sets the explosion state of the fragments.
     *
     * @param active - A boolean indicating whether to activate or deactivate the explosion.
     *
     * @remarks
     * This method applies a vertical transformation to the fragments based on the 'active' parameter.
     * If 'active' is true, the fragments are moved upwards by a distance determined by the 'height' property.
     * If 'active' is false, the fragments are moved back to their original position.
     *
     * The method also keeps track of the exploded items using the 'list' set.
     *
     * @throws Will throw an error if the 'Classifier' or 'FragmentsManager' components are not found in the 'components' system.
     */
    set(active: boolean): void;
}
import * as FRAGS from "@thatopen/fragments";
import { Components, Component } from "../../core";
/**
 * A component that hides or isolates fragments within a 3D scene. It extends the base Component class and provides methods to control fragment visibility and isolation. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/Hider). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/Hider).
 */
export declare class Hider extends Component {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "dd9ccf2d-8a21-4821-b7f6-2949add16a29";
    /** {@link Component.enabled} */
    enabled: boolean;
    constructor(components: Components);
    /**
     * Sets the visibility of fragments within the 3D scene.
     * If no 'items' parameter is provided, all fragments will be set to the specified visibility.
     * If 'items' is provided, only the specified fragments will be affected.
     *
     * @param visible - The visibility state to set for the fragments.
     * @param items - An optional map of fragment IDs and their corresponding sub-fragment IDs to be affected.
     * If not provided, all fragments will be affected.
     *
     * @returns {void}
     */
    set(visible: boolean, items?: FRAGS.FragmentIdMap): void;
    /**
     * Isolates fragments within the 3D scene by hiding all other fragments and showing only the specified ones.
     * It calls the 'set' method twice: first to hide all fragments, and then to show only the specified ones.
     *
     * @param items - A map of fragment IDs and their corresponding sub-fragment IDs to be isolated.
     * If not provided, all fragments will be isolated.
     *
     * @returns {void}
     */
    isolate(items: FRAGS.FragmentIdMap): void;
    private updateCulledVisibility;
}
import * as THREE from "three";
export declare function obbFromPoints(vertices: ArrayLike<number>): {
    center: THREE.Vector3;
    halfSizes: THREE.Vector3;
    rotation: THREE.Matrix3;
    transformation: THREE.Matrix4;
};
export declare function isPointInFrontOfPlane(point: number[], planePoint: number[], planeNormal: number[]): boolean;
import * as WEBIFC from "web-ifc";
import * as FRAGS from "@thatopen/fragments";
import { IfcFragmentSettings } from "./src";
import { Component, Components, Event, Disposable } from "../../core";
/**
 * The IfcLoader component is responsible for loading and processing IFC files. It utilizes the Web-IFC library to handle the IFC data and the Three.js library for 3D rendering. The class provides methods for setting up, loading, and cleaning up IFC files. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/IfcLoader). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/IfcLoader).
 */
export declare class IfcLoader extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "a659add7-1418-4771-a0d6-7d4d438e4624";
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<string>;
    /**
     * An event triggered when the IFC file starts loading.
     */
    readonly onIfcStartedLoading: Event<void>;
    /**
     * An event triggered when the setup process is completed.
     */
    readonly onSetup: Event<void>;
    /**
     * The settings for the IfcLoader.
     * It includes options for excluding categories, setting WASM paths, and more.
     */
    settings: IfcFragmentSettings;
    /**
     * The instance of the Web-IFC library used for handling IFC data.
     */
    webIfc: WEBIFC.IfcAPI;
    /** {@link Component.enabled} */
    enabled: boolean;
    private _material;
    private _spatialTree;
    private _metaData;
    private _fragmentInstances;
    private _civil;
    private _visitedFragments;
    private _materialT;
    constructor(components: Components);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Sets up the IfcLoader component with the provided configuration.
     *
     * @param config - Optional configuration settings for the IfcLoader.
     * If not provided, the existing settings will be used.
     *
     * @returns A Promise that resolves when the setup process is completed.
     *
     * @remarks
     * If the 'autoSetWasm' option is enabled in the configuration,
     * the method will automatically set the WASM paths for the Web-IFC library.
     *
     * @example
     * '''typescript
     * const ifcLoader = new IfcLoader(components);
     * await ifcLoader.setup({ autoSetWasm: true });
     * '''
     */
    setup(config?: Partial<IfcFragmentSettings>): Promise<void>;
    /**
     * Loads an IFC file and processes it for 3D visualization.
     *
     * @param data - The Uint8Array containing the IFC file data.
     * @param coordinate - Optional boolean indicating whether to coordinate the loaded IFC data. Default is true.
     *
     * @returns A Promise that resolves to the FragmentsGroup containing the loaded and processed IFC data.
     *
     * @example
     * '''typescript
     * const ifcLoader = components.get(IfcLoader);
     * const group = await ifcLoader.load(ifcData);
     * '''
     */
    load(data: Uint8Array, coordinate?: boolean, name?: string): Promise<FRAGS.FragmentsGroup>;
    /**
     * Reads an IFC file and initializes the Web-IFC library.
     *
     * @param data - The Uint8Array containing the IFC file data.
     *
     * @returns A Promise that resolves when the IFC file is opened and initialized.
     *
     * @remarks
     * This method sets the WASM path and initializes the Web-IFC library based on the provided settings.
     * It also opens the IFC model using the provided data and settings.
     *
     * @example
     * '''typescript
     * const ifcLoader = components.get(IfcLoader);
     * await ifcLoader.readIfcFile(ifcData);
     * '''
     */
    readIfcFile(data: Uint8Array): Promise<number>;
    /**
     * Cleans up the IfcLoader component by resetting the Web-IFC library,
     * clearing the visited fragments and fragment instances maps, and creating a new instance of the Web-IFC library.
     *
     * @remarks
     * This method is called automatically after using the .load() method, so usually you don't need to use it manually.
     *
     * @example
     * '''typescript
     * const ifcLoader = components.get(IfcLoader);
     * ifcLoader.cleanUp();
     * '''
     */
    cleanUp(): void;
    private getAllGeometries;
    private getMesh;
    private getGeometry;
    private autoSetWasm;
}
import * as THREE from "three";
export declare class MaterialsUtils {
    static isTransparent(material: THREE.Material): boolean;
}
export declare class UUID {
    private static _pattern;
    private static _lut;
    static create(): string;
    static validate(uuid: string): void;
}
import * as THREE from "three";
import { Component, Components, Disposable, Event, World } from "../core";
/**
 * Configuration interface for the VertexPicker component.
 */
export interface VertexPickerConfig {
    /**
     * If true, only vertices will be picked, not the closest point on the face.
     */
    showOnlyVertex: boolean;
    /**
     * The maximum distance for snapping to a vertex.
     */
    snapDistance: number;
    /**
     * The HTML element to use for previewing the picked vertex.
     */
    previewElement: HTMLElement;
}
/**
 * A class that provides functionality for picking vertices in a 3D scene.
 */
export declare class VertexPicker extends Component implements Disposable {
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /**
     * An event that is triggered when a vertex is found.
     * The event passes a THREE.Vector3 representing the position of the found vertex.
     */
    readonly onVertexFound: Event<THREE.Vector3>;
    /**
     * An event that is triggered when a vertex is lost.
     * The event passes a THREE.Vector3 representing the position of the lost vertex.
     */
    readonly onVertexLost: Event<THREE.Vector3>;
    /**
     * An event that is triggered when the picker is enabled or disabled
     */
    readonly onEnabled: Event<boolean>;
    /**
     * A reference to the Components instance associated with this VertexPicker.
     */
    components: Components;
    /**
     * A reference to the working plane used for vertex picking.
     * This plane is used to determine which vertices are considered valid for picking.
     * If this value is null, all vertices are considered valid.
     */
    workingPlane: THREE.Plane | null;
    private _pickedPoint;
    private _config;
    private _enabled;
    /**
     * Sets the enabled state of the VertexPicker.
     * When enabled, the VertexPicker will actively search for vertices in the 3D scene.
     * When disabled, the VertexPicker will stop searching for vertices and reset the picked point.
     *
     * @param value - The new enabled state.
     */
    set enabled(value: boolean);
    /**
     * Gets the current enabled state of the VertexPicker.
     *
     * @returns The current enabled state.
     */
    get enabled(): boolean;
    /**
     * Sets the configuration for the VertexPicker component.
     *
     * @param value - A Partial object containing the configuration properties to update.
     * The properties not provided in the value object will retain their current values.
     *
     * @example
     * '''typescript
     * vertexPicker.config = {
     *   snapDistance: 0.5,
     *   showOnlyVertex: true,
     * };
     * '''
     */
    set config(value: Partial<VertexPickerConfig>);
    /**
     * Gets the current configuration for the VertexPicker component.
     *
     * @returns A copy of the current VertexPickerConfig object.
     *
     * @example
     * '''typescript
     * const currentConfig = vertexPicker.config;
     * console.log(currentConfig.snapDistance); // Output: 0.25
     * '''
     */
    get config(): Partial<VertexPickerConfig>;
    constructor(components: Components, config?: Partial<VertexPickerConfig>);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Performs the vertex picking operation based on the current state of the VertexPicker.
     *
     * @param world - The World instance to use for raycasting.
     *
     * @returns The current picked point, or null if no point is picked.
     *
     * @remarks
     * This method checks if the VertexPicker is enabled. If not, it returns the current picked point.
     * If enabled, it performs raycasting to find the closest intersecting object.
     * It then determines the closest vertex or point on the face, based on the configuration settings.
     * If the picked point is on the working plane (if defined), it triggers the 'onVertexFound' event and updates the 'pickedPoint'.
     * If the picked point is not on the working plane, it resets the 'pickedPoint'.
     * If no intersecting object is found, it triggers the 'onVertexLost' event and resets the 'pickedPoint'.
     */
    get(world: World): THREE.Vector3 | null;
    private getClosestVertex;
    private getVertices;
    private getVertex;
}
import { Fragment, FragmentsGroup } from "@thatopen/fragments";
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import { Component, Components, Event, Disposable, DataMap } from "../../core";
import { RelationsMap } from "../../ifc/IfcRelationsIndexer/src/types";
/**
 * Component to load, delete and manage [fragments](https://github.com/ThatOpen/engine_fragment) efficiently. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/FragmentsManager). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/FragmentsManager).
 */
export declare class FragmentsManager extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "fef46874-46a3-461b-8c44-2922ab77c806";
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /**
     * Event triggered when fragments are loaded.
     */
    readonly onFragmentsLoaded: Event<FragmentsGroup>;
    /**
     * Event triggered when fragments are disposed.
     */
    readonly onFragmentsDisposed: Event<{
        groupID: string;
        fragmentIDs: string[];
    }>;
    /**
     * DataMap containing all loaded fragments.
     * The key is the fragment's unique identifier, and the value is the fragment itself.
     */
    readonly list: DataMap<string, Fragment>;
    /**
     * DataMap containing all loaded fragment groups.
     * The key is the group's unique identifier, and the value is the group itself.
     */
    readonly groups: DataMap<string, FragmentsGroup>;
    baseCoordinationModel: string;
    baseCoordinationMatrix: THREE.Matrix4;
    /** {@link Component.enabled} */
    enabled: boolean;
    private _loader;
    /**
     * Getter for the meshes of all fragments in the FragmentsManager.
     * It iterates over the fragments in the list and pushes their meshes into an array.
     * @returns {THREE.Mesh[]} An array of THREE.Mesh objects representing the fragments.
     */
    get meshes(): THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>[];
    constructor(components: Components);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Dispose of a specific fragment group.
     * This method removes the group from the groups map, deletes all fragments within the group from the list,
     * disposes of the group, and triggers the onFragmentsDisposed event.
     *
     * @param group - The fragment group to be disposed.
     */
    disposeGroup(group: FragmentsGroup): void;
    /**
     * Loads a binary file that contain fragment geometry.
     * @param data - The binary data to load.
     * @param config - Optional configuration for loading.
     * @param config.isStreamed - Optional setting to determine whether this model is streamed or not.
     * @param config.coordinate - Whether to apply coordinate transformation. Default is true.
     * @param config.properties - Ifc properties to set on the loaded fragments. Not to be used when streaming.
     * @returns The loaded FragmentsGroup.
     */
    load(data: Uint8Array, config?: Partial<{
        coordinate: boolean;
        name: string;
        properties: FRAGS.IfcProperties;
        relationsMap: RelationsMap;
        isStreamed?: boolean;
    }>): FragmentsGroup;
    /**
     * Export the specified fragmentsgroup to binary data.
     * @param group - the fragments group to be exported.
     * @returns the exported data as binary buffer.
     */
    export(group: FragmentsGroup): Uint8Array;
    /**
     * Gets a map of model IDs to sets of express IDs for the given fragment ID map.
     * @param fragmentIdMap - A map of fragment IDs to their corresponding express IDs.
     * @returns A map of model IDs to sets of express IDs.
     */
    getModelIdMap(fragmentIdMap: FRAGS.FragmentIdMap): {
        [modelID: string]: Set<number>;
    };
    /**
     * Converts a map of model IDs to sets of express IDs to a fragment ID map.
     * @param modelIdMap - A map of model IDs to their corresponding express IDs.
     * @returns A fragment ID map.
     * @remarks
     * This method iterates through the provided model ID map, retrieves the corresponding model from the 'groups' map,
     * and then calls the 'getFragmentMap' method of the model to obtain a fragment ID map for the given express IDs.
     * The fragment ID maps are then merged into a single map and returned.
     * If a model with a given ID is not found in the 'groups' map, the method skips that model and continues with the next one.
     */
    modelIdToFragmentIdMap(modelIdMap: {
        [modelID: string]: Set<number>;
    }): FRAGS.FragmentIdMap;
    /**
     * Converts a collection of IFC GUIDs to a fragmentIdMap.
     *
     * @param guids - An iterable collection of global IDs to be converted to a fragment ID map.
     *
     * @returns A fragment ID map, where the keys are fragment IDs and the values are the corresponding express IDs.
     */
    guidToFragmentIdMap(guids: Iterable<string>): FRAGS.FragmentIdMap;
    /**
     * Converts a fragment ID map to a collection of IFC GUIDs.
     *
     * @param fragmentIdMap - A fragment ID map to be converted to a collection of IFC GUIDs.
     *
     * @returns An array of IFC GUIDs.
     */
    fragmentIdMapToGuids(fragmentIdMap: FRAGS.FragmentIdMap): string[];
    /**
     * Applies coordinate transformation to the provided models.
     * If no models are provided, all groups are used.
     * The first model in the list becomes the base model for coordinate transformation.
     * All other models are then transformed to match the base model's coordinate system.
     *
     * @param models - The models to apply coordinate transformation to.
     * If not provided, all models are used.
     */
    coordinate(models?: FragmentsGroup[]): void;
    /**
     * Applies the base coordinate system to the provided object.
     *
     * This function takes an object and its original coordinate system as input.
     * It then inverts the original coordinate system and applies the base coordinate system
     * to the object. This ensures that the object's position, rotation, and scale are
     * transformed to match the base coordinate system (which is taken from the first model loaded).
     *
     * @param object - The object to which the base coordinate system will be applied.
     * This should be an instance of THREE.Object3D.
     *
     * @param originalCoordinateSystem - The original coordinate system of the object.
     * This should be a THREE.Matrix4 representing the object's transformation matrix.
     */
    applyBaseCoordinateSystem(object: THREE.Object3D | THREE.Vector3, originalCoordinateSystem?: THREE.Matrix4): void;
    /**
     * Creates a copy of the whole model or a part of it.
     *
     * @param model - The model to clone.
     * @param items - Optional - The part of the model to be cloned. If not given, the whole group is cloned.
     *
     */
    clone(model: FRAGS.FragmentsGroup, items?: FRAGS.FragmentIdMap): FragmentsGroup;
}
import * as WEBIFC from "web-ifc";
import { Components, Disposable, Event, Component, AsyncEvent } from "../../core";
import { IfcStreamingSettings, StreamedGeometries, StreamedAsset } from "./src";
/**
 * A component that handles the tiling of IFC geometries for efficient streaming. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/IfcGeometryTiler). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/IfcGeometryTiler).
 */
export declare class IfcGeometryTiler extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "d9999a00-e1f5-4d3f-8cfe-c56e08609764";
    /**
     * Event triggered when geometry is streamed.
     * Contains the streamed geometry data and its buffer.
     */
    readonly onGeometryStreamed: AsyncEvent<{
        buffer: Uint8Array;
        data: StreamedGeometries;
    }>;
    /**
     * Event triggered when assets are streamed.
     * Contains the streamed assets.
     */
    readonly onAssetStreamed: AsyncEvent<StreamedAsset[]>;
    /**
     * Event triggered to indicate the progress of the streaming process.
     * Contains the progress percentage.
     */
    readonly onProgress: AsyncEvent<number>;
    /**
     * Event triggered when the IFC file is loaded.
     * Contains the loaded IFC file data.
     */
    readonly onIfcLoaded: AsyncEvent<Uint8Array>;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /**
     * Settings for the IfcGeometryTiler.
     */
    settings: IfcStreamingSettings;
    /** {@link Component.enabled} */
    enabled: boolean;
    /**
     * The WebIFC API instance used for IFC file processing.
     */
    webIfc: WEBIFC.IfcAPI;
    private _nextAvailableID;
    private _splittedGeometries;
    private _spatialTree;
    private _metaData;
    private _visitedGeometries;
    private _streamSerializer;
    private _geometries;
    private _geometryCount;
    private _civil;
    private _groupSerializer;
    private _assets;
    private _meshesWithHoles;
    constructor(components: Components);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * This method streams the IFC file from a given buffer.
     *
     * @param data - The Uint8Array containing the IFC file data.
     * @returns A Promise that resolves when the streaming process is complete.
     *
     * @remarks
     * This method cleans up any resources after the streaming process is complete.
     *
     * @example
     * '''typescript
     * const ifcData = await fetch('path/to/ifc/file.ifc');
     * const rawBuffer = await response.arrayBuffer();
     * const ifcBuffer = new Uint8Array(rawBuffer);
     * await ifcGeometryTiler.streamFromBuffer(ifcBuffer);
     * '''
     */
    streamFromBuffer(data: Uint8Array): Promise<void>;
    /**
     * This method streams the IFC file from a given callback.
     *
     * @param loadCallback - The callback function that will be used to load the IFC file.
     * @returns A Promise that resolves when the streaming process is complete.
     *
     * @remarks
     * This method cleans up any resources after the streaming process is complete.
     *
     */
    streamFromCallBack(loadCallback: WEBIFC.ModelLoadCallback): Promise<void>;
    private readIfcFile;
    private streamIfcFile;
    private streamAllGeometries;
    private cleanUp;
    private getMesh;
    private getGeometry;
    private streamAssets;
    private streamGeometries;
    private outputGeometries;
    private registerGeometryData;
}
import * as WEBIFC from "web-ifc";
import { AsyncEvent, Component, Disposable, Event } from "../../core";
import { PropertiesStreamingSettings } from "./src";
/**
 * A component that converts the properties of an IFC file to tiles. It uses the Web-IFC library to read and process the IFC data. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/IfcPropertiesTiler). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/IfcPropertiesTiler).
 */
export declare class IfcPropertiesTiler extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "88d2c89c-ce32-47d7-8cb6-d51e4b311a0b";
    /**
     * An event that is triggered when properties are streamed from the IFC file.
     * The event provides the type of the IFC entity and the corresponding data.
     */
    readonly onPropertiesStreamed: AsyncEvent<{
        type: number;
        data: {
            [id: number]: any;
        };
    }>;
    /**
     * An event that is triggered to indicate the progress of the streaming process.
     * The event provides a number between 0 and 1 representing the progress percentage.
     */
    readonly onProgress: AsyncEvent<number>;
    /**
     * An event that is triggered when indices are streamed from the IFC file.
     * The event provides a map of indices, where the key is the entity type and the value is another map of indices.
     */
    readonly onIndicesStreamed: AsyncEvent<Map<number, Map<number, number[]>>>;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<string>;
    /** {@link Component.enabled} */
    enabled: boolean;
    /**
     * An instance of the PropertiesStreamingSettings class, which holds the settings for the streaming process.
     */
    settings: PropertiesStreamingSettings;
    /**
     * An instance of the IfcAPI class from the Web-IFC library, which provides methods for reading and processing IFC data.
     */
    webIfc: WEBIFC.IfcAPI;
    /** {@link Disposable.dispose} */
    dispose(): Promise<void>;
    /**
     * This method converts properties from an IFC file to tiles given its data as a Uint8Array.
     *
     * @param data - The Uint8Array containing the IFC file data.
     * @returns A Promise that resolves when the streaming process is complete.
     */
    streamFromBuffer(data: Uint8Array): Promise<void>;
    /**
     * This method converts properties from an IFC file to tiles using a given callback function to read the file.
     *
     * @param loadCallback - A callback function that loads the IFC file data.
     * @returns A Promise that resolves when the streaming process is complete.
     */
    streamFromCallBack(loadCallback: WEBIFC.ModelLoadCallback): Promise<void>;
    private readIfcFile;
    private streamIfcFile;
    private streamAllProperties;
    private cleanUp;
}
import * as THREE from "three";
import { Component } from "../core";
export declare class SectionGenerator extends Component {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "1a193b87-6376-46c8-9e65-62a1576fdb64";
    enabled: boolean;
    private _inverseMatrix;
    private _localPlane;
    private _tempLine;
    private _tempVector;
    private _plane?;
    private _plane2DCoordinateSystem;
    private _precission;
    private _planeAxis?;
    get plane(): THREE.Plane;
    set plane(plane: THREE.Plane);
    createEdges(data: {
        meshes: THREE.Mesh[];
        posAttr: THREE.BufferAttribute;
    }): {
        indexes: number[];
        index: number;
    };
    createFills(buffer: Float32Array, trianglesIndices: number[]): number[];
    private computeFill;
    private updatePlane2DCoordinateSystem;
    private shapecast;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import { Component, Components } from "../../core";
/**
 * Represents an edge measurement result.
 */
export interface MeasureEdge {
    /**
     * The distance between the two points of the edge.
     */
    distance: number;
    /**
     * The two points that define the edge.
     */
    points: THREE.Vector3[];
}
/**
 * Utility component for performing measurements on 3D meshes by providing methods for measuring distances between edges and faces. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/MeasurementUtils). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/MeasurementUtils).
 */
export declare class MeasurementUtils extends Component {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static uuid: string;
    /** {@link Component.enabled} */
    enabled: boolean;
    constructor(components: Components);
    /**
     * Utility method to calculate the distance from a point to a line segment.
     *
     * @param point - The point from which to calculate the distance.
     * @param lineStart - The start point of the line segment.
     * @param lineEnd - The end point of the line segment.
     * @param clamp - If true, the distance will be clamped to the line segment's length.
     * @returns The distance from the point to the line segment.
     */
    static distanceFromPointToLine(point: THREE.Vector3, lineStart: THREE.Vector3, lineEnd: THREE.Vector3, clamp?: boolean): number;
    /**
     * Method to get the face of a mesh that contains a given triangle index.
     * It also returns the edges of the found face and their indices.
     *
     * @param mesh - The mesh to get the face from. It must be indexed.
     * @param triangleIndex - The index of the triangle within the mesh.
     * @param instance - The instance of the mesh (optional).
     * @returns An object containing the edges of the found face and their indices, or null if no face was found.
     */
    getFace(mesh: THREE.InstancedMesh | THREE.Mesh, triangleIndex: number, instance?: number): {
        edges: MeasureEdge[];
        indices: Set<number>;
    } | null;
    /**
     * Method to get the vertices and normal of a mesh face at a given index.
     * It also applies instance transformation if provided.
     *
     * @param mesh - The mesh to get the face from. It must be indexed.
     * @param faceIndex - The index of the face within the mesh.
     * @param instance - The instance of the mesh (optional).
     * @returns An object containing the vertices and normal of the face.
     * @throws Will throw an error if the geometry is not indexed.
     */
    getVerticesAndNormal(mesh: THREE.Mesh | THREE.InstancedMesh, faceIndex: number, instance: number | undefined): {
        p1: THREE.Vector3;
        p2: THREE.Vector3;
        p3: THREE.Vector3;
        faceNormal: THREE.Vector3;
    };
    /**
     * Method to round the vector's components to a specified number of decimal places.
     * This is used to ensure numerical precision in edge detection.
     *
     * @param vector - The vector to round.
     * @returns The vector with rounded components.
     */
    round(vector: THREE.Vector3): void;
    /**
     * Calculates the volume of a set of fragments.
     *
     * @param frags - A map of fragment IDs to their corresponding item IDs.
     * @returns The total volume of the fragments and the bounding sphere.
     *
     * @remarks
     * This method creates a set of instanced meshes from the given fragments and item IDs.
     * It then calculates the volume of each mesh and returns the total volume and its bounding sphere.
     *
     * @throws Will throw an error if the geometry of the meshes is not indexed.
     * @throws Will throw an error if the fragment manager is not available.
     */
    getVolumeFromFragments(frags: FRAGS.FragmentIdMap): number;
    /**
     * Calculates the total volume of a set of meshes.
     *
     * @param meshes - An array of meshes or instanced meshes to calculate the volume from.
     * @returns The total volume of the meshes and the bounding sphere.
     *
     * @remarks
     * This method calculates the volume of each mesh in the provided array and returns the total volume
     * and its bounding sphere.
     *
     */
    getVolumeFromMeshes(meshes: THREE.InstancedMesh[] | THREE.Mesh[]): number;
    private getFaceData;
    private getVolumeOfMesh;
    private getSignedVolumeOfTriangle;
}
import { XMLParser } from "fast-xml-parser";
import { Component, Configurable, Disposable, Event, World, DataMap } from "../../core";
import { BCFTopic, Topic, BCFTopicsConfigManager, BCFTopicsConfig } from "./src";
import { Viewpoint } from "../../core/Viewpoints";
/**
 * BCFTopics manages Building Collaboration Format (BCF) data the engine. It provides functionality for importing, exporting, and manipulating BCF data.
 */
export declare class BCFTopics extends Component implements Disposable, Configurable<BCFTopicsConfigManager, BCFTopicsConfig> {
    static uuid: "de977976-e4f6-4e4f-a01a-204727839802";
    enabled: boolean;
    static xmlParser: XMLParser;
    protected _defaultConfig: Required<BCFTopicsConfig>;
    config: BCFTopicsConfigManager;
    readonly list: DataMap<string, Topic>;
    readonly onSetup: Event<unknown>;
    isSetup: boolean;
    setup(config?: Partial<BCFTopicsConfig>): void;
    readonly onBCFImported: Event<Topic[]>;
    /**
     * Creates a new BCFTopic instance and adds it to the list.
     *
     * @param data - Optional partial BCFTopic object to initialize the new topic with.
     * If not provided, default values will be used.
     * @returns The newly created BCFTopic instance.
     */
    create(data?: Partial<BCFTopic>): Topic;
    readonly onDisposed: Event<unknown>;
    /**
     * Disposes of the BCFTopics component and triggers the onDisposed event.
     *
     * @remarks
     * This method clears the list of topics and triggers the onDisposed event.
     * It also resets the onDisposed event listener.
     */
    dispose(): void;
    /**
     * Retrieves the unique set of topic types used across all topics.
     *
     * @returns A Set containing the unique topic types.
     */
    get usedTypes(): Set<string>;
    /**
     * Retrieves the unique set of topic statuses used across all topics.
     *
     * @returns A Set containing the unique topic statuses.
     */
    get usedStatuses(): Set<string>;
    /**
     * Retrieves the unique set of topic priorities used across all topics.
     *
     * @returns A Set containing the unique topic priorities.
     * Note: This method filters out any null or undefined priorities.
     */
    get usedPriorities(): Set<string | undefined>;
    /**
     * Retrieves the unique set of topic stages used across all topics.
     *
     * @returns A Set containing the unique topic stages.
     * Note: This method filters out any null or undefined stages.
     */
    get usedStages(): Set<string | undefined>;
    /**
     * Retrieves the unique set of users associated with topics.
     *
     * @returns A Set containing the unique users.
     * Note: This method collects users from the creation author, assigned to, modified author, and comment authors.
     */
    get usedUsers(): Set<string>;
    /**
     * Retrieves the unique set of labels used across all topics.
     *
     * @returns A Set containing the unique labels.
     */
    get usedLabels(): Set<string>;
    /**
     * Updates the set of extensions (types, statuses, priorities, labels, stages, users) based on the current topics.
     * This method iterates through each topic in the list and adds its properties to the corresponding sets in the config.
     */
    updateExtensions(): void;
    /**
     * Updates the references to viewpoints in the topics.
     * This function iterates through each topic and checks if the viewpoints exist in the viewpoints list.
     * If a viewpoint does not exist, it is removed from the topic's viewpoints.
     */
    updateViewpointReferences(): void;
    /**
     * Exports the given topics to a BCF (Building Collaboration Format) zip file.
     *
     * @param topics - The topics to export. Defaults to all topics in the list.
     * @returns A promise that resolves to a Blob containing the exported BCF zip file.
     */
    export(topics?: Iterable<Topic>): Promise<Blob>;
    private serializeExtensions;
    private processMarkupComment;
    private getMarkupComments;
    private getMarkupLabels;
    private getMarkupViewpoints;
    private getMarkupRelatedTopics;
    /**
     * Loads BCF (Building Collaboration Format) data into the engine.
     *
     * @param world - The default world where the viewpoints are going to be created.
     * @param data - The BCF data to load.
     *
     * @returns A promise that resolves to an object containing the created viewpoints and topics.
     *
     * @throws An error if the BCF version is not supported.
     */
    load(data: Uint8Array, world: World): Promise<{
        viewpoints: Viewpoint[];
        topics: Topic[];
    }>;
}
import { BooleanSettingsControl } from "../../Types";
import { Viewpoints } from "../index";
import { Configurator } from "../../ConfigManager";
/**
 * Configuration interface for the Viewpoints general behavior.
 */
export interface ViewpointsConfig {
    /**
     * Indicates whether to overwrite the fragments colors when applying viewpoints.
     * @remarks BCF Viewpoints comes with information to indicate the colors to be applied to components, if any.
     * @default false
     */
    overwriteColors: boolean;
}
type ViewpointsConfigType = {
    overwriteColors: BooleanSettingsControl;
};
export declare class ViewpointsConfigManager extends Configurator<Viewpoints, ViewpointsConfigType> {
    protected _config: ViewpointsConfigType;
    get overwriteColors(): boolean;
    set overwriteColors(value: boolean);
}
export {};
import * as FRAGS from "@thatopen/fragments";
import { XMLParser } from "fast-xml-parser";
import { Component, DataMap } from "../../core/Types";
import { IDSCheckResult, IDSInfo, IDSSpecification, IfcVersion } from "./src";
import { Components } from "../../core";
/**
 * Component that manages Information Delivery Specification (IDS) data. It provides functionality for importing, exporting, and manipulating IDS data.
 */
export declare class IDSSpecifications extends Component {
    static uuid: "9f0b9f78-9b2e-481a-b766-2fbfd01f342c";
    enabled: boolean;
    static xmlParser: XMLParser;
    constructor(components: Components);
    readonly list: DataMap<string, IDSSpecification>;
    /**
     * Retrieves a FragmentIdMap based on the given IDSCheckResult array.
     * The map separates the IDs into two categories: pass and fail.
     *
     * @param model - The FragmentsGroup model from which to retrieve the fragment map.
     * @param result - An array of IDSCheckResult objects, each representing a check result.
     *
     * @returns An object containing two properties:
     * - 'pass': A FragmentIdMap that passed the checks.
     * - 'fail': A FragmentIdMap that failed the checks.
     */
    getFragmentIdMap(model: FRAGS.FragmentsGroup, result: IDSCheckResult[]): {
        pass: FRAGS.FragmentIdMap;
        fail: FRAGS.FragmentIdMap;
    };
    /**
     * Creates a new IDSSpecification instance and adds it to the list.
     *
     * @param name - The name of the IDSSpecification.
     * @param ifcVersion - An array of IfcVersion values that the specification supports.
     *
     * @returns The newly created IDSSpecification instance.
     */
    create(name: string, ifcVersion: IfcVersion[], identifier?: string): IDSSpecification;
    /**
     * Parses and processes an XML string containing Information Delivery Specification (IDS) data.
     * It creates IDSSpecification instances based on the parsed data and returns them in an array.
     * Also, the instances are added to the list array.
     *
     * @param data - The XML string to parse.
     *
     * @returns An array of IDSSpecification instances created from the parsed data.
     */
    load(data: string): IDSSpecification[];
    /**
     * Exports the IDSSpecifications data into an XML string.
     *
     * @param info - The metadata information for the exported XML.
     * @param specifications - An optional iterable of IDSSpecification instances to export.
     * If not provided, all specifications in the list will be exported.
     *
     * @returns A string containing the exported IDSSpecifications data in XML format.
     */
    export(info: IDSInfo, specifications?: Iterable<IDSSpecification>): string;
}
import * as WEBIFC from "web-ifc";
import * as FRAG from "@thatopen/fragments";
import { Component, Components } from "../../core";
/**
 * Component to export all the properties from an IFC to a JS object. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/IfcJsonExporter). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/IfcJsonExporter).
 */
export declare class IfcJsonExporter extends Component {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "b32c4332-cd67-436e-ba7f-196646c7a635";
    /** {@link Component.enabled} */
    enabled: boolean;
    constructor(components: Components);
    /**
     * Exports all the properties of an IFC into an array of JS objects.
     * @param webIfc The instance of [web-ifc](https://github.com/ThatOpen/engine_web-ifc) to use.
     * @param modelID ID of the IFC model whose properties to extract.
     * @param indirect whether to get the indirect relationships as well.
     * @param recursiveSpatial whether to get the properties of spatial items recursively
     * to make the location data available (e.g. absolute position of building).
     */
    export(webIfc: WEBIFC.IfcAPI, modelID: number, indirect?: boolean, recursiveSpatial?: boolean): Promise<FRAG.IfcProperties>;
}
import * as WEBIFC from "web-ifc";
import { Component, Components } from "../../core";
/**
 * Component to isolate certain elements from an IFC and export to another IFC. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/IfcIsolator). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/IfcIsolator).
 */
export declare class IfcIsolator extends Component {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "6eb0ba2f-71c0-464e-bcec-2d7c335186b2";
    /** {@link Component.enabled} */
    enabled: boolean;
    constructor(components: Components);
    getIsolatedElements(webIfc: WEBIFC.IfcAPI, modelID: number, elementIDs: Array<number>): Promise<any[]>;
    /**
     * Exports isolated elements to the new model.
     * @param webIfc The instance of [web-ifc](https://github.com/ThatOpen/engine_web-ifc) to use.
     * @param modelID ID of the new IFC model.
     * @param isolatedElements The array of isolated elements
     */
    export(webIfc: WEBIFC.IfcAPI, modelID: number, isolatedElements: Array<any>): Promise<Uint8Array>;
    splitIfc(webIfc: WEBIFC.IfcAPI, ifcFile: ArrayBuffer, idsToExtract: Array<number>): Promise<Uint8Array>;
}
import * as WEBIFC from "web-ifc";
import { FragmentsGroup } from "@thatopen/fragments";
import { Disposable, Event, Component, Components } from "../../core";
import { RelationsMap, ModelsRelationMap, InverseAttribute, IfcRelation, RelationsProcessingConfig, EntitiesRelatedEvent } from "./src";
/**
 * Indexer component for IFC entities, facilitating the indexing and retrieval of IFC entity relationships. It is designed to process models properties by indexing their IFC entities' relations based on predefined inverse attributes, and provides methods to query these relations. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Core/IfcRelationsIndexer). 📘 [API](https://docs.thatopen.com/api/@thatopen/components/classes/IfcRelationsIndexer).
 */
export declare class IfcRelationsIndexer extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "23a889ab-83b3-44a4-8bee-ead83438370b";
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<string>;
    /**
     * Event triggered when relations for a model have been indexed.
     * This event provides the model's UUID and the relations map generated for that model.
     *
     * @property {string} modelID - The UUID of the model for which relations have been indexed.
     * @property {RelationsMap} relationsMap - The relations map generated for the specified model.
     * The map keys are expressIDs of entities, and the values are maps where each key is a relation type ID and its value is an array of expressIDs of entities related through that relation type.
     */
    readonly onRelationsIndexed: Event<{
        modelID: string;
        relationsMap: RelationsMap;
    }>;
    /**
     * Holds the relationship mappings for each model processed by the indexer.
     * The structure is a map where each key is a model's UUID, and the value is another map.
     * This inner map's keys are entity expressIDs, and its values are maps where each key is an index
     * representing a specific relation type, and the value is an array of expressIDs of entities
     * that are related through that relation type. This structure allows for efficient querying
     * of entity relationships within a model.
     */
    readonly relationMaps: ModelsRelationMap;
    /** {@link Component.enabled} */
    enabled: boolean;
    private _relToAttributesMap;
    private _inverseAttributes;
    private _ifcRels;
    constructor(components: Components);
    private onFragmentsDisposed;
    private indexRelations;
    getAttributeIndex(inverseAttribute: InverseAttribute): number;
    /**
     * Adds a relation map to the model's relations map.
     *
     * @param model - The 'FragmentsGroup' model to which the relation map will be added.
     * @param relationMap - The 'RelationsMap' to be added to the model's relations map.
     *
     * @fires onRelationsIndexed - Triggers an event with the model's UUID and the added relation map.
     */
    setRelationMap(model: FragmentsGroup, relationMap: RelationsMap): void;
    /**
     * Processes a given model to index its IFC entities relations based on predefined inverse attributes.
     * This method iterates through each specified inverse attribute, retrieves the corresponding relations,
     * and maps them in a structured way to facilitate quick access to related entities.
     *
     * The process involves querying the model for each relation type associated with the inverse attributes
     * and updating the internal relationMaps with the relationships found. This map is keyed by the model's UUID
     * and contains a nested map where each key is an entity's expressID and its value is another map.
     * This inner map's keys are the indices of the inverse attributes, and its values are arrays of expressIDs
     * of entities that are related through that attribute.
     *
     * @param model The 'FragmentsGroup' model to be processed. It must have properties loaded.
     * @returns A promise that resolves to the relations map for the processed model. This map is a detailed
     * representation of the relations indexed by entity expressIDs and relation types.
     * @throws An error if the model does not have properties loaded.
     */
    process(model: FragmentsGroup, config?: Partial<RelationsProcessingConfig>): Promise<RelationsMap>;
    /**
     * Processes a given model from a WebIfc API to index its IFC entities relations.
     *
     * @param ifcApi - The WebIfc API instance from which to retrieve the model's properties.
     * @param modelID - The unique identifier of the model within the WebIfc API.
     * @returns A promise that resolves to the relations map for the processed model.
     *          This map is a detailed representation of the relations indexed by entity expressIDs and relation types.
     */
    processFromWebIfc(ifcApi: WEBIFC.IfcAPI, modelID: number): Promise<RelationsMap>;
    /**
     * Retrieves the relations of a specific entity within a model based on the given relation name.
     * This method searches the indexed relation maps for the specified model and entity,
     * returning the IDs of related entities if a match is found.
     *
     * @param model The 'FragmentsGroup' model containing the entity, or its UUID.
     * @param expressID The unique identifier of the entity within the model.
     * @param attribute The IFC schema inverse attribute of the relation to search for (e.g., "IsDefinedBy", "ContainsElements").
     * @returns An array of express IDs representing the related entities. If the array is empty, no relations were found.
     */
    getEntityRelations(model: FragmentsGroup | string | RelationsMap, expressID: number, attribute: InverseAttribute): number[];
    /**
     * Serializes the relations of a given relation map into a JSON string.
     * This method iterates through the relations in the given map, organizing them into a structured object where each key is an expressID of an entity,
     * and its value is another object mapping relation indices to arrays of related entity expressIDs.
     * The resulting object is then serialized into a JSON string.
     *
     * @param relationMap - The map of relations to be serialized. The map keys are expressIDs of entities, and the values are maps where each key is a relation type ID and its value is an array of expressIDs of entities related through that relation type.
     * @returns A JSON string representing the serialized relations of the given relation map.
     */
    serializeRelations(relationMap: RelationsMap): string;
    /**
     * Serializes the relations of a specific model into a JSON string.
     * This method iterates through the relations indexed for the given model,
     * organizing them into a structured object where each key is an expressID of an entity,
     * and its value is another object mapping relation indices to arrays of related entity expressIDs.
     * The resulting object is then serialized into a JSON string.
     *
     * @param model The 'FragmentsGroup' model whose relations are to be serialized.
     * @returns A JSON string representing the serialized relations of the specified model.
     * If the model has no indexed relations, 'null' is returned.
     */
    serializeModelRelations(model: FragmentsGroup): string | null;
    /**
     * Serializes all relations of every model processed by the indexer into a JSON string.
     * This method iterates through each model's relations indexed in 'relationMaps', organizing them
     * into a structured JSON object. Each top-level key in this object corresponds to a model's UUID,
     * and its value is another object mapping entity expressIDs to their related entities, categorized
     * by relation types. The structure facilitates easy access to any entity's relations across all models.
     *
     * @returns A JSON string representing the serialized relations of all models processed by the indexer.
     *          If no relations have been indexed, an empty object is returned as a JSON string.
     */
    serializeAllRelations(): string;
    /**
     * Converts a JSON string representing relations between entities into a structured map.
     * This method parses the JSON string to reconstruct the relations map that indexes
     * entity relations by their express IDs. The outer map keys are the express IDs of entities,
     * and the values are maps where each key is a relation type ID and its value is an array
     * of express IDs of entities related through that relation type.
     *
     * @param json The JSON string to be parsed into the relations map.
     * @returns A 'Map' where the key is the express ID of an entity as a number, and the value
     * is another 'Map'. This inner map's key is the relation type ID as a number, and its value
     * is an array of express IDs (as numbers) of entities related through that relation type.
     */
    getRelationsMapFromJSON(json: string): RelationsMap;
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Retrieves the entities within a model that have a specific relation with a given entity.
     *
     * @param model - The BIM model to search for related entities.
     * @param inv - The IFC schema inverse attribute of the relation to search for (e.g., "IsDefinedBy", "ContainsElements").
     * @param expressID - The expressID of the entity within the model.
     *
     * @returns A 'Set' with the expressIDs of the entities that have the specified relation with the given entity.
     *
     * @throws An error if the model relations are not indexed or if the inverse attribute name is invalid.
     */
    getEntitiesWithRelation(model: FragmentsGroup, inv: InverseAttribute, expressID: number): Set<number>;
    /**
     * Adds relations between an entity and other entities in a BIM model.
     *
     * @param model - The BIM model to which the relations will be added.
     * @param expressID - The expressID of the entity within the model.
     * @param relationName - The IFC schema inverse attribute of the relation to add (e.g., "IsDefinedBy", "ContainsElements").
     * @param relIDs - The expressIDs of the related entities within the model.
     * @deprecated Use addEntitiesRelation instead. This will be removed in future versions.
     *
     * @throws An error if the relation name is not a valid relation name.
     */
    addEntityRelations(model: FragmentsGroup, expressID: number, relationName: InverseAttribute, ...relIDs: number[]): void;
    /**
     * Converts the relations made into actual IFC data.
     *
     * @remarks This function iterates through the changes made to the relations and applies them to the corresponding BIM model.
     * It only make sense to use it if the relations need to be write in the IFC file.
     *
     * @returns A promise that resolves when all the relation changes have been applied.
     */
    applyRelationChanges(): Promise<void>;
    private readonly _changeMap;
    /**
     * An event that is triggered when entities are related in a BIM model.
     * The event provides information about the type of relation, the inverse attribute,
     * the IDs of the entities related, and the IDs of the entities that are being related.
     */
    readonly onEntitiesRelated: Event<EntitiesRelatedEvent>;
    addEntitiesRelation(model: FragmentsGroup, relatingID: number, rel: {
        type: IfcRelation;
        inv: InverseAttribute;
    }, ...relatedIDs: number[]): void;
    /**
     * Gets the children of the given element recursively. E.g. in a model with project - site - building - storeys - rooms, passing a storey will include all its children and the children of the rooms contained in it.
     *
     * @param model The BIM model whose children to get.
     * @param expressID The expressID of the item whose children to get.
     * @param found An optional parameter that includes a set of expressIDs where the found element IDs will be added.
     *
     * @returns A 'Set' with the expressIDs of the found items.
     */
    getEntityChildren(model: FragmentsGroup, expressID: number, found?: Set<number>): Set<number>;
}
import * as WEBIFC from "web-ifc";
import { FragmentsGroup } from "@thatopen/fragments";
import { Component, Disposable, Event, Components } from "../../core";
import { IfcRelation } from "../IfcRelationsIndexer";
/**
 * Types for boolean properties in IFC schema.
 */
export type BooleanPropTypes = "IfcBoolean" | "IfcLogical";
/**
 * Types for string properties in IFC schema.
 */
export type StringPropTypes = "IfcText" | "IfcLabel" | "IfcIdentifier";
/**
 * Types for numeric properties in IFC schema.
 */
export type NumericPropTypes = "IfcInteger" | "IfcReal";
/**
 * Interface representing a map of changed entities in a model. The keys are model UUIDs, and the values are sets of express IDs of changed entities.
 */
export interface ChangeMap {
    [modelID: string]: Set<number>;
}
/**
 * Interface representing a map of attribute listeners. The keys are model UUIDs, and the values are objects with express IDs as keys, and objects with attribute names as keys, and Event objects as values.
 */
export interface AttributeListener {
    [modelID: string]: {
        [expressID: number]: {
            [attributeName: string]: Event<String | Boolean | Number>;
        };
    };
}
/**
 * Component to manage and edit properties and Psets in IFC files.
 */
export declare class IfcPropertiesManager extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "58c2d9f0-183c-48d6-a402-dfcf5b9a34df";
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<string>;
    /**
     * Event triggered when a file is requested for export.
     */
    readonly onRequestFile: Event<unknown>;
    /**
     * ArrayBuffer containing the IFC data to be exported.
     */
    ifcToExport: ArrayBuffer | null;
    /**
     * Event triggered when an element is added to a Pset.
     */
    readonly onElementToPset: Event<{
        model: FragmentsGroup;
        psetID: number;
        elementID: number;
    }>;
    /**
     * Event triggered when a property is added to a Pset.
     */
    readonly onPropToPset: Event<{
        model: FragmentsGroup;
        psetID: number;
        propID: number;
    }>;
    /**
     * Event triggered when a Pset is removed.
     */
    readonly onPsetRemoved: Event<{
        model: FragmentsGroup;
        psetID: number;
    }>;
    /**
     * Event triggered when data in the model changes.
     */
    readonly onDataChanged: Event<{
        model: FragmentsGroup;
        expressID: number;
    }>;
    /**
     * Configuration for the WebAssembly module.
     */
    wasm: {
        path: string;
        absolute: boolean;
    };
    /** {@link Component.enabled} */
    enabled: boolean;
    /**
     * Map of attribute listeners.
     */
    attributeListeners: AttributeListener;
    /**
     * The currently selected model.
     */
    selectedModel?: FragmentsGroup;
    /**
     * Map of changed entities in the model.
     */
    changeMap: ChangeMap;
    constructor(components: Components);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Static method to retrieve the IFC schema from a given model.
     *
     * @param model - The FragmentsGroup model from which to retrieve the IFC schema.
     * @throws Will throw an error if the IFC schema is not found in the model.
     * @returns The IFC schema associated with the given model.
     */
    static getIFCSchema(model: FragmentsGroup): import("@thatopen/fragments").IfcSchema;
    /**
     * Method to add or update entity attributes in the model.
     *
     * @param model - The FragmentsGroup model in which to set the properties.
     * @param dataToSave - An array of objects representing the properties to be saved.
     * Each object must have an 'expressID' property, which is the express ID of the entity in the model.
     * The rest of the properties will be set as the properties of the entity.
     *
     * @returns A promise that resolves when all the properties have been set.
     *
     * @throws Will throw an error if any of the 'expressID' properties are missing in the 'dataToSave' array.
     */
    setData(model: FragmentsGroup, ...dataToSave: Record<string, any>[]): Promise<void>;
    /**
     * Creates a new Property Set (Pset) in the given model.
     *
     * @param model - The FragmentsGroup model in which to create the Pset.
     * @param name - The name of the Pset.
     * @param description - (Optional) The description of the Pset.
     *
     * @returns A promise that resolves with an object containing the newly created Pset and its relation.
     *
     * @throws Will throw an error if the IFC schema is not found in the model.
     * @throws Will throw an error if no OwnerHistory is found in the model.
     */
    newPset(model: FragmentsGroup, name: string, description?: string): Promise<{
        pset: WEBIFC.IFC4.IfcPropertySet | WEBIFC.IFC2X3.IfcPropertySet | WEBIFC.IFC4X3.IfcPropertySet;
    }>;
    /**
     * Removes a Property Set (Pset) from the given model.
     *
     * @param model - The FragmentsGroup model from which to remove the Pset.
     * @param psetID - The express IDs of the Psets to be removed.
     *
     * @returns A promise that resolves when all the Psets have been removed.
     *
     * @throws Will throw an error if any of the 'expressID' properties are missing in the 'psetID' array.
     * @throws Will throw an error if the Pset to be removed is not of type 'IFCPROPERTYSET'.
     * @throws Will throw an error if no relation is found between the Pset and the model.
     */
    removePset(model: FragmentsGroup, ...psetID: number[]): Promise<void>;
    /**
     * Creates a new single-value property of type string in the given model.
     *
     * @param model - The FragmentsGroup model in which to create the property.
     * @param type - The type of the property value. Must be a string property type.
     * @param name - The name of the property.
     * @param value - The value of the property. Must be a string.
     *
     * @returns The newly created single-value property.
     *
     * @throws Will throw an error if the IFC schema is not found in the model.
     * @throws Will throw an error if no OwnerHistory is found in the model.
     */
    newSingleStringProperty(model: FragmentsGroup, type: StringPropTypes, name: string, value: string): Promise<WEBIFC.IFC4.IfcPropertySingleValue | WEBIFC.IFC2X3.IfcPropertySingleValue | WEBIFC.IFC4X3.IfcPropertySingleValue>;
    /**
     * Creates a new single-value property of type numeric in the given model.
     *
     * @param model - The FragmentsGroup model in which to create the property.
     * @param type - The type of the property value. Must be a numeric property type.
     * @param name - The name of the property.
     * @param value - The value of the property. Must be a number.
     *
     * @returns The newly created single-value property.
     *
     * @throws Will throw an error if the IFC schema is not found in the model.
     * @throws Will throw an error if no OwnerHistory is found in the model.
     */
    newSingleNumericProperty(model: FragmentsGroup, type: NumericPropTypes, name: string, value: number): Promise<WEBIFC.IFC4.IfcPropertySingleValue | WEBIFC.IFC2X3.IfcPropertySingleValue | WEBIFC.IFC4X3.IfcPropertySingleValue>;
    /**
     * Creates a new single-value property of type boolean in the given model.
     *
     * @param model - The FragmentsGroup model in which to create the property.
     * @param type - The type of the property value. Must be a boolean property type.
     * @param name - The name of the property.
     * @param value - The value of the property. Must be a boolean.
     *
     * @returns The newly created single-value property.
     *
     * @throws Will throw an error if the IFC schema is not found in the model.
     * @throws Will throw an error if no OwnerHistory is found in the model.
     */
    newSingleBooleanProperty(model: FragmentsGroup, type: BooleanPropTypes, name: string, value: boolean): Promise<WEBIFC.IFC4.IfcPropertySingleValue | WEBIFC.IFC2X3.IfcPropertySingleValue | WEBIFC.IFC4X3.IfcPropertySingleValue>;
    /**
     * Removes a property from a Property Set (Pset) in the given model.
     *
     * @param model - The FragmentsGroup model from which to remove the property.
     * @param psetID - The express ID of the Pset from which to remove the property.
     * @param propID - The express ID of the property to be removed.
     *
     * @returns A promise that resolves when the property has been removed.
     *
     * @throws Will throw an error if the Pset or the property to be removed are not found in the model.
     * @throws Will throw an error if the Pset to be removed is not of type 'IFCPROPERTYSET'.
     */
    removePsetProp(model: FragmentsGroup, psetID: number, propID: number): Promise<void>;
    /**
     * @deprecated Use indexer.addEntitiesRelation instead. This will be removed in future releases.
     */
    addElementToPset(model: FragmentsGroup, psetID: number, ...expressIDs: number[]): void;
    /**
     * Adds elements to a Property Set (Pset) in the given model.
     *
     * @param model - The FragmentsGroup model in which to add the elements.
     * @param psetID - The express ID of the Pset to which to add the elements.
     * @param elementID - The express IDs of the elements to be added.
     *
     * @returns A promise that resolves when all the elements have been added.
     *
     * @throws Will throw an error if the Pset or the elements to be added are not found in the model.
     * @throws Will throw an error if the Pset to be added to is not of type 'IFCPROPERTYSET'.
     * @throws Will throw an error if no relation is found between the Pset and the model.
     */
    addPropToPset(model: FragmentsGroup, psetID: number, ...propID: number[]): Promise<void>;
    /**
     * Creates a new instance of a relationship between entities in the IFC model.
     *
     * @param model - The FragmentsGroup model in which to create the relationship.
     * @param type - The type of the relationship to create.
     * @param relatingID - The express ID of the entity that is related to the other entities.
     * @param relatedIDs - The express IDs of the entities that are related to the relating entity.
     *
     * @returns A promise that resolves with the newly created relationship.
     *
     * @throws Will throw an error if the relationship type is unsupported.
     */
    createIfcRel(model: FragmentsGroup, type: IfcRelation, relatingID: number, relatedIDs: number[]): Promise<any>;
    /**
     * Saves the changes made to the model to a new IFC file.
     *
     * @param model - The FragmentsGroup model from which to save the changes.
     * @param ifcToSaveOn - The Uint8Array representing the original IFC file.
     *
     * @returns A promise that resolves with the modified IFC data as a Uint8Array.
     *
     * @throws Will throw an error if any issues occur during the saving process.
     */
    saveToIfc(model: FragmentsGroup, ifcToSaveOn: Uint8Array): Promise<Uint8Array>;
    /**
     * Retrieves all the entities of a specific type from the model and returns their express IDs wrapped in Handles.
     * This is used to make references of an entity inside another entity attributes.
     *
     * @param model - The FragmentsGroup model from which to retrieve the entities.
     * @param type - The type of the entities to retrieve. This should be the express ID of the IFC type.
     *
     * @returns A promise that resolves with an array of Handles, each containing the express ID of an entity of the specified type.
     * @returns null if the model doesn't have any entity of that type
     */
    getEntityRef(model: FragmentsGroup, type: number): Promise<WEBIFC.Handle<unknown>[] | null>;
    /**
     * Sets an attribute listener for a specific attribute of an entity in the model.
     * The listener will trigger an event whenever the attribute's value changes.
     *
     * @param model - The FragmentsGroup model in which to set the attribute listener.
     * @param expressID - The express ID of the entity for which to set the listener.
     * @param attributeName - The name of the attribute for which to set the listener.
     *
     * @returns The event that will be triggered when the attribute's value changes.
     *
     * @throws Will throw an error if the entity with the given expressID doesn't exist.
     * @throws Will throw an error if the attribute is an array or null, and it can't have a listener.
     * @throws Will throw an error if the attribute has a badly defined handle.
     */
    setAttributeListener(model: FragmentsGroup, expressID: number, attributeName: string): Promise<Event<String | Number | Boolean>>;
    private getNewExpressID;
    private newGUID;
    getOwnerHistory(model: FragmentsGroup): Promise<{
        entity: {
            [attribute: string]: any;
        };
        handle: WEBIFC.Handle<unknown>;
    }>;
    registerChange(model: FragmentsGroup, ...expressID: number[]): void;
    newSingleProperty(model: FragmentsGroup, type: string, name: string, value: string | number | boolean): Promise<WEBIFC.IFC4.IfcPropertySingleValue | WEBIFC.IFC2X3.IfcPropertySingleValue | WEBIFC.IFC4X3.IfcPropertySingleValue>;
}
import { Component, Components } from "../../core";
import { IfcQueryGroup } from "./src/ifc-query-group";
import { IfcFinderQuery } from "./src";
/**
 * Component to make text queries in the IFC.
 */
export declare class IfcFinder extends Component {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "0da7ad77-f734-42ca-942f-a074adfd1e3a";
    /** {@link Component.enabled} */
    enabled: boolean;
    /**
     * List of all created {@link IfcQueryGroup} instances.
     */
    list: Map<string, IfcQueryGroup>;
    /**
     * List of all queries from all created {@link IfcQueryGroup} instances.
     */
    get queries(): Set<IfcFinderQuery>;
    constructor(components: Components);
    /**
     * Imports all the query groups provided in the given data. You can generate this data to save the result of queries and persist it over time.
     * @param data The data containing the serialized query groups to import.
     */
    import(data: {
        [groupID: string]: any;
    }): void;
    /**
     * Exports all the query groups created. You can then import this data back using the import method.
     */
    export(): {
        [groupID: string]: any;
    };
    /**
     * Creates a new {@link IfcQueryGroup}.
     */
    create(): IfcQueryGroup;
    /**
     * Creates the {@link IfcQueryGroup} with the given ID.
     */
    delete(id: string): void;
    /**
     * Deletes all {@link IfcQueryGroup} instances.
     */
    clear(): void;
}
import * as THREE from "three";
import { BooleanSettingsControl, ColorSettingsControl, NumberSettingControl } from "../../Types";
import { Configurator } from "../../ConfigManager";
import { Clipper } from "../index";
type ClipperConfigType = {
    enabled: BooleanSettingsControl;
    visible: BooleanSettingsControl;
    color: ColorSettingsControl;
    opacity: NumberSettingControl;
    size: NumberSettingControl;
};
/**
 * Configuration interface for the {@link Clipper}.
 */
export interface ClipperConfig {
    color: THREE.Color;
    opacity: number;
    size: number;
}
export declare class ClipperConfigManager extends Configurator<Clipper, ClipperConfigType> {
    protected _config: ClipperConfigType;
    get enabled(): boolean;
    set enabled(value: boolean);
    get visible(): boolean;
    set visible(value: boolean);
    get color(): THREE.Color;
    set color(value: THREE.Color);
    get opacity(): number;
    set opacity(value: number);
    get size(): number;
    set size(value: number);
}
export {};
import * as FRAGS from "@thatopen/fragments";
import * as WEBIFC from "web-ifc";
export declare class SpatialIdsFinder {
    static get(model: FRAGS.FragmentsGroup, webIfc: WEBIFC.IfcAPI): void;
}
import * as WEBIFC from "web-ifc";
import { IfcItemsCategories } from "../../../ifc";
export declare class SpatialStructure {
    itemsByFloor: IfcItemsCategories;
    private _units;
    setUp(webIfc: WEBIFC.IfcAPI): void;
    cleanUp(): void;
}
import * as WEBIFC from "web-ifc";
/** Configuration of the IFC-fragment conversion. */
export declare class IfcFragmentSettings {
    /** Whether to extract the IFC properties into a JSON. */
    includeProperties: boolean;
    /**
     * Generate the geometry for categories that are not included by default,
     * like IFCSPACE.
     */
    optionalCategories: number[];
    /** Path of the WASM for [web-ifc](https://github.com/ThatOpen/engine_web-ifc). */
    wasm: {
        path: string;
        absolute: boolean;
        logLevel?: WEBIFC.LogLevel;
    };
    /** List of categories that won't be converted to fragments. */
    excludedCategories: Set<number>;
    /** Exclusive list of categories that will be converted to fragments. If this contains any category, any other categories will be ignored. */
    includedCategories: Set<number>;
    /** Whether to save the absolute location of all IFC items. */
    saveLocations: boolean;
    /** Loader settings for [web-ifc](https://github.com/ThatOpen/engine_web-ifc). */
    webIfc: WEBIFC.LoaderSettings;
    /**
     * Whether to automatically set the path to the WASM file for [web-ifc](https://github.com/ThatOpen/engine_web-ifc).
     * If set to true, the path will be set to the default path of the WASM file.
     * If set to false, the path must be provided manually in the 'wasm.path' property.
     * Default value is true.
     */
    autoSetWasm: boolean;
    /**
     * Custom function to handle the file location for [web-ifc](https://github.com/ThatOpen/engine_web-ifc).
     * This function will be called when [web-ifc](https://github.com/ThatOpen/engine_web-ifc) needs to locate a file.
     * If set to null, the default file location handler will be used.
     *
     * @param url - The URL of the file to locate.
     * @returns The absolute path of the file.
     */
    customLocateFileHandler: WEBIFC.LocateFileHandlerFn | null;
}
import { Components } from "../../../../core/Components";
import { IDSFacet } from "../facets";
export declare const createPropertyFacets: (components: Components, elements: any) => IDSFacet[];
import * as WEBIFC from "web-ifc";
export interface IfcItemsCategories {
    [itemID: number]: number;
}
export declare class IfcCategories {
    getAll(webIfc: WEBIFC.IfcAPI, modelID: number): IfcItemsCategories;
}
/**
 * A Set of unique numbers representing different types of IFC geometries.
 */
export declare const GeometryTypes: Set<number>;
import { InverseAttribute } from "./types";
export declare const relToAttributesMap: Map<160246688 | 2655215786 | 919958153 | 1307041759 | 4186316022 | 781010003 | 307848117 | 3242617779 | 279856033 | 1204542856 | 2857406711 | 2565941209 | 2495723537 | 3268803585 | 982818633, {
    forRelating: InverseAttribute;
    forRelated: InverseAttribute;
}>;
/**
 * A map of IFC element types to their corresponding names. The keys are the IFC entity type numbers, and the values are the names of the IFC entities.
 *
 * @remarks
 * This map is used to provide a mapping between IFC entity type numbers and their names.
 * It is useful for identifying and processing different types of IFC elements in a project.
 *
 */
export declare const IfcElements: {
    [key: number]: string;
};
/**
 * A map that associates each unique integer identifier (IFC Entity ID) with its corresponding category name. This map is used to map IFC entities to their respective categories for easier identification and processing.
 */
export declare const IfcCategoryMap: {
    [key: number]: string;
};
import * as FRAGS from "@thatopen/fragments";
export declare class IfcPropertiesUtils {
    static getUnits(group: FRAGS.FragmentsGroup): Promise<number>;
    static findItemByGuid(model: FRAGS.FragmentsGroup, guid: string): Promise<{
        [attribute: string]: any;
    } | null>;
    static getRelationMap(model: FRAGS.FragmentsGroup, relationType: number, onElementsFound?: (relatingID: number, relatedIDs: number[]) => Promise<void>): Promise<{
        [relatingID: number]: number[];
    }>;
    static getQsetQuantities(model: FRAGS.FragmentsGroup, expressID: number, onQuantityFound?: (expressID: number) => void): Promise<number[] | null>;
    static getPsetProps(model: FRAGS.FragmentsGroup, expressID: number, onPropFound?: (expressID: number) => void): Promise<number[] | null>;
    static getPsetRel(model: FRAGS.FragmentsGroup, psetID: number): Promise<number | null>;
    static getQsetRel(model: FRAGS.FragmentsGroup, qsetID: number): Promise<number | null>;
    static getEntityName(model: FRAGS.FragmentsGroup, entityID: number): Promise<{
        key: string | null;
        name: string | null;
    }>;
    static getQuantityValue(model: FRAGS.FragmentsGroup, quantityID: number): Promise<{
        key: string | null;
        value: number | null;
    }>;
    static isRel(expressID: number): boolean;
    static attributeExists(model: FRAGS.FragmentsGroup, expressID: number, attribute: string): Promise<boolean>;
    static groupEntitiesByType(model: FRAGS.FragmentsGroup, expressIDs: Set<number> | number[]): Promise<Map<number, Set<number>>>;
}
export declare const ifcCategoryCase: {
    [upperCase: string]: string;
};
/**
 * Simple event handler by [Jason Kleban](https://gist.github.com/JasonKleban/50cee44960c225ac1993c922563aa540). Keep in mind that if you want to remove it later, you might want to declare the callback as an object. If you want to maintain the reference to 'this', you will need to declare the callback as an arrow function.
 */
export declare class Event<T> {
    /**
     * Whether this event is active or not. If not, it won't trigger.
     */
    enabled: boolean;
    /**
     * Add a callback to this event instance.
     * @param handler - the callback to be added to this event.
     */
    add(handler: T extends void ? {
        (): void;
    } : {
        (data: T): void;
    }): void;
    /**
     * Removes a callback from this event instance.
     * @param handler - the callback to be removed from this event.
     */
    remove(handler: T extends void ? {
        (): void;
    } : {
        (data: T): void;
    }): void;
    /** Triggers all the callbacks assigned to this event. */
    trigger: (data?: T) => void;
    /** Gets rid of all the suscribed events. */
    reset(): void;
    private handlers;
}
/**
 * Simple event handler by [Jason Kleban](https://gist.github.com/JasonKleban/50cee44960c225ac1993c922563aa540). Keep in mind that if you want to remove it later, you might want to declare the callback as an object. If you want to maintain the reference to 'this', you will need to declare the callback as an arrow function.
 */
export declare class AsyncEvent<T> {
    /**
     * Whether this event is active or not. If not, it won't trigger.
     */
    enabled: boolean;
    /**
     * Add a callback to this event instance.
     * @param handler - the callback to be added to this event.
     */
    add(handler: T extends void ? {
        (): Promise<void>;
    } : {
        (data: T): Promise<void>;
    }): void;
    /**
     * Removes a callback from this event instance.
     * @param handler - the callback to be removed from this event.
     */
    remove(handler: T extends void ? {
        (): Promise<void>;
    } : {
        (data: T): Promise<void>;
    }): void;
    /** Triggers all the callbacks assigned to this event. */
    trigger: (data?: T) => Promise<void>;
    /** Gets rid of all the suscribed events. */
    reset(): void;
    private handlers;
}
import * as THREE from "three";
import CameraControls from "camera-controls";
import { Event } from "./event";
import { EventManager } from "./event-manager";
/**
 * Whether this component has to be manually destroyed once you are done with it to prevent [memory leaks](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects). This also ensures that the DOM events created by that component will be cleaned up.
 */
export interface Disposable {
    /**
     * Destroys the object from memory to prevent a
     * [memory leak](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects).
     */
    dispose: () => void | Promise<void>;
    /** Fired after the tool has been disposed.  */
    readonly onDisposed: Event<any>;
}
/**
 * Whether the geometric representation of this component can be hidden or shown in the [Three.js scene](https://threejs.org/docs/#api/en/scenes/Scene).
 */
export interface Hideable {
    /**
     * Whether the geometric representation of this component is
     * currently visible or not in the
     * [Three.js scene](https://threejs.org/docs/#api/en/scenes/Scene).
     */
    visible: boolean;
}
/**
 * Whether this component can be resized. The meaning of this can vary depending on the component: resizing a [Renderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) component could mean changing its resolution, whereas resizing a [Mesh](https://threejs.org/docs/#api/en/objects/Mesh) would change its scale.
 */
export interface Resizeable {
    /**
     * Sets size of this component (e.g. the resolution of a
     * [Renderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)
     * component.
     */
    resize: (size?: THREE.Vector2) => void;
    /** Event that fires when the component has been resized. */
    onResize: Event<THREE.Vector2>;
    /**
     * Gets the current size of this component (e.g. the resolution of a
     * [Renderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)
     * component.
     */
    getSize: () => THREE.Vector2;
}
/** Whether this component should be updated each frame. */
export interface Updateable {
    /** Actions that should be executed after updating the component. */
    onAfterUpdate: Event<any>;
    /** Actions that should be executed before updating the component. */
    onBeforeUpdate: Event<any>;
    /**
     * Function used to update the state of this component each frame. For
     * instance, a renderer component will make a render each frame.
     */
    update(delta?: number): void;
}
/** Basic type to describe the progress of any kind of process. */
export interface Progress {
    /** The amount of things that have been done already. */
    current: number;
    /** The total amount of things to be done by the process. */
    total: number;
}
/**
 * Whether this component supports create and destroy operations. This generally applies for components that work with instances, such as clipping planes or dimensions.
 */
export interface Createable {
    /** Creates a new instance of an element (e.g. a new Dimension). */
    create: (data: any) => void;
    /**
     * Finish the creation process of the component, successfully creating an
     * instance of whatever the component creates.
     */
    endCreation?: (data: any) => void;
    /**
     * Cancels the creation process of the component, going back to the state
     * before starting to create.
     */
    cancelCreation?: (data: any) => void;
    /** Deletes an existing instance of an element (e.g. a Dimension). */
    delete: (data: any) => void;
}
/**
 * Whether this component supports to be configured.
 */
export interface Configurable<T, U> {
    /** Wether this components has been already configured. */
    isSetup: boolean;
    /** Use the provided configuration to set up the tool. */
    setup: (config?: Partial<U>) => void | Promise<void>;
    /** Fired after successfully calling {@link Configurable.setup()}  */
    readonly onSetup: Event<any>;
    /** Object holding the tool configuration. You can edit this directly to change the object.
     */
    config: Required<T>;
}
/**
 * Whether a camera uses the Camera Controls library.
 */
export interface CameraControllable {
    /**
     * An instance of CameraControls that provides camera control functionalities.
     * This instance is used to manipulate the camera.
     */
    controls: CameraControls;
}
/**
 * Whether it has events or not.
 */
export interface Eventable {
    /**
     * The object in charge of managing all the events.
     */
    eventManager: EventManager;
}
import { Base } from "./base";
/**
 * Components are the building blocks of this library. Components are singleton elements that contain specific functionality. For instance, the Clipper Component can create, delete and handle 3D clipping planes. Components must be unique (they can't be instanced more than once per Components instance), and have a static UUID that identifies them uniquely. The can be accessed globally using the {@link Components} instance.
 */
export declare abstract class Component extends Base {
    /**
     * Whether this component is active or not. The behaviour can vary depending
     * on the type of component. E.g. a disabled dimension tool will stop creating
     * dimensions, while a disabled camera will stop moving. A disabled component
     * will not be updated automatically each frame.
     */
    abstract enabled: boolean;
}
import * as FRAGS from "@thatopen/fragments";
import { IfcFinderQuery } from "./ifc-finder-query";
import { Components } from "../../../core";
/**
 * A group of queries to perform searches in one or many IFC files.
 */
export declare class IfcQueryGroup {
    /**
     * The list of queries contained in this group.
     */
    list: Map<string, IfcFinderQuery>;
    /**
     * A unique string to identify this group instance.
     */
    id: string;
    /**
     * The way this group works when retrieving items.
     * - Combine: returns the sum of all items of all queries.
     * - Intersect: returns only the common elements of all queries.
     */
    mode: "combine" | "intersect";
    private _components;
    /**
     * The list of unique queries contained in this group.
     */
    get queries(): Set<IfcFinderQuery>;
    /**
     * The items of all the queries contained in this group. The returned data depends on {@link IfcQueryGroup.mode}.
     */
    get items(): FRAGS.FragmentIdMap;
    constructor(components: Components);
    /**
     * Adds a new query to this group.
     * @param query the query to add.
     */
    add(query: IfcFinderQuery): void;
    /**
     * Clears the data of the given modelID of all queries contained in this group. If no modelID is provided, clears all data.
     * @param modelID the model whose data to remove.
     */
    clear(modelID?: string): void;
    /**
     * Imports data that has been previously exported through {@link IfcQueryGroup.export}.
     * @param data the serializable object used to persist a group's data.
     */
    import(data: {
        mode: "combine" | "intersect";
        id: string;
        queries: {
            [guid: string]: any;
        };
    }): void;
    /**
     * Exports all the data of this group, so that it can be persisted and imported later using {@link IfcQueryGroup.import}.
     */
    export(): {
        mode: "combine" | "intersect";
        id: string;
        queries: {
            [guid: string]: any;
        };
    };
    /**
     * Updates all the queries contained in this group that need an update for the given file. It will skip those where {@link IfcFinderQuery.needsUpdate} is false.
     * @param modelID the identifier used to refer to the given file.
     * @param file the file to process.
     */
    update(modelID: string, file: File): Promise<void>;
}
import { Disposable, Hideable, Resizeable, Updateable, Configurable } from "./interfaces";
import { Components } from "../../Components";
/**
 * Base class of the library. Useful for finding out the interfaces something implements.
 */
export declare abstract class Base {
    components: Components;
    constructor(components: Components);
    /** Whether is component is {@link Disposable}. */
    isDisposeable: () => this is Disposable;
    /** Whether is component is {@link Resizeable}. */
    isResizeable: () => this is Resizeable;
    /** Whether is component is {@link Updateable}. */
    isUpdateable: () => this is Updateable;
    /** Whether is component is {@link Hideable}. */
    isHideable: () => this is Hideable;
    /** Whether is component is {@link Configurable}. */
    isConfigurable: () => this is Configurable<any, any>;
}
import { Base } from "./base";
import { World } from "./world";
import { Event } from "./event";
import { Components } from "../../Components";
/**
 * One of the elements that make a world. It can be either a scene, a camera or a renderer.
 */
export declare abstract class BaseWorldItem extends Base {
    readonly worlds: Map<string, World>;
    /**
     * Event that is triggered when a world is added or removed from the 'worlds' map.
     * The event payload contains the world instance and the action ("added" or "removed").
     */
    readonly onWorldChanged: Event<{
        world: World;
        action: "added" | "removed";
    }>;
    /**
     * The current world this item is associated with. It can be null if no world is currently active.
     */
    currentWorld: World | null;
    protected constructor(components: Components);
}
import * as THREE from "three";
import CameraControls from "camera-controls";
import { BaseWorldItem } from "./base-world-item";
import { CameraControllable } from "./interfaces";
/**
 * Abstract class representing a camera in a 3D world. All cameras should use this class as a base.
 */
export declare abstract class BaseCamera extends BaseWorldItem {
    /**
     * Whether the camera is enabled or not.
     */
    abstract enabled: boolean;
    /**
     * The Three.js camera instance.
     */
    abstract three: THREE.Camera;
    /**
     * Optional CameraControls instance for controlling the camera.
     * This property is only available if the camera is controllable.
     */
    abstract controls?: CameraControls;
    /**
     * Checks whether the instance is {@link CameraControllable}.
     *
     * @returns True if the instance is controllable, false otherwise.
     */
    hasCameraControls: () => this is CameraControllable;
}
import * as THREE from "three";
import { Vector2 } from "three";
import { Event } from "./event";
import { BaseWorldItem } from "./base-world-item";
import { Disposable, Resizeable, Updateable } from "./interfaces";
/**
 * Abstract class representing a renderer for a 3D world. All renderers should use this class as a base.
 */
export declare abstract class BaseRenderer extends BaseWorldItem implements Updateable, Disposable, Resizeable {
    /**
     * The three.js WebGLRenderer instance associated with this renderer.
     *
     * @abstract
     * @type {THREE.WebGLRenderer}
     */
    abstract three: THREE.WebGLRenderer;
    /** {@link Updateable.onBeforeUpdate} */
    onAfterUpdate: Event<unknown>;
    /** {@link Updateable.onAfterUpdate} */
    onBeforeUpdate: Event<unknown>;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<undefined>;
    /** {@link Resizeable.onResize} */
    readonly onResize: Event<THREE.Vector2>;
    /**
     * Event that fires when there has been a change to the list of clipping
     * planes used by the active renderer.
     */
    readonly onClippingPlanesUpdated: Event<unknown>;
    /** {@link Updateable.update} */
    abstract update(delta?: number): void | Promise<void>;
    /** {@link Disposable.dispose} */
    abstract dispose(): void;
    /** {@link Resizeable.getSize} */
    abstract getSize(): Vector2;
    /** {@link Resizeable.resize} */
    abstract resize(size: Vector2 | undefined): void;
    /**
     * The list of [clipping planes](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.clippingPlanes) used by this instance of the renderer.
     */
    clippingPlanes: THREE.Plane[];
    /**
     * Updates the clipping planes and triggers the 'onClippingPlanesUpdated' event.
     *
     * @remarks
     * This method is typically called when there is a change to the list of clipping planes
     * used by the active renderer.
     */
    updateClippingPlanes(): void;
    /**
     * Sets or removes a clipping plane from the renderer.
     *
     * @param active - A boolean indicating whether the clipping plane should be active or not.
     * @param plane - The clipping plane to be added or removed.
     * @param isLocal - An optional boolean indicating whether the clipping plane is local to the object. If not provided, it defaults to 'false'.
     *
     * @remarks
     * This method adds or removes a clipping plane from the 'clippingPlanes' array.
     * If 'active' is 'true' and the plane is not already in the array, it is added.
     * If 'active' is 'false' and the plane is in the array, it is removed.
     * The 'three.clippingPlanes' property is then updated to reflect the current state of the 'clippingPlanes' array,
     * excluding any planes marked as local.
     */
    setPlane(active: boolean, plane: THREE.Plane, isLocal?: boolean): void;
}
import * as THREE from "three";
import { Disposable } from "./interfaces";
import { Event } from "./event";
import { Components } from "../../Components";
import { BaseWorldItem } from "./base-world-item";
/**
 * Abstract class representing a base scene in the application. All scenes should use this class as a base.
 */
export declare abstract class BaseScene extends BaseWorldItem implements Disposable {
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /**
     * Abstract property representing the three.js object associated with this scene.
     * It should be implemented by subclasses.
     */
    abstract three: THREE.Object3D;
    /** The set of directional lights managed by this scene component. */
    directionalLights: Map<string, THREE.DirectionalLight>;
    /** The set of ambient lights managed by this scene component. */
    ambientLights: Map<string, THREE.AmbientLight>;
    protected constructor(components: Components);
    /** {@link Disposable.dispose} */
    dispose(): void;
    deleteAllLights(): void;
}
import * as THREE from "three";
import { BaseScene } from "./base-scene";
import { BaseCamera } from "./base-camera";
import { BaseRenderer } from "./base-renderer";
import { Updateable, Disposable } from "./interfaces";
/**
 * Represents a 3D world with meshes, scene, camera, renderer, and other properties.
 */
export interface World extends Disposable, Updateable {
    /**
     * A set of meshes present in the world. This is taken into account for operations like raycasting.
     */
    meshes: Set<THREE.Mesh>;
    /**
     * The base scene of the world.
     */
    scene: BaseScene;
    /**
     * The base camera of the world.
     */
    camera: BaseCamera;
    /**
     * The base renderer of the world. Can be null if this world doesn't use a renderer (e.g. in a backend environment).
     */
    renderer: BaseRenderer | null;
    /**
     * A unique identifier for the world.
     */
    uuid: string;
    /**
     * Indicates whether the world is currently disposing. This is useful for cancelling logic that access the elements of a world (which are also disposed).
     */
    isDisposing: boolean;
}
import { Event } from "./event";
/**
 * A class that extends the built-in Set class and provides additional functionality. It triggers events when items are added, deleted, or the set is cleared.
 *
 * @template T - The type of elements in the set.
 */
export declare class DataSet<T> extends Set<T> {
    /**
     * An event that is triggered when a new item is added to the set.
     */
    readonly onItemAdded: Event<T>;
    /**
     * An event that is triggered when an item is deleted from the set.
     */
    readonly onItemDeleted: Event<unknown>;
    /**
     * An event that is triggered when the set is cleared.
     */
    readonly onCleared: Event<unknown>;
    /**
     * Constructs a new instance of the DataSet class.
     *
     * @param iterable - An optional iterable object to initialize the set with.
     */
    constructor(iterable?: Iterable<T> | null);
    /**
     * Clears the set and triggers the onCleared event.
     */
    clear(): void;
    /**
     * Adds one or multiple values to the set and triggers the onItemAdded event per each.
     *
     * @param value - The value to add to the set.
     * @returns - The set instance.
     */
    add(...value: T[]): this;
    /**
     * A function that acts as a guard for adding items to the set.
     * It determines whether a given value should be allowed to be added to the set.
     *
     * @param value - The value to be checked against the guard.
     * @returns A boolean indicating whether the value should be allowed to be added to the set.
     *          By default, this function always returns true, allowing all values to be added.
     *          You can override this behavior by providing a custom implementation.
     */
    guard: (value: T) => boolean;
    /**
     * Deletes a value from the set and triggers the onItemDeleted event.
     *
     * @param value - The value to delete from the set.
     * @returns - True if the value was successfully deleted, false otherwise.
     */
    delete(value: T): boolean;
    /**
     * Clears the set and resets the onItemAdded, onItemDeleted, and onCleared events.
     */
    dispose(): void;
}
import { Event } from "./event";
/**
 * A class that extends the built-in Map class and provides additional events for item set, update, delete, and clear operations.
 *
 * @template K - The type of keys in the map.
 * @template V - The type of values in the map.
 */
export declare class DataMap<K, V> extends Map<K, V> {
    /**
     * An event triggered when a new item is set in the map.
     */
    readonly onItemSet: Event<{
        key: K;
        value: V;
    }>;
    /**
     * An event triggered when an existing item in the map is updated.
     */
    readonly onItemUpdated: Event<{
        key: K;
        value: V;
    }>;
    /**
     * An event triggered when an item is deleted from the map.
     */
    readonly onItemDeleted: Event<K>;
    /**
     * An event triggered when the map is cleared.
     */
    readonly onCleared: Event<unknown>;
    /**
     * Constructs a new DataMap instance.
     *
     * @param iterable - An iterable object containing key-value pairs to populate the map.
     */
    constructor(iterable?: Iterable<readonly [K, V]> | null | undefined);
    /**
     * Clears the map and triggers the onCleared event.
     */
    clear(): void;
    /**
     * Sets the value for the specified key in the map.
     * If the item is new, then onItemSet is triggered.
     * If the item is already in the map, then onItemUpdated is triggered.
     *
     * @param key - The key of the item to set.
     * @param value - The value of the item to set.
     * @returns The DataMap instance.
     */
    set(key: K, value: V): this;
    /**
     * A function that acts as a guard for adding items to the set.
     * It determines whether a given value should be allowed to be added to the set.
     *
     * @param key - The key of the entry to be checked against the guard.
     * @param value - The value of the entry to be checked against the guard.
     * @returns A boolean indicating whether the value should be allowed to be added to the set.
     *          By default, this function always returns true, allowing all values to be added.
     *          You can override this behavior by providing a custom implementation.
     */
    guard: (key: K, value: V) => boolean;
    /**
     * Deletes the specified key from the map and triggers the onItemDeleted event if the key was found.
     *
     * @param key - The key of the item to delete.
     * @returns True if the key was found and deleted; otherwise, false.
     */
    delete(key: K): boolean;
    /**
     * Clears the map and resets the events.
     */
    dispose(): void;
}
import { Component } from "./component";
import { Configurator } from "../../ConfigManager";
import { Components } from "../../Components";
export type ComponentUIElement = {
    name: string;
    id: string;
    icon: string;
    componentID: string;
    get: (components: Components) => {
        element: HTMLElement;
        config?: Configurator;
        dispose?: () => void;
    };
};
export declare abstract class ComponentWithUI extends Component {
    abstract name: string;
    abstract getUI(): ComponentUIElement[];
}
import * as THREE from "three";
export interface BooleanSettingsControl {
    type: "Boolean";
    value: boolean;
}
export interface ColorSettingsControl {
    type: "Color";
    value: THREE.Color;
}
export interface TextSettingsControl {
    type: "Text";
    value: string;
}
export interface NumberSettingControl {
    type: "Number";
    interpolable: boolean;
    min?: number;
    max?: number;
    value: number;
}
export interface SelectSettingControl {
    type: "Select";
    multiple: boolean;
    options: Set<string>;
    value: string;
}
export interface Vector3SettingControl {
    type: "Vector3";
    value: THREE.Vector3;
}
export interface TextSetSettingControl {
    type: "TextSet";
    value: Set<string>;
}
export interface NoControl {
    type: "None";
    value: any;
}
export type ControlEntry = BooleanSettingsControl | ColorSettingsControl | TextSettingsControl | NumberSettingControl | SelectSettingControl | Vector3SettingControl | TextSetSettingControl | NoControl;
export interface ControlsSchema {
    [name: string]: ControlEntry | ControlsSchema;
}
export declare class ControlsUtils {
    static isEntry(item: any): boolean;
    static copySchema<T extends ControlsSchema = ControlsSchema>(schema: T, copy?: ControlsSchema): T;
    static copyEntry(controlEntry: ControlEntry): ControlEntry;
}
import { Event } from "./event";
import { AsyncEvent } from "./async-event";
/**
 * Simple class to easily toggle and reset event lists.
 */
export declare class EventManager {
    /**
     * The list of events managed by this instance.
     */
    list: Set<Event<any> | AsyncEvent<any>>;
    /**
     * Adds events to this manager.
     * @param events the events to add.
     */
    add(events: Iterable<Event<any> | AsyncEvent<any>>): void;
    /**
     * Removes events from this manager.
     * @param events the events to remove.
     */
    remove(events: Iterable<Event<any> | AsyncEvent<any>>): void;
    /**
     * Sets all the events managed by this instance as enabled or disabled.
     * @param active whether to turn on or off the events.
     */
    set(active: boolean): void;
    /**
     * Resets all the events managed by this instance.
     */
    reset(): void;
}
import * as THREE from "three";
import { BaseScene, Configurable, Event } from "../../Types";
import { Components } from "../../Components";
import { SimpleSceneConfig, SimpleSceneConfigManager } from "./simple-scene-config";
/**
 * A basic 3D [scene](https://threejs.org/docs/#api/en/scenes/Scene) to add objects hierarchically, and easily dispose them when you are finished with it.
 */
export declare class SimpleScene extends BaseScene implements Configurable<SimpleSceneConfigManager, SimpleSceneConfig> {
    /** {@link Configurable.onSetup} */
    readonly onSetup: Event<unknown>;
    /** {@link Configurable.isSetup} */
    isSetup: boolean;
    /**
     * The underlying Three.js scene object.
     * It is used to define the 3D space containing objects, lights, and cameras.
     */
    three: THREE.Scene;
    /** {@link Configurable.config} */
    config: SimpleSceneConfigManager;
    protected _defaultConfig: SimpleSceneConfig;
    constructor(components: Components);
    /** {@link Configurable.setup} */
    setup(config?: Partial<SimpleSceneConfig>): void;
    dispose(): void;
}
import * as THREE from "three";
import { Event, Base, World, BaseScene, BaseCamera, BaseRenderer, Disposable, Updateable } from "../../Types";
/**
 * A class representing a simple world in a 3D environment. It extends the Base class and implements the World interface.
 *
 * @template T - The type of the scene. Default is BaseScene.
 * @template U - The type of the camera. Default is BaseCamera.
 * @template S - The type of the renderer. Default is BaseRenderer.
 */
export declare class SimpleWorld<T extends BaseScene = BaseScene, U extends BaseCamera = BaseCamera, S extends BaseRenderer = BaseRenderer> extends Base implements World, Disposable, Updateable {
    /**
     * All the loaded [meshes](https://threejs.org/docs/#api/en/objects/Mesh). These meshes will be taken into account in operations like raycasting.
     */
    readonly meshes: Set<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>;
    /** {@link Updateable.onAfterUpdate} */
    readonly onAfterUpdate: Event<unknown>;
    /** {@link Updateable.onBeforeUpdate} */
    readonly onBeforeUpdate: Event<unknown>;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /**
     * Indicates whether the world is currently being disposed. This is useful to prevent trying to access world's elements when it's being disposed, which could cause errors when you dispose a world.
     */
    isDisposing: boolean;
    /**
     * Indicates whether the world is currently enabled.
     * When disabled, the world will not be updated.
     */
    enabled: boolean;
    /**
     * A unique identifier for the world. Is not meant to be changed at any moment.
     */
    readonly uuid: string;
    /**
     * An optional name for the world.
     */
    name?: string;
    private _scene?;
    private _camera?;
    private _renderer;
    /**
     * Getter for the scene. If no scene is initialized, it throws an error.
     * @returns The current scene.
     */
    get scene(): T;
    /**
     * Setter for the scene. It sets the current scene, adds the world to the scene's worlds set,
     * sets the current world in the scene, and triggers the scene's onWorldChanged event with the added action.
     * @param scene - The new scene to be set.
     */
    set scene(scene: T);
    /**
     * Getter for the camera. If no camera is initialized, it throws an error.
     * @returns The current camera.
     */
    get camera(): U;
    /**
     * Setter for the camera. It sets the current camera, adds the world to the camera's worlds set,
     * sets the current world in the camera, and triggers the camera's onWorldChanged event with the added action.
     * @param camera - The new camera to be set.
     */
    set camera(camera: U);
    /**
     * Getter for the renderer.
     * @returns The current renderer or null if no renderer is set. Some worlds don't need a renderer to work (when your mail goal is not to display a 3D viewport to the user).
     */
    get renderer(): S | null;
    /**
     * Setter for the renderer. It sets the current renderer, adds the world to the renderer's worlds set,
     * sets the current world in the renderer, and triggers the renderer's onWorldChanged event with the added action.
     * If a new renderer is set, it also triggers the onWorldChanged event with the removed action for the old renderer.
     * @param renderer - The new renderer to be set or null to remove the current renderer.
     */
    set renderer(renderer: S | null);
    /** {@link Updateable.update} */
    update(delta?: number): void;
    /** {@link Disposable.dispose} */
    dispose(disposeResources?: boolean): void;
}
import * as THREE from "three";
import { BaseRenderer, Event } from "../../Types";
import { Components } from "../../Components";
/**
 * A basic renderer capable of rendering [Objec3Ds](https://threejs.org/docs/#api/en/core/Object3D).
 */
export declare class SimpleRenderer extends BaseRenderer {
    /**
     * Indicates whether the renderer is enabled. If it's not, it won't be updated.
     * Default is 'true'.
     */
    enabled: boolean;
    /**
     * The HTML container of the THREE.js canvas where the scene is rendered.
     */
    container: HTMLElement;
    /**
     * The THREE.js WebGLRenderer instance.
     */
    three: THREE.WebGLRenderer;
    protected _canvas: HTMLCanvasElement;
    protected _parameters?: Partial<THREE.WebGLRendererParameters>;
    protected _resizeObserver: ResizeObserver | null;
    protected onContainerUpdated: Event<unknown>;
    private _resizing;
    /**
     * Constructor for the SimpleRenderer class.
     *
     * @param components - The components instance.
     * @param container - The HTML container where the THREE.js canvas will be rendered.
     * @param parameters - Optional parameters for the THREE.js WebGLRenderer.
     */
    constructor(components: Components, container: HTMLElement, parameters?: Partial<THREE.WebGLRendererParameters>);
    /** {@link Updateable.update} */
    update(): void;
    /** {@link Disposable.dispose} */
    dispose(): void;
    /** {@link Resizeable.getSize}. */
    getSize(): THREE.Vector2;
    /** {@link Resizeable.resize} */
    resize: (size?: THREE.Vector2) => void;
    /**
     * Sets up and manages the event listeners for the renderer.
     *
     * @param active - A boolean indicating whether to activate or deactivate the event listeners.
     *
     * @throws Will throw an error if the renderer does not have an HTML container.
     */
    setupEvents(active: boolean): void;
    private resizeEvent;
    private setupRenderer;
    private onContextLost;
    private onContextBack;
}
import * as THREE from "three";
import CameraControls from "camera-controls";
import { Disposable, Updateable, Event, BaseCamera } from "../../Types";
import { Components } from "../../Components";
/**
 * A basic camera that uses [yomotsu's cameracontrols](https://github.com/yomotsu/camera-controls) to control the camera in 2D and 3D. Check out it's API to find out what features it offers.
 */
export declare class SimpleCamera extends BaseCamera implements Updateable, Disposable {
    /** {@link Updateable.onBeforeUpdate} */
    readonly onBeforeUpdate: Event<SimpleCamera>;
    /** {@link Updateable.onAfterUpdate} */
    readonly onAfterUpdate: Event<SimpleCamera>;
    /**
     * Event that is triggered when the aspect of the camera has been updated.
     * This event is useful when you need to perform actions after the aspect of the camera has been changed.
     */
    readonly onAspectUpdated: Event<unknown>;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<string>;
    /**
     * A three.js PerspectiveCamera or OrthographicCamera instance.
     * This camera is used for rendering the scene.
     */
    three: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    private _allControls;
    /**
     * The object that controls the camera. An instance of
     * [yomotsu's cameracontrols](https://github.com/yomotsu/camera-controls).
     * Transforming the camera directly will have no effect: you need to use this
     * object to move, rotate, look at objects, etc.
     */
    get controls(): CameraControls;
    /**
     * Getter for the enabled state of the camera controls.
     * If the current world is null, it returns false.
     * Otherwise, it returns the enabled state of the camera controls.
     *
     * @returns {boolean} The enabled state of the camera controls.
     */
    get enabled(): boolean;
    /**
     * Setter for the enabled state of the camera controls.
     * If the current world is not null, it sets the enabled state of the camera controls to the provided value.
     *
     * @param {boolean} enabled - The new enabled state of the camera controls.
     */
    set enabled(enabled: boolean);
    constructor(components: Components);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /** {@link Updateable.update} */
    update(_delta: number): void;
    /**
     * Updates the aspect of the camera to match the size of the
     * {@link Components.renderer}.
     */
    updateAspect: () => void;
    private setupCamera;
    private newCameraControls;
    private setupEvents;
    private static getSubsetOfThree;
}
import { NavigationMode } from "./types";
import { OrthoPerspectiveCamera } from "../index";
/**
 * A {@link NavigationMode} that allows 3D navigation and panning like in many 3D and CAD softwares.
 */
export declare class OrbitMode implements NavigationMode {
    camera: OrthoPerspectiveCamera;
    /** {@link NavigationMode.enabled} */
    enabled: boolean;
    /** {@link NavigationMode.id} */
    readonly id = "Orbit";
    constructor(camera: OrthoPerspectiveCamera);
    /** {@link NavigationMode.set} */
    set(active: boolean): void;
    private activateOrbitControls;
}
import { NavigationMode } from "./types";
import { OrthoPerspectiveCamera } from "../index";
/**
 * A {@link NavigationMode} that allows first person navigation, simulating FPS video games.
 */
export declare class FirstPersonMode implements NavigationMode {
    private camera;
    /** {@link NavigationMode.enabled} */
    enabled: boolean;
    /** {@link NavigationMode.id} */
    readonly id = "FirstPerson";
    constructor(camera: OrthoPerspectiveCamera);
    /** {@link NavigationMode.set} */
    set(active: boolean): void;
    private setupFirstPersonCamera;
}
import * as THREE from "three";
import { SimpleScene } from "./simple-scene";
import { ColorSettingsControl, NumberSettingControl, Vector3SettingControl } from "../../Types";
import { Configurator } from "../../ConfigManager";
type SimpleSceneConfigType = {
    backgroundColor: ColorSettingsControl;
    ambientLight: {
        color: ColorSettingsControl;
        intensity: NumberSettingControl;
    };
    directionalLight: {
        color: ColorSettingsControl;
        intensity: NumberSettingControl;
        position: Vector3SettingControl;
    };
};
declare class DirectionalLightConfig {
    private _list;
    private _scene;
    constructor(list: SimpleSceneConfigType, scene: SimpleScene);
    get color(): THREE.Color;
    set color(value: THREE.Color);
    get intensity(): number;
    set intensity(value: number);
    get position(): THREE.Vector3;
    set position(value: THREE.Vector3);
}
declare class AmbientLightConfig {
    private _list;
    private _scene;
    constructor(list: SimpleSceneConfigType, scene: SimpleScene);
    get color(): THREE.Color;
    set color(value: THREE.Color);
    get intensity(): number;
    set intensity(value: number);
}
/**
 * Configuration interface for the {@link SimpleScene}.
 */
export interface SimpleSceneConfig {
    backgroundColor: THREE.Color;
    directionalLight: {
        color: THREE.Color;
        intensity: number;
        position: THREE.Vector3;
    };
    ambientLight: {
        color: THREE.Color;
        intensity: number;
    };
}
export declare class SimpleSceneConfigManager extends Configurator<SimpleScene, SimpleSceneConfigType> {
    protected _config: SimpleSceneConfigType;
    ambientLight: AmbientLightConfig;
    directionalLight: DirectionalLightConfig;
    get backgroundColor(): THREE.Color;
    set backgroundColor(value: THREE.Color);
}
export {};
import { NavigationMode } from "./types";
import { OrthoPerspectiveCamera } from "../index";
/**
 * A {@link NavigationMode} that allows to navigate floorplans in 2D, like many BIM tools.
 */
export declare class PlanMode implements NavigationMode {
    private camera;
    /** {@link NavigationMode.enabled} */
    enabled: boolean;
    /** {@link NavigationMode.id} */
    readonly id = "Plan";
    private mouseAction1?;
    private mouseAction2?;
    private mouseInitialized;
    private readonly defaultAzimuthSpeed;
    private readonly defaultPolarSpeed;
    constructor(camera: OrthoPerspectiveCamera);
    /** {@link NavigationMode.set} */
    set(active: boolean): void;
}
import * as THREE from "three";
import { CameraProjection } from "./types";
import { Event } from "../../Types";
import { OrthoPerspectiveCamera } from "../index";
/**
 * Object to control the {@link CameraProjection} of the {@link OrthoPerspectiveCamera}.
 */
export declare class ProjectionManager {
    /**
     * Event that fires when the {@link CameraProjection} changes.
     */
    readonly onChanged: Event<THREE.PerspectiveCamera | THREE.OrthographicCamera>;
    /**
     * Current projection mode of the camera.
     * Default is "Perspective".
     */
    current: CameraProjection;
    /**
     * The camera controlled by this ProjectionManager.
     * It can be either a PerspectiveCamera or an OrthographicCamera.
     */
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    /** Match Ortho zoom with Perspective distance when changing projection mode */
    matchOrthoDistanceEnabled: boolean;
    private _component;
    private _previousDistance;
    constructor(camera: OrthoPerspectiveCamera);
    /**
     * Sets the {@link CameraProjection} of the {@link OrthoPerspectiveCamera}.
     *
     * @param projection - the new projection to set. If it is the current projection,
     * it will have no effect.
     */
    set(projection: CameraProjection): Promise<void>;
    /**
     * Changes the current {@link CameraProjection} from Ortographic to Perspective
     * and vice versa.
     */
    toggle(): Promise<void>;
    private setOrthoCamera;
    private getPerspectiveDims;
    private setupOrthoCamera;
    private getDistance;
    private setPerspectiveCamera;
}
/**
 * The projection system of the camera.
 */
export type CameraProjection = "Perspective" | "Orthographic";
/**
 * The extensible list of supported navigation modes.
 */
export type NavModeID = "Orbit" | "FirstPerson" | "Plan";
/**
 * An object that determines the behavior of the camera controls and the user input (e.g. 2D floor plan mode, first person mode, etc).
 */
export interface NavigationMode {
    /** The unique ID of this navigation mode. */
    id: NavModeID;
    /**
     * Enable or disable this navigation mode.
     * When a new navigation mode is enabled, the previous navigation mode
     * must be disabled.
     *
     * @param active - whether to enable or disable this mode.
     * @param options - any additional data required to enable or disable it.
     * */
    set: (active: boolean, options?: any) => void;
    /** Whether this navigation mode is active or not. */
    enabled: boolean;
}
import * as THREE from "three";
import { Hideable, Event, World, Disposable, Configurable } from "../../Types";
import { Components } from "../../Components";
import { SimpleGridConfig, SimpleGridConfigManager } from "./simple-grid-config";
/**
 * An infinite grid. Created by [fyrestar](https://github.com/Fyrestar/THREE.InfiniteGridHelper) and translated to typescript by [dkaraush](https://github.com/dkaraush/THREE.InfiniteGridHelper/blob/master/InfiniteGridHelper.ts).
 */
export declare class SimpleGrid implements Hideable, Disposable, Configurable<SimpleGridConfigManager, SimpleGridConfig> {
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /** {@link Configurable.onSetup} */
    readonly onSetup: Event<unknown>;
    /** {@link Configurable.isSetup} */
    isSetup: boolean;
    /** The world instance to which this Raycaster belongs. */
    world: World;
    /** The components instance to which this grid belongs. */
    components: Components;
    /** {@link Configurable.config} */
    config: SimpleGridConfigManager;
    protected _defaultConfig: SimpleGridConfig;
    /** {@link Hideable.visible} */
    get visible(): boolean;
    /** {@link Hideable.visible} */
    set visible(visible: boolean);
    /** The material of the grid. */
    get material(): THREE.ShaderMaterial;
    /**
     * Whether the grid should fade away with distance. Recommended to be true for
     * perspective cameras and false for orthographic cameras.
     */
    get fade(): boolean;
    /**
     * Whether the grid should fade away with distance. Recommended to be true for
     * perspective cameras and false for orthographic cameras.
     */
    set fade(active: boolean);
    /** The Three.js mesh that contains the infinite grid. */
    readonly three: THREE.Mesh;
    private _fade;
    constructor(components: Components, world: World);
    /** {@link Configurable.setup} */
    setup(config?: Partial<SimpleGridConfig>): void;
    /** {@link Disposable.dispose} */
    dispose(): void;
    private setupEvents;
    private updateZoom;
}
import * as THREE from "three";
import { BooleanSettingsControl, ColorSettingsControl, NumberSettingControl } from "../../Types";
import { Configurator } from "../../ConfigManager";
import { SimpleGrid } from "./simple-grid";
type SimpleGridConfigType = {
    visible: BooleanSettingsControl;
    color: ColorSettingsControl;
    primarySize: NumberSettingControl;
    secondarySize: NumberSettingControl;
    distance: NumberSettingControl;
};
/**
 * Configuration interface for the {@link SimpleGrid}.
 */
export interface SimpleGridConfig {
    /**
     * Whether the grid is visible or not.
     */
    visible: boolean;
    /**
     * The color of the grid lines.
     */
    color: THREE.Color;
    /**
     * The size of the primary grid lines.
     */
    primarySize: number;
    /**
     * The size of the secondary grid lines.
     */
    secondarySize: number;
    /**
     * The distance at which the grid lines start to fade away.
     */
    distance: number;
}
export declare class SimpleGridConfigManager extends Configurator<SimpleGrid, SimpleGridConfigType> {
    protected _config: SimpleGridConfigType;
    /**
     * Whether the grid is visible or not.
     */
    get visible(): boolean;
    /**
     * Whether the grid is visible or not.
     */
    set visible(value: boolean);
    /**
     * The color of the grid lines.
     */
    get color(): THREE.Color;
    /**
     * The color of the grid lines.
     */
    set color(value: THREE.Color);
    /**
     * The size of the primary grid lines.
     */
    get primarySize(): number;
    /**
     * The size of the primary grid lines.
     */
    set primarySize(value: number);
    /**
     * The size of the secondary grid lines.
     */
    get secondarySize(): number;
    /**
     * The size of the secondary grid lines.
     */
    set secondarySize(value: number);
    /**
     * The distance at which the grid lines start to fade away.
     */
    get distance(): number;
    /**
     * The distance at which the grid lines start to fade away.
     */
    set distance(value: number);
}
export {};
import { SimplePlane } from "../../Clipper";
import { DataSet } from "../../Types";
export interface ViewpointCamera {
    direction: {
        x: number;
        y: number;
        z: number;
    };
    position: {
        x: number;
        y: number;
        z: number;
    };
    aspectRatio: number;
}
export interface ViewpointPerspectiveCamera extends ViewpointCamera {
    fov: number;
}
export interface ViewpointOrthographicCamera extends ViewpointCamera {
    viewToWorldScale: number;
}
/**
 * Represents a viewpoint in a BCF file.
 */
export interface BCFViewpoint {
    title?: string;
    guid: string;
    camera: ViewpointPerspectiveCamera | ViewpointOrthographicCamera;
    selectionComponents: Iterable<string>;
    exceptionComponents: Iterable<string>;
    clippingPlanes: DataSet<SimplePlane>;
    spacesVisible: boolean;
    spaceBoundariesVisible: boolean;
    openingsVisible: boolean;
    defaultVisibility: boolean;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import { BCFViewpoint, ViewpointOrthographicCamera, ViewpointPerspectiveCamera } from "./types";
import { CameraProjection } from "../../OrthoPerspectiveCamera";
import { Components } from "../../Components";
import { DataMap, DataSet, World } from "../../Types";
import { SimplePlane } from "../../Clipper";
/**
 * Represents a BCF compliant viewpoint from BuildingSMART.
 *
 * The Viewpoint class provides methods for managing and interacting with viewpoints.
 * It includes functionality for setting viewpoint properties, updating the camera,
 * applying color to components, and serializing the viewpoint for export.
 */
export declare class Viewpoint implements BCFViewpoint {
    title?: string;
    readonly guid: string;
    /**
     * ClippingPlanes can be used to define a subsection of a building model that is related to the topic.
     * Each clipping plane is defined by Location and Direction.
     * The Direction vector points in the invisible direction meaning the half-space that is clipped.
     * @experimental
     */
    clippingPlanes: DataSet<SimplePlane>;
    camera: ViewpointPerspectiveCamera | ViewpointOrthographicCamera;
    /**
     * A list of components GUIDs to hide when defaultVisibility = true or to show when defaultVisibility = false
     */
    readonly exceptionComponents: DataSet<string>;
    /**
     * A list of components GUIDs that should be selected (highlighted) when displaying a viewpoint.
     */
    readonly selectionComponents: DataSet<string>;
    /**
     * A map of colors and components GUIDs that should be colorized when displaying a viewpoint.
     * For this to work, call viewpoint.colorize()
     */
    readonly componentColors: DataMap<THREE.Color, string[]>;
    /**
     * Boolean flags to allow fine control over the visibility of spaces.
     * A typical use of these flags is when DefaultVisibility=true but spaces should remain hidden.
     * @default false
     */
    spacesVisible: boolean;
    /**
     * Boolean flags to allow fine control over the visibility of space boundaries.
     * A typical use of these flags is when DefaultVisibility=true but space boundaries should remain hidden.
     * @default false
     */
    spaceBoundariesVisible: boolean;
    /**
     * Boolean flags to allow fine control over the visibility of openings.
     * A typical use of these flags is when DefaultVisibility=true but openings should remain hidden.
     * @default false
     */
    openingsVisible: boolean;
    /**
     * When true, all components should be visible unless listed in the exceptions
     * When false all components should be invisible unless listed in the exceptions
     */
    defaultVisibility: boolean;
    private get _selectionModelIdMap();
    private get _exceptionModelIdMap();
    /**
     * A list of components that should be selected (highlighted) when displaying a viewpoint.
     * @returns The fragmentIdMap for components marked as selections.
     */
    get selection(): FRAGS.FragmentIdMap;
    /**
     * A list of components to hide when defaultVisibility = true or to show when defaultVisibility = false
     * @returns The fragmentIdMap for components marked as exceptions.
     */
    get exception(): FRAGS.FragmentIdMap;
    /**
     * Retrieves the projection type of the viewpoint's camera.
     *
     * @returns A string representing the projection type of the viewpoint's camera.
     *          It can be either 'Perspective' or 'Orthographic'.
     */
    get projection(): CameraProjection;
    /**
     * Retrieves the position vector of the viewpoint's camera.
     *
     * @remarks
     * The position vector represents the camera's position in the world coordinate system.
     * The function applies the base coordinate system transformation to the position vector.
     *
     * @returns A THREE.Vector3 representing the position of the viewpoint's camera.
     */
    get position(): THREE.Vector3;
    /**
     * Retrieves the direction vector of the viewpoint's camera.
     *
     * @remarks
     * The direction vector represents the direction in which the camera is pointing.
     * It is calculated by extracting the x, y, and z components from the camera's direction property.
     *
     * @returns A THREE.Vector3 representing the direction of the viewpoint's camera.
     */
    get direction(): THREE.Vector3;
    private _components;
    /**
     * Represents the world in which the viewpoints are created and managed.
     */
    readonly world: World;
    private get _managerVersion();
    /**
     * Retrieves the list of BCF topics associated with the current viewpoint.
     *
     * @remarks
     * This function retrieves the BCFTopics manager from the components,
     * then filters the list of topics to find those associated with the current viewpoint.
     *
     * @returns An array of BCF topics associated with the current viewpoint.
     */
    get topics(): import("../../../openbim/BCFTopics").Topic[];
    constructor(components: Components, world: World, _config?: {
        data?: Partial<BCFViewpoint>;
        setCamera?: boolean;
    });
    /**
     * Adds components to the viewpoint based on the provided fragment ID map.
     *
     * @param fragmentIdMap - A map containing fragment IDs as keys and arrays of express IDs as values.
     */
    addComponentsFromMap(fragmentIdMap: FRAGS.FragmentIdMap): void;
    /**
     * Replace the properties of the viewpoint with the provided data.
     *
     * @remarks The guid will be ommited as it shouldn't change after it has been initially set.
     * @remarks The existing selection and exception components will be fully replaced in case new ones are provided.
     *
     * @param data - An object containing the properties to be set.
     *               The properties not included in the object will remain unchanged.
     *
     * @returns The viewpoint instance with the updated properties.
     */
    set(data: Partial<BCFViewpoint>): this;
    /**
     * Sets the viewpoint of the camera in the world.
     *
     * @remarks
     * This function calculates the target position based on the viewpoint information.
     * It sets the visibility of the viewpoint components and then applies the viewpoint using the camera's controls.
     *
     * @param transition - Indicates whether the camera movement should have a transition effect.
     *                      Default value is 'true'.
     *
     * @throws An error if the world's camera does not have camera controls.
     *
     * @returns A Promise that resolves when the camera has been set.
     */
    go(world?: World, transition?: boolean): Promise<void>;
    /**
     * Updates the camera settings of the viewpoint based on the current world's camera and renderer.
     *
     * @remarks
     * This function retrieves the camera's position, direction, and aspect ratio from the world's camera and renderer.
     * It then calculates the camera's perspective or orthographic settings based on the camera type.
     * Finally, it updates the viewpoint's camera settings and updates the viewpoint to the Viewpoints manager.
     *
     * @throws An error if the world's camera does not have camera controls.
     * @throws An error if the world's renderer is not available.
     */
    updateCamera(world?: World): void;
    applyVisibility(): void;
    /**
     * Applies color to the components in the viewpoint based on their GUIDs.
     *
     * This function iterates through the 'componentColors' map, retrieves the fragment IDs
     * corresponding to each color, and then uses the 'Classifier' to apply the color to those fragments.
     *
     * @remarks
     * The color is applied using the 'Classifier.setColor' method, which sets the color of the specified fragments.
     * The color is provided as a hexadecimal string, prefixed with a '#'.
     */
    applyColors(): void;
    /**
     * Resets the colors of all components in the viewpoint to their original color.
     */
    resetColors(): void;
    private createComponentTags;
    private createColorTags;
    /**
     * Serializes the viewpoint into a buildingSMART compliant XML string for export.
     *
     * @param version - The version of the BCF Manager to use for serialization.
     *                   If not provided, the current version of the manager will be used.
     *
     * @returns A Promise that resolves to an XML string representing the viewpoint.
     *          The XML string follows the BCF VisualizationInfo schema.
     *
     * @throws An error if the world's camera does not have camera controls.
     * @throws An error if the world's renderer is not available.
     */
    serialize(version?: string): Promise<string>;
}
import * as THREE from "three";
import { Resizeable, Updateable, World, Event, Disposable, Configurable } from "../../Types";
import { MiniMapConfig, MiniMapConfigManager } from "./mini-map-config";
import { Components } from "../../Components";
/**
 * A class representing a 2D minimap of a 3D world.
 */
export declare class MiniMap implements Resizeable, Updateable, Disposable, Configurable<MiniMapConfigManager, MiniMapConfig> {
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /** {@link Updateable.onAfterUpdate} */
    readonly onAfterUpdate: Event<unknown>;
    /** {@link Updateable.onBeforeUpdate} */
    readonly onBeforeUpdate: Event<unknown>;
    /** {@link Resizeable.onResize} */
    readonly onResize: Event<THREE.Vector2>;
    /** {@link Configurable.onSetup} */
    readonly onSetup: Event<unknown>;
    /**
     * The front offset of the minimap.
     * It determines how much the minimap's view is offset from the camera's view.
     * By pushing the map to the front, what the user sees on screen corresponds with what they see on the map
     */
    frontOffset: number;
    /**
     * The override material for the minimap.
     * It is used to render the depth information of the world onto the minimap.
     */
    overrideMaterial: THREE.MeshDepthMaterial;
    /**
     * The background color of the minimap.
     * It is used to set the background color of the minimap's renderer.
     */
    backgroundColor: THREE.Color;
    /**
     * The WebGL renderer for the minimap.
     * It is used to render the minimap onto the screen.
     */
    renderer: THREE.WebGLRenderer;
    /**
     * A flag indicating whether the minimap is enabled.
     * If disabled, the minimap will not update or render.
     */
    enabled: boolean;
    /**
     * The world in which the minimap is displayed.
     * It provides access to the 3D scene, camera, and other relevant world elements.
     */
    world: World;
    /** {@link Configurable.config} */
    config: MiniMapConfigManager;
    /** {@link Configurable.isSetup} */
    isSetup: boolean;
    protected _defaultConfig: MiniMapConfig;
    private _lockRotation;
    private _size;
    private _camera;
    private _plane;
    private _tempVector1;
    private _tempVector2;
    private _tempTarget;
    private readonly down;
    /**
     * Gets or sets whether the minimap rotation is locked.
     * When rotation is locked, the minimap will always face the same direction as the camera.
     */
    get lockRotation(): boolean;
    /**
     * Sets whether the minimap rotation is locked.
     * When rotation is locked, the minimap will always face the same direction as the camera.
     * @param active - If 'true', rotation is locked. If 'false', rotation is not locked.
     */
    set lockRotation(active: boolean);
    /**
     * Gets the current zoom level of the minimap.
     * The zoom level determines how much of the world is visible on the minimap.
     * @returns The current zoom level of the minimap.
     */
    get zoom(): number;
    /**
     * Sets the zoom level of the minimap.
     * The zoom level determines how much of the world is visible on the minimap.
     * @param value - The new zoom level of the minimap.
     */
    set zoom(value: number);
    constructor(world: World, components: Components);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /** Returns the camera used by the MiniMap */
    get(): THREE.OrthographicCamera;
    /** {@link Updateable.update} */
    update(): void;
    /** {@link Resizeable.getSize} */
    getSize(): THREE.Vector2;
    /** {@link Resizeable.resize} */
    resize(size?: THREE.Vector2): void;
    /** {@link Configurable.setup} */
    setup(config?: Partial<MiniMapConfig>): void;
    private updatePlanes;
}
import * as THREE from "three";
import { BooleanSettingsControl, ColorSettingsControl, NumberSettingControl } from "../../Types";
import { Configurator } from "../../ConfigManager";
import { MiniMap } from "./index";
type MiniMapConfigType = {
    visible: BooleanSettingsControl;
    lockRotation: BooleanSettingsControl;
    zoom: NumberSettingControl;
    frontOffset: NumberSettingControl;
    sizeX: NumberSettingControl;
    sizeY: NumberSettingControl;
    backgroundColor: ColorSettingsControl;
};
/**
 * Configuration interface for the {@link MiniMap}.
 */
export interface MiniMapConfig {
    /**
     * Whether the minimap is visible or not.
     */
    visible: boolean;
    /**
     * Whether to lock the rotation of the top camera in the minimap.
     */
    lockRotation: boolean;
    /**
     * The zoom of the camera in the minimap.
     */
    zoom: number;
    /**
     * The front offset of the minimap.
     * It determines how much the minimap's view is offset from the camera's view.
     * By pushing the map to the front, what the user sees on screen corresponds with what they see on the map
     */
    frontOffset: number;
    /**
     * The horizontal dimension of the minimap.
     */
    sizeX: number;
    /**
     * The vertical dimension of the minimap.
     */
    sizeY: number;
    /**
     * The color of the background of the minimap.
     */
    backgroundColor: THREE.Color;
}
export declare class MiniMapConfigManager extends Configurator<MiniMap, MiniMapConfigType> {
    protected _config: MiniMapConfigType;
    /**
     * Whether the minimap is visible or not.
     */
    get visible(): boolean;
    /**
     * Whether the minimap is visible or not.
     */
    set visible(value: boolean);
    /**
     * Whether to lock the rotation of the top camera in the minimap.
     */
    get lockRotation(): boolean;
    /**
     * Whether to lock the rotation of the top camera in the minimap.
     */
    set lockRotation(value: boolean);
    /**
     * The zoom of the camera in the minimap.
     */
    get zoom(): number;
    /**
     * The zoom of the camera in the minimap.
     */
    set zoom(value: number);
    /**
     * The front offset of the minimap.
     * It determines how much the minimap's view is offset from the camera's view.
     * By pushing the map to the front, what the user sees on screen corresponds with what they see on the map
     */
    get frontOffset(): number;
    /**
     * The front offset of the minimap.
     * It determines how much the minimap's view is offset from the camera's view.
     * By pushing the map to the front, what the user sees on screen corresponds with what they see on the map
     */
    set frontOffset(value: number);
    /**
     * The horizontal dimension of the minimap.
     */
    get sizeX(): number;
    /**
     * The horizontal dimension of the minimap.
     */
    set sizeX(value: number);
    /**
     * The vertical dimension of the minimap.
     */
    get sizeY(): number;
    /**
     * The vertical dimension of the minimap.
     */
    set sizeY(value: number);
    /**
     * The color of the background of the minimap.
     */
    get backgroundColor(): THREE.Color;
    /**
     * The color of the background of the minimap.
     */
    set backgroundColor(value: THREE.Color);
}
export {};
import * as THREE from "three";
import { Event, World } from "../../Types";
import { Components } from "../../Components";
/**
 * A base renderer to determine visibility on screen.
 */
export declare class DistanceRenderer {
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<string>;
    /**
     * Fires after making the visibility check to the meshes. It lists the
     * meshes that are currently visible, and the ones that were visible
     * just before but not anymore.
     */
    readonly onDistanceComputed: Event<number>;
    /**
     * Objects that won't be taken into account in the distance check.
     */
    excludedObjects: Set<THREE.Object3D<THREE.Object3DEventMap>>;
    /**
     * Whether this renderer is active or not. If not, it won't render anything.
     */
    enabled: boolean;
    /**
     * Render the internal scene used to determine the object visibility. Used
     * for debugging purposes.
     */
    renderDebugFrame: boolean;
    /** The components instance to which this renderer belongs. */
    components: Components;
    /**
     * The scene where the distance is computed.
     */
    scene: THREE.Scene;
    /**
     * The camera used to compute the distance.
     */
    camera: THREE.OrthographicCamera;
    /**
     * The material used to compute the distance.
     */
    depthMaterial: THREE.ShaderMaterial;
    /** The world instance to which this renderer belongs. */
    readonly world: World;
    /** The THREE.js renderer used to make the visibility test. */
    readonly renderer: THREE.WebGLRenderer;
    protected readonly worker: Worker;
    private _width;
    private _height;
    private readonly _postQuad;
    private readonly tempRT;
    private readonly resultRT;
    private readonly bufferSize;
    private readonly _buffer;
    protected _isWorkerBusy: boolean;
    constructor(components: Components, world: World);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * The function that the culler uses to reprocess the scene. Generally it's
     * better to call needsUpdate, but you can also call this to force it.
     * @param force if true, it will refresh the scene even if needsUpdate is
     * not true.
     */
    compute: () => Promise<void>;
    private handleWorkerMessage;
}
import * as THREE from "three";
import * as WEBIFC from "web-ifc";
import * as FRAGS from "@thatopen/fragments";
export declare class CivilReader {
    defLineMat: THREE.LineBasicMaterial;
    read(webIfc: WEBIFC.IfcAPI): {
        alignments: Map<number, FRAGS.AlignmentObject>;
        coordinationMatrix: THREE.Matrix4;
    } | undefined;
    get(civilItems: any): {
        alignments: Map<number, FRAGS.AlignmentObject>;
        coordinationMatrix: THREE.Matrix4;
    } | undefined;
    private getCurves;
}
import * as WEBIFC from "web-ifc";
export declare class IfcMetadataReader {
    getNameInfo(webIfc: WEBIFC.IfcAPI): Record<string, any>;
    getDescriptionInfo(webIfc: WEBIFC.IfcAPI): Record<string, any>;
}
import { ControlsSchema } from "../../Types";
import { Components } from "../../Components";
export declare abstract class Configurator<T = any, U extends ControlsSchema = ControlsSchema> {
    protected abstract _config: U;
    protected _component: T;
    name: string;
    uuid: string;
    get controls(): U;
    constructor(component: T, components: Components, name: string, uuid?: string);
    set(data: Partial<U>): void;
    export(controls?: ControlsSchema, exported?: any): any;
    import(exported: any, imported?: any, first?: boolean): void;
}
import * as THREE from "three";
import { Disposable, Event } from "../../Types";
/**
 * A helper to easily get the real position of the mouse in the Three.js canvas to work with tools like the [raycaster](https://threejs.org/docs/#api/en/core/Raycaster), even if it has been transformed through CSS or doesn't occupy the whole screen.
 */
export declare class Mouse implements Disposable {
    dom: HTMLCanvasElement;
    private _event?;
    private _position;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    constructor(dom: HTMLCanvasElement);
    /**
     * The real position of the mouse of the Three.js canvas.
     */
    get position(): THREE.Vector2;
    /** {@link Disposable.dispose} */
    dispose(): void;
    private getPositionY;
    private getPositionX;
    private updateMouseInfo;
    private getDataObject;
    private setupEvents;
}
import * as THREE from "three";
import { Components } from "../../Components";
import { Event, World, Disposable } from "../../Types";
import { Mouse } from "./mouse";
/**
 * A simple [raycaster](https://threejs.org/docs/#api/en/core/Raycaster) that allows to easily get items from the scene using the mouse and touch events.
 */
export declare class SimpleRaycaster implements Disposable {
    /** {@link Component.enabled} */
    enabled: boolean;
    /** The components instance to which this Raycaster belongs. */
    components: Components;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /** The position of the mouse in the screen. */
    readonly mouse: Mouse;
    /**
     * A reference to the Three.js Raycaster instance.
     * This is used for raycasting operations.
     */
    readonly three: THREE.Raycaster;
    /**
     * A reference to the world instance to which this Raycaster belongs.
     * This is used to access the camera and meshes.
     */
    world: World;
    constructor(components: Components, world: World);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Throws a ray from the camera to the mouse or touch event point and returns
     * the first item found. This also takes into account the clipping planes
     * used by the renderer.
     *
     * @param items - the [meshes](https://threejs.org/docs/#api/en/objects/Mesh)
     * to query. If not provided, it will query all the meshes stored in
     * {@link Components.meshes}.
     * @param position - the screen position to use for raycasting. If not provided,
     * the last pointer (mouse/touch) position will be used.
     */
    castRay(items?: THREE.Object3D[], position?: THREE.Vector2): THREE.Intersection | null;
    /**
     * Casts a ray from a given origin in a given direction and returns the first item found.
     * This method also takes into account the clipping planes used by the renderer.
     *
     * @param origin - The origin of the ray.
     * @param direction - The direction of the ray.
     * @param items - The meshes to query. If not provided, it will query all the meshes stored in {@link World.meshes}.
     * @returns The first intersection found or 'null' if no intersection was found.
     */
    castRayFromVector(origin: THREE.Vector3, direction: THREE.Vector3, items?: THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>[]): THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>> | null;
    private intersect;
    private filterClippingPlanes;
}
import * as THREE from "three";
import { Hideable, Disposable, Event, World } from "../../Types";
import { Components } from "../../Components";
/**
 * Each of the clipping planes created by the clipper.
 */
export declare class SimplePlane implements Disposable, Hideable {
    /** Event that fires when the user starts dragging a clipping plane. */
    readonly onDraggingStarted: Event<unknown>;
    /** Event that fires when the user stops dragging a clipping plane. */
    readonly onDraggingEnded: Event<unknown>;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<unknown>;
    /**
     * The normal vector of the clipping plane.
     */
    readonly normal: THREE.Vector3;
    /**
     * The origin point of the clipping plane.
     */
    readonly origin: THREE.Vector3;
    /**
     * The THREE.js Plane object representing the clipping plane.
     */
    readonly three: THREE.Plane;
    /** The components instance to which this plane belongs. */
    components: Components;
    /** The world instance to which this plane belongs. */
    world: World;
    /** A custom string to identify what this plane is used for. */
    type: string;
    protected readonly _helper: THREE.Object3D;
    protected _visible: boolean;
    protected _enabled: boolean;
    private _controlsActive;
    private readonly _arrowBoundBox;
    private readonly _planeMesh;
    private readonly _controls;
    private readonly _hiddenMaterial;
    /**
     * Getter for the enabled state of the clipping plane.
     * @returns {boolean} The current enabled state.
     */
    get enabled(): boolean;
    /**
     * Setter for the enabled state of the clipping plane.
     * Updates the clipping plane state in the renderer and throws an error if no renderer is found.
     * @param {boolean} state - The new enabled state.
     */
    set enabled(state: boolean);
    /** {@link Hideable.visible } */
    get visible(): boolean;
    /** {@link Hideable.visible } */
    set visible(state: boolean);
    /** The meshes used for raycasting */
    get meshes(): THREE.Mesh[];
    /** The material of the clipping plane representation. */
    get planeMaterial(): THREE.Material | THREE.Material[];
    /** The material of the clipping plane representation. */
    set planeMaterial(material: THREE.Material | THREE.Material[]);
    /** The size of the clipping plane representation. */
    get size(): number;
    /** Sets the size of the clipping plane representation. */
    set size(size: number);
    /**
     * Getter for the helper object of the clipping plane.
     * The helper object is a THREE.Object3D that contains the clipping plane mesh and other related objects.
     * It is used for positioning, rotating, and scaling the clipping plane in the 3D scene.
     *
     * @returns {THREE.Object3D} The helper object of the clipping plane.
     */
    get helper(): THREE.Object3D<THREE.Object3DEventMap>;
    constructor(components: Components, world: World, origin: THREE.Vector3, normal: THREE.Vector3, material: THREE.Material, size?: number, activateControls?: boolean);
    /**
     * Sets the clipping plane's normal and origin from the given normal and point.
     * This method resets the clipping plane's state, updates the normal and origin,
     * and positions the helper object accordingly.
     *
     * @param normal - The new normal vector for the clipping plane.
     * @param point - The new origin point for the clipping plane.
     *
     * @returns {void}
     */
    setFromNormalAndCoplanarPoint(normal: THREE.Vector3, point: THREE.Vector3): void;
    /** {@link Updateable.update} */
    update: () => void;
    /** {@link Disposable.dispose} */
    dispose(): void;
    private reset;
    protected toggleControls(state: boolean): void;
    private newTransformControls;
    private initializeControls;
    private createArrowBoundingBox;
    private changeDrag;
    private notifyDraggingChanged;
    private preventCameraMovement;
    private newHelper;
    private static newPlaneMesh;
}
import { IfcFragmentSettings } from "../../IfcLoader/src";
/**
 * Settings for streaming IFC geometry and assets. Extends {@link IfcFragmentSettings} to inherit common settings.
 */
export declare class IfcStreamingSettings extends IfcFragmentSettings {
    /**
     * Minimum number of geometries to be streamed.
     * Defaults to 10 geometries.
     */
    minGeometrySize: number;
    /**
     * Minimum amount of assets to be streamed.
     * Defaults to 1000 assets.
     */
    minAssetsSize: number;
    /**
     * Maximum amount of triangles per fragment. Useful for controlling the maximum size of fragment files.
     */
    maxTriangles: number | null;
}
/**
 * A dictionary of geometries streamed from a server. Each geometry is identified by a unique number (id), and contains information about its bounding box, whether it has holes, and an optional file path for the geometry data.
 */
export interface StreamedGeometries {
    [id: number]: {
        /** The bounding box of the geometry as a Float32Array. */
        boundingBox: Float32Array;
        /** A boolean indicating whether the geometry has holes. */
        hasHoles: boolean;
        /** An optional file path for the geometry data. */
        geometryFile?: string;
    };
}
/**
 * A streamed asset, which consists of multiple geometries. Each geometry in the asset is identified by a unique number (geometryID), and contains information about its transformation and color.
 */
export interface StreamedAsset {
    /** The unique identifier of the asset. */
    id: number;
    /** An array of geometries associated with the asset. */
    geometries: {
        /** The unique identifier of the geometry. */
        geometryID: number;
        /** The transformation matrix of the geometry as a number array. */
        transformation: number[];
        /** The color of the geometry as a number array. */
        color: number[];
    }[];
}
import * as THREE from "three";
import { Components } from "../../Components";
import { AsyncEvent, Configurable, Event, World } from "../../Types";
import { CullerRendererConfig, CullerRendererConfigManager } from "./culler-renderer-config";
/**
 * A base renderer to determine visibility on screen.
 */
export declare class CullerRenderer implements Configurable<CullerRendererConfigManager, CullerRendererConfig> {
    /** {@link Configurable.onSetup} */
    readonly onSetup: Event<unknown>;
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<string>;
    /**
     * Fires after making the visibility check to the meshes. It lists the
     * meshes that are currently visible, and the ones that were visible
     * just before but not anymore.
     */
    readonly onViewUpdated: Event<any> | AsyncEvent<any>;
    /**
     * Whether this renderer is active or not. If not, it won't render anything.
     */
    enabled: boolean;
    /**
     * Needs to check whether there are objects that need to be hidden or shown.
     * You can bind this to the camera movement, to a certain interval, etc.
     */
    needsUpdate: boolean;
    /** The components instance to which this renderer belongs. */
    components: Components;
    /** The render target used to render the visibility scene. */
    renderTarget: THREE.WebGLRenderTarget<THREE.Texture>;
    /**
     * The size of the buffer where the result of the visibility check is stored.
     */
    bufferSize: number;
    /**
     * The buffer when the result of the visibility check is stored.
     */
    buffer: Uint8Array;
    /**
     * Flag to indicate if the renderer shouldn't update the visibility.
     */
    preventUpdate: boolean;
    /** {@link Configurable.config} */
    config: CullerRendererConfigManager;
    /** {@link Configurable.isSetup} */
    isSetup: boolean;
    /** The world instance to which this renderer belongs. */
    readonly world: World;
    /** The THREE.js renderer used to make the visibility test. */
    readonly renderer: THREE.WebGLRenderer;
    protected _defaultConfig: CullerRendererConfig;
    protected readonly worker: Worker;
    protected readonly scene: THREE.Scene;
    private _availableColor;
    protected _isWorkerBusy: boolean;
    constructor(components: Components, world: World);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * The function that the culler uses to reprocess the scene. Generally it's
     * better to call needsUpdate, but you can also call this to force it.
     * @param force if true, it will refresh the scene even if needsUpdate is
     * not true.
     */
    updateVisibility: (force?: boolean) => Promise<void>;
    setup(config?: Partial<CullerRendererConfig>): void;
    protected getAvailableColor(): {
        r: number;
        g: number;
        b: number;
        code: string;
    };
    protected increaseColor(): void;
    protected decreaseColor(): void;
}
export declare function readPixelsAsync(gl: WebGL2RenderingContext, x: number, y: number, w: number, h: number, format: any, type: any, dest: ArrayBufferView): Promise<ArrayBufferView>;
import * as THREE from "three";
import { CullerRenderer } from "./culler-renderer";
import { Components } from "../../Components";
import { Event, World, Disposable } from "../../Types";
/**
 * A renderer to hide/show meshes depending on their visibility from the user's point of view.
 */
export declare class MeshCullerRenderer extends CullerRenderer implements Disposable {
    /**
     * Event triggered when the visibility of meshes is updated.
     * Contains two sets: seen and unseen.
     */
    readonly onViewUpdated: Event<{
        seen: Set<THREE.Mesh>;
        unseen: Set<THREE.Mesh>;
    }>;
    /**
     * Map of color code to THREE.InstancedMesh.
     * Used to keep track of color-coded meshes.
     */
    colorMeshes: Map<string, THREE.InstancedMesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.InstancedMeshEventMap>>;
    /**
     * @deprecated use config.threshold instead.
     */
    get threshold(): number;
    /**
     * @deprecated use config.threshold instead.
     */
    set threshold(value: number);
    private _colorCodeMeshMap;
    private _meshIDColorCodeMap;
    private _currentVisibleMeshes;
    private _recentlyHiddenMeshes;
    private readonly _transparentMat;
    constructor(components: Components, world: World);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Adds a mesh to the culler. When the mesh is not visibile anymore, it will be removed from the scene. When it's visible again, it will be added to the scene.
     * @param mesh - The mesh to add. It can be a regular THREE.Mesh or an instance of THREE.InstancedMesh.
     */
    add(mesh: THREE.Mesh | THREE.InstancedMesh): void;
    /**
     * Removes a mesh from the culler, so its visibility is not controlled by the culler anymore.
     * When the mesh is removed, it will be hidden from the scene and its color-coded mesh will be destroyed.
     * @param mesh - The mesh to remove. It can be a regular THREE.Mesh or an instance of THREE.InstancedMesh.
     */
    remove(mesh: THREE.Mesh | THREE.InstancedMesh): void;
    /**
     * Updates the given instanced meshes inside the culler. You should use this if you change the count property, e.g. when changing the visibility of fragments.
     *
     * @param meshes - The meshes to update.
     *
     * @returns {void}
     */
    updateInstanced(meshes: Iterable<THREE.InstancedMesh>): void;
    private handleWorkerMessage;
    private getAvailableMaterial;
}
import * as WEBIFC from "web-ifc";
import * as THREE from "three";
export declare class Units {
    factor: number;
    complement: number;
    apply(matrix: THREE.Matrix4): void;
    setUp(webIfc: WEBIFC.IfcAPI): void;
    private getLengthUnits;
    private getScaleMatrix;
}
import * as WEBIFC from "web-ifc";
export type RelationsMap = Map<number, Map<number, number[]>>;
export interface ModelsRelationMap {
    [modelID: string]: RelationsMap;
}
/**
 * Type alias for an array of inverse attribute names.
 */
export type InverseAttributes = [
    "IsDecomposedBy",
    "Decomposes",
    "AssociatedTo",
    "HasAssociations",
    "ClassificationForObjects",
    "IsGroupedBy",
    "HasAssignments",
    "IsDefinedBy",
    "DefinesOcurrence",
    "IsTypedBy",
    "Types",
    "Defines",
    "ContainedInStructure",
    "ContainsElements",
    "HasControlElements",
    "AssignedToFlowElement",
    "ConnectedTo",
    "ConnectedFrom",
    "ReferencedBy",
    "Declares",
    "HasContext",
    "Controls",
    "IsNestedBy",
    "Nests",
    "DocumentRefForObjects"
];
export type InverseAttribute = InverseAttributes[number];
/**
 * Type alias for an array of IfcRelation types from WebIfc.
 */
export type IfcRelations = [
    typeof WEBIFC.IFCRELAGGREGATES,
    typeof WEBIFC.IFCRELASSOCIATESMATERIAL,
    typeof WEBIFC.IFCRELASSOCIATESCLASSIFICATION,
    typeof WEBIFC.IFCRELASSIGNSTOGROUP,
    typeof WEBIFC.IFCRELDEFINESBYPROPERTIES,
    typeof WEBIFC.IFCRELDEFINESBYTYPE,
    typeof WEBIFC.IFCRELDEFINESBYTEMPLATE,
    typeof WEBIFC.IFCRELCONTAINEDINSPATIALSTRUCTURE,
    typeof WEBIFC.IFCRELFLOWCONTROLELEMENTS,
    typeof WEBIFC.IFCRELCONNECTSELEMENTS,
    typeof WEBIFC.IFCRELASSIGNSTOPRODUCT,
    typeof WEBIFC.IFCRELDECLARES,
    typeof WEBIFC.IFCRELASSIGNSTOCONTROL,
    typeof WEBIFC.IFCRELNESTS,
    typeof WEBIFC.IFCRELASSOCIATESDOCUMENT
];
export type IfcRelation = IfcRelations[number];
export interface RelationsProcessingConfig {
    relationsToProcess: IfcRelation[];
}
/**
 * Interface definition of an Entities Related Event from the IfcRelationsIndexer. This event gets triggered when two or more entities has been related with each other.
 */
export interface EntitiesRelatedEvent {
    /** The type of the IFC relation. */
    relType: IfcRelation;
    /** The inverse attribute of the relation. */
    invAttribute: InverseAttribute;
    /** The IDs of the entities that are relating. */
    relatingIDs: number[];
    /** The IDs of the entities that are being related. */
    relatedIDs: number[];
}
export type IfcVersion = "IFC2X3" | "IFC4" | "IFC4X3_ADD2";
export type IDSFacetParameterName = "Name" | "PredefinedType" | "Value" | "System" | "URI" | "PropertySet" | "BaseName" | "DataType" | "Value" | "Entity" | "Relation";
export type IDSFacetType = "Entity" | "Attribute" | "Property" | "Classification" | "Material" | "PartOf";
export type IDSSimpleCardinality = "required" | "prohibited";
export type IDSConditionalCardinaltiy = IDSSimpleCardinality | "optional";
export interface IDSSimpleParameter {
    type: "simple";
    parameter: string | number | boolean;
}
export interface IDSEnumerationParameter {
    type: "enumeration";
    parameter: string[] | number[] | boolean[];
}
export interface IDSPatternParameter {
    type: "pattern";
    parameter: string;
}
export interface IDSBoundsParameter {
    type: "bounds";
    parameter: {
        min?: number;
        minInclusive?: boolean;
        max?: number;
        maxInclusive?: boolean;
    };
}
export interface IDSLengthParameter {
    type: "length";
    parameter: {
        min?: number;
        length?: number;
        max?: number;
    };
}
export type IDSRestrictionParameter = IDSEnumerationParameter | IDSPatternParameter | IDSBoundsParameter | IDSLengthParameter;
export type IDSFacetParameter = IDSSimpleParameter | IDSRestrictionParameter;
export interface IDSCheck {
    parameter: IDSFacetParameterName;
    currentValue: string | number | boolean | null;
    requiredValue: any;
    pass: boolean;
}
/**
 * Represents the result of a check performed by an IDSFacet test.
 */
export interface IDSCheckResult {
    guid?: string;
    expressID: number;
    pass: boolean;
    checks: IDSCheck[];
    cardinality: IDSConditionalCardinaltiy;
}
export interface IDSInfo {
    title: string;
    description?: string;
    copyright?: string;
    version?: string;
    author?: string;
    date?: Date;
    purpose?: string;
    milestone?: string;
}
export interface IDSSpecificationData {
    name: string;
    ifcVersion: Set<IfcVersion>;
    identifier: string;
    description?: string;
    instructions?: string;
    requirementsDescription?: string;
}
import { IfcFragmentSettings } from "../../IfcLoader/src";
/**
 * Settings for streaming properties. Extends {@link IfcFragmentSettings} to inherit common settings.
 */
export declare class PropertiesStreamingSettings extends IfcFragmentSettings {
    /**
     * Amount of properties to be streamed.
     * Defaults to 100 properties.
     */
    propertiesSize: number;
}
import * as FRAGS from "@thatopen/fragments";
import { Components } from "../../../core/Components";
import { DataSet } from "../../../core/Types";
import { IDSCheckResult, IDSSpecificationData, IfcVersion } from "./types";
import { IDSFacet } from "./facets";
/**
 * Represents a single specification from the Information Delivery Specification (IDS) standard.
 *
 * @remarks This class provides methods for testing a model against the specification,
 * as well as serializing the specification into XML format.
 */
export declare class IDSSpecification implements IDSSpecificationData {
    name: string;
    ifcVersion: Set<IfcVersion>;
    readonly identifier: string;
    description?: string;
    instructions?: string;
    requirementsDescription?: string;
    applicability: DataSet<IDSFacet>;
    requirements: DataSet<IDSFacet>;
    protected components: Components;
    constructor(components: Components, name: string, ifcVersion: IfcVersion[]);
    set(data: Partial<IDSSpecificationData>): this;
    /**
     * Tests the model to test against the specification's requirements.
     *
     * @param model - The model to be tested.
     * @returns An array representing the test results.
     * If no requirements are defined for the specification, an empty array is returned.
     */
    test(model: FRAGS.FragmentsGroup): Promise<IDSCheckResult[]>;
    /**
     * Serializes the IDSSpecification instance into XML format.
     *
     * @remarks This method is not meant to be used directly. It is used by the IDSSpecifications component.
     *
     * @returns The XML representation of the IDSSpecification.
     */
    serialize(): string;
}
import { Components } from "../../../../core/Components";
import { IDSFacet } from "../facets";
export declare const createAttributeFacets: (components: Components, elements: any) => IDSFacet[];
import { Components } from "../../../../core/Components";
import { IDSFacet } from "../facets";
export declare const createClassificationFacets: (components: Components, elements: any) => IDSFacet[];
import { Components } from "../../../../core/Components";
import { IDSFacet } from "../facets";
export declare const createEntityFacets: (components: Components, elements: any) => IDSFacet[];
import { Components } from "../../../core/Components";
import { Viewpoint } from "../../../core/Viewpoints";
import { Comment } from "./Comment";
import { BCFTopic } from "./types";
import { DataMap, DataSet } from "../../../core/Types";
export declare class Topic implements BCFTopic {
    /**
     * Default values for a BCF Topic, excluding 'guid', 'creationDate', and 'creationAuthor'.
     */
    static default: Omit<Partial<BCFTopic> & {
        title: string;
        type: string;
        status: string;
    }, "guid" | "creationDate" | "creationAuthor">;
    /**
     * A unique identifier for the topic.
     *
     * @remarks
     * The 'guid' is automatically generated upon topic creation and by no means it should change.
     */
    guid: string;
    title: string;
    creationDate: Date;
    creationAuthor: string;
    readonly viewpoints: DataSet<string>;
    readonly relatedTopics: DataSet<string>;
    readonly comments: DataMap<string, Comment>;
    customData: Record<string, any>;
    description?: string;
    serverAssignedId?: string;
    dueDate?: Date;
    modifiedAuthor?: string;
    modifiedDate?: Date;
    index?: number;
    private _type;
    set type(value: string);
    get type(): string;
    private _status;
    set status(value: string);
    get status(): string;
    private _priority?;
    set priority(value: string | undefined);
    get priority(): string | undefined;
    private _stage?;
    set stage(value: string | undefined);
    get stage(): string | undefined;
    private _assignedTo?;
    set assignedTo(value: string | undefined);
    get assignedTo(): string | undefined;
    private _labels;
    set labels(value: Set<string>);
    get labels(): Set<string>;
    private _components;
    private get _managerVersion();
    /**
     * Initializes a new instance of the 'Topic' class representing a BCF (BIM Collaboration Format) topic.
     * It provides methods and properties to manage and serialize BCF topics.
     *
     * @remarks
     * The default creationUser is the one set in BCFTopics.config.author
     * It should not be created manually. Better use BCFTopics.create().
     *
     * @param components - The 'Components' instance that provides access to other components and services.
     */
    constructor(components: Components);
    /**
     * Sets properties of the BCF Topic based on the provided data.
     *
     * @remarks
     * This method iterates over the provided 'data' object and updates the corresponding properties of the BCF Topic.
     * It skips the 'guid' property as it should not be modified.
     *
     * @param data - An object containing the properties to be updated.
     * @returns The topic
     *
     * @example
     * '''typescript
     * const topic = new Topic(components);
     * topic.set({
     *   title: "New BCF Topic Title",
     *   description: "This is a new description.",
     *   status: "Resolved",
     * });
     * '''
     */
    set(data: Partial<BCFTopic>): this;
    /**
     * Creates a new comment associated with the current topic.
     *
     * @param text - The text content of the comment.
     * @param viewpoint - (Optional) The viewpoint associated with the comment.
     *
     * @returns The newly created comment.
     *
     * @example
     * '''typescript
     * const viewpoint = viewpoints.create(world); // Created with an instance of Viewpoints
     * const topic = topics.create(); // Created with an instance of BCFTopics
     * topic.viewpoints.add(viewpoint);
     * const comment = topic.createComment("This is a new comment", viewpoint);
     * '''
     */
    createComment(text: string, viewpoint?: Viewpoint): Comment;
    private createLabelTags;
    private createCommentTags;
    private createViewpointTags;
    private createRelatedTopicTags;
    /**
     * Serializes the BCF Topic instance into an XML string representation based on the official schema.
     *
     * @remarks
     * This method constructs an XML string based on the properties of the BCF Topic instance.
     * It includes the topic's guid, type, status, creation date, creation author, priority, index,
     * modified date, modified author, due date, assigned to, description, stage, labels, related topics,
     * comments, and viewpoints.
     *
     * @returns A string representing the XML serialization of the BCF Topic.
     *
     * @example
     * '''typescript
     * const topic = bcfTopics.create(); // Created with an instance of BCFTopics
     * const xml = topic.serialize();
     * console.log(xml);
     * '''
     */
    serialize(): string;
}
export type BCFVersion = "2.1" | "3";
export interface BCFTopic {
    guid: string;
    serverAssignedId?: string;
    type: string;
    status: string;
    title: string;
    priority?: string;
    index?: number;
    labels: Set<string>;
    creationDate: Date;
    creationAuthor: string;
    modifiedDate?: Date;
    modifiedAuthor?: string;
    dueDate?: Date;
    assignedTo?: string;
    description?: string;
    stage?: string;
}
import { Topic } from "..";
import { Viewpoint } from "../../../core/Viewpoints";
import { Components } from "../../../core/Components";
/**
 * Represents a comment in a BCF Topic.
 */
export declare class Comment {
    date: Date;
    author: string;
    guid: string;
    viewpoint?: Viewpoint;
    modifiedAuthor?: string;
    modifiedDate?: Date;
    topic?: Topic;
    private _components;
    private _comment;
    /**
     * Sets the comment text and updates the modified date and author.
     * The author will be the one defined in BCFTopics.config.author
     * @param value - The new comment text.
     */
    set comment(value: string);
    /**
     * Gets the comment text.
     * @returns The comment text.
     */
    get comment(): string;
    /**
     * Constructs a new BCF Topic Comment instance.
     * @param components - The Components instance.
     * @param text - The initial comment text.
     */
    constructor(components: Components, text: string);
    /**
     * Serializes the Comment instance into a BCF compliant XML string.
     *
     * @returns A string representing the Comment in BCFv2 XML format.
     */
    serialize(): string;
}
import { BCFTopics, BCFVersion } from "../index";
import { BooleanSettingsControl, Configurator, SelectSettingControl, TextSetSettingControl, TextSettingsControl } from "../../../core";
/**
 * Configuration settings for managing BCF topics. This interface defines the properties and their meanings used to control the behavior of exporting and importing BCF topics.
 */
export interface BCFTopicsConfig {
    /**
     * The BCF version used during export.
     */
    version: BCFVersion;
    /**
     * The email of the user creating topics using this component.
     */
    author: string;
    /**
     * The set of allowed topic types. This is exported inside the
     * [bcf.extensions](https://github.com/buildingSMART/BCF-XML/tree/release_3_0/Documentation#bcf-file-structure).
     */
    types: Set<string>;
    /**
     * The set of allowed topic statuses. This is exported inside the
     * [bcf.extensions](https://github.com/buildingSMART/BCF-XML/tree/release_3_0/Documentation#bcf-file-structure).
     */
    statuses: Set<string>;
    /**
     * The set of allowed topic priorities. This is exported inside the
     * [bcf.extensions](https://github.com/buildingSMART/BCF-XML/tree/release_3_0/Documentation#bcf-file-structure).
     */
    priorities: Set<string>;
    /**
     * The set of allowed topic labels. This is exported inside the
     * [bcf.extensions](https://github.com/buildingSMART/BCF-XML/tree/release_3_0/Documentation#bcf-file-structure).
     */
    labels: Set<string>;
    /**
     * The set of allowed topic stages. This is exported inside the
     * [bcf.extensions](https://github.com/buildingSMART/BCF-XML/tree/release_3_0/Documentation#bcf-file-structure).
     */
    stages: Set<string>;
    /**
     * The set of allowed topic users. This is exported inside the
     * [bcf.extensions](https://github.com/buildingSMART/BCF-XML/tree/release_3_0/Documentation#bcf-file-structure).
     */
    users: Set<string>;
    /**
     * Whether or not to include the AuthoringSoftwareId in the viewpoint components during export.
     */
    includeSelectionTag: boolean;
    /**
     * Updates the types, statuses, users, etc., after importing an external BCF.
     */
    updateExtensionsOnImport: boolean;
    /**
     * Only allow to use the extensions (types, statuses, etc.) defined in the config when setting the corresponding data in a topic.
     */
    strict: boolean;
    /**
     * If true, export the extensions (types, status, etc.) based on topics data. This doesn't update the extensions in the config.
     * If false, only export the extensions defined in each collection of possibilities set in the config.
     * In all cases, all the values from each collection of extensions defined in the config are going to be exported.
     */
    includeAllExtensionsOnExport: boolean;
    /**
     * Version to be used when importing if no bcf.version file is present in the incoming data.
     * When null, the importer will throw an error if the version is missing or is not supported.
     */
    fallbackVersionOnImport: BCFVersion | null;
    /**
     * If true, do not import a topic with missing information (guid, type, status, title, creationDate or creationAuthor).
     * If false, use default values for missing data.
     */
    ignoreIncompleteTopicsOnImport: boolean;
}
type BCFTopicsConfigType = {
    version: SelectSettingControl;
    author: TextSettingsControl;
    types: TextSetSettingControl;
    statuses: TextSetSettingControl;
    priorities: TextSetSettingControl;
    labels: TextSetSettingControl;
    stages: TextSetSettingControl;
    users: TextSetSettingControl;
    includeSelectionTag: BooleanSettingsControl;
    updateExtensionsOnImport: BooleanSettingsControl;
    strict: BooleanSettingsControl;
    includeAllExtensionsOnExport: BooleanSettingsControl;
    fallbackVersionOnImport: SelectSettingControl;
    ignoreIncompleteTopicsOnImport: BooleanSettingsControl;
};
export declare class BCFTopicsConfigManager extends Configurator<BCFTopics, BCFTopicsConfigType> {
    protected _config: BCFTopicsConfigType;
    get version(): string;
    set version(value: string);
    get author(): string;
    set author(value: string);
    get types(): Set<string>;
    set types(value: Set<string>);
    get statuses(): Set<string>;
    set statuses(value: Set<string>);
    get priorities(): Set<string>;
    set priorities(value: Set<string>);
    get labels(): Set<string>;
    set labels(value: Set<string>);
    get stages(): Set<string>;
    set stages(value: Set<string>);
    get users(): Set<string>;
    set users(value: Set<string>);
    get includeSelectionTag(): boolean;
    set includeSelectionTag(value: boolean);
    get updateExtensionsOnImport(): boolean;
    set updateExtensionsOnImport(value: boolean);
    get strict(): boolean;
    set strict(value: boolean);
    get includeAllExtensionsOnExport(): boolean;
    set includeAllExtensionsOnExport(value: boolean);
    get fallbackVersionOnImport(): string;
    set fallbackVersionOnImport(value: string);
    get ignoreIncompleteTopicsOnImport(): boolean;
    set ignoreIncompleteTopicsOnImport(value: boolean);
}
export {};
import { IDSFacetParameter } from "../types";
export declare const getParameterValue: (property: any) => IDSFacetParameter | undefined;
/**
 * A rule for the {@link IfcFinder} to search items based on their category.
 */
export interface IfcCategoryRule {
    /**
     * The type of this rule. All rules have a fixed type.
     */
    type: "category";
    /**
     * The category value. It's a regular expression, so you can make complex queries and use ".*" to match all categories.
     */
    value: RegExp;
}
/**
 * A rule for the {@link IfcFinder} to search items based on the properties defined in their property sets.
 */
export interface IfcPropertyRule {
    /**
     * The type of this rule. All rules have a fixed type.
     */
    type: "property";
    /**
     * The name of the property. It's a regular expression, so you can make complex queries and use ".*" to match all names.
     */
    name: RegExp;
    /**
     * The value of the property. It's a regular expression, so you can make complex queries and use ".*" to match all values.
     */
    value: RegExp;
}
/**
 * A rule for the {@link IfcFinder} to search items based on the value of a numeric property defined in their property sets.
 */
export interface IfcOperatorRule {
    /**
     * The type of this rule. All rules have a fixed type.
     */
    type: "operator";
    /**
     * The name of the property. It's a regular expression, so you can make complex queries and use ".*" to match all names.
     */
    name: RegExp;
    /**
     * The value of the property.
     */
    value: number;
    /**
     * The operator to apply to the numeric value.
     */
    operator: "<" | ">" | "=" | "<=" | ">=";
}
/**
 * The type of rules that can be used in the queries of the {@link IfcFinder}.
 */
export type IfcFinderRule = IfcCategoryRule | IfcPropertyRule | IfcOperatorRule;
/**
 * The data type used when the queries of the {@link IfcFinder} export or import query data to persist it.
 */
export type SerializedQuery = {
    /**
     * {@link IfcFinderQuery.name}
     */
    name: string;
    /**
     * {@link IfcFinderQuery.inclusive}
     */
    inclusive: boolean;
    /**
     * The type of query.
     */
    type: string;
    /**
     * {@link IfcFinderQuery.ids}
     */
    ids: {
        [modelID: string]: number[];
    };
    /**
     * {@link IfcFinderQuery.rules}
     */
    rules: {
        [key: string]: any;
    }[];
};
import * as FRAGS from "@thatopen/fragments";
import { IfcFinderRule, SerializedQuery } from "./types";
import { Components, Event } from "../../../core";
/**
 * The base class for all queries used by the {@link IfcFinder}.
 */
export declare abstract class IfcFinderQuery {
    /**
     * The list of functions to import the queries. If you create your own custom query, you should add its importer here. See the other queries provided by the library for reference.
     */
    static importers: Map<string, (components: Components, data: any) => IfcFinderQuery>;
    /**
     * Event used to notify the progress when performing a query on an IFC file.
     */
    readonly onProgress: Event<number>;
    /**
     * A name given to the instance of the query to identify it.
     */
    abstract name: string;
    /**
     * The list of IFC items that this query found across all models.
     */
    abstract items: FRAGS.FragmentIdMap;
    /**
     * If false, ALL rules of the query must comply to make a match. If true, ANY rule will be enough to make a match.
     */
    inclusive: boolean;
    /**
     * The list of rules to be applied by this query.
     */
    rules: IfcFinderRule[];
    /**
     * The IDs of the match items per model.
     */
    ids: {
        [modelID: string]: Set<number>;
    };
    /**
     * Whether this query is up to date or not per file. If not, when updating the group where it belongs, it will re-process the given file.
     */
    needsUpdate: Map<string, boolean>;
    /**
     * Export the current data of this query in a serializable object to persist it over time.
     */
    abstract export(): {
        [key: string]: any;
    };
    /**
     * Perform the search in the given file and save the result.
     */
    abstract update(modelID: string, file: File): Promise<void>;
    protected components: Components;
    protected abstract findInLines(modelID: string, lines: string[]): void;
    protected constructor(components: Components);
    /**
     * Imports a query given its data. This data can be generating using its {@link IfcFinderQuery.export} method.
     *
     * @param components the instance of {@link Components} used by this app.
     * @param data the data of the query to import as a serializable object.
     */
    static import(components: Components, data: {
        [id: string]: any;
    }): IfcFinderQuery | null;
    /**
     * Imports the given serialized rules. Only use this when writing your own custom query. See the other queries provided by the library for reference.
     *
     * @param serializedRules the rules to be parsed.
     */
    static importRules(serializedRules: {
        [key: string]: any;
    }[]): IfcFinderRule[];
    /**
     * Imports the given IDs. Only use this when writing your own custom query. See the other queries provided by the library for reference.
     *
     * @param data the serialized object representing the query whose IDs to parse.
     */
    static importIds(data: SerializedQuery): {
        [modelID: string]: Set<number>;
    };
    /**
     * Clears the data of the given model. If not specified, clears all the data.
     *
     * @param modelID ID of the model whose data to clear.
     */
    clear(modelID?: string): void;
    protected addID(modelID: string, id: number): void;
    protected getData(): SerializedQuery;
    protected exportRules(): {
        [key: string]: any;
    }[];
    protected findInFile(modelID: string, file: File): Promise<void>;
    protected getIdFromLine(line: string): number;
    protected testRules(line: string): boolean;
    protected getCategoryFromLine(line: string): string | null;
    protected getAttributesFromLine(line: string): string[] | null;
}
import * as FRAGS from "@thatopen/fragments";
import { IfcFinderQuery } from "./ifc-finder-query";
import { IfcOperatorRule, IfcPropertyRule, SerializedQuery } from "./types";
import { Components } from "../../../core";
/**
 * A query that checks the properties in the property sets assigned to IFC items.
 */
export declare class IfcPropertyQuery extends IfcFinderQuery {
    /**
     * {@link IfcFinderQuery.name}
     */
    name: string;
    /**
     * The type of this query.
     */
    static type: "IfcPropertyQuery";
    private psets;
    /**
     * {@link IfcFinderQuery.items}
     */
    get items(): FRAGS.FragmentIdMap;
    constructor(components: Components, data: {
        name: string;
        inclusive: boolean;
        rules: (IfcPropertyRule | IfcOperatorRule)[];
    });
    /**
     * {@link IfcFinderQuery.export}
     */
    export(): SerializedQuery;
    /**
     * {@link IfcFinderQuery.update}
     */
    update(modelID: string, file: File): Promise<void>;
    protected findInLines(modelID: string, lines: string[]): void;
}
import { IfcRelName } from "./types";
type IfcRelAttributePosition = {
    related: number;
    relating: number;
};
export declare const ifcRelAttrsPosition: Record<IfcRelName, IfcRelAttributePosition>;
export {};
import * as FRAGS from "@thatopen/fragments";
import { IfcFinderRule, SerializedQuery } from "./types";
import { IfcFinderQuery } from "./ifc-finder-query";
import { Components } from "../../../core";
/**
 * A query that checks the direct attributes of IFC items.
 */
export declare class IfcBasicQuery extends IfcFinderQuery {
    /**
     * {@link IfcFinderQuery.name}
     */
    name: string;
    /**
     * The type of this query.
     */
    static type: "IfcBasicQuery";
    /**
     * {@link IfcFinderQuery.items}
     */
    get items(): FRAGS.FragmentIdMap;
    constructor(components: Components, data: {
        name: string;
        rules: IfcFinderRule[];
        inclusive: boolean;
    });
    /**
     * {@link IfcFinderQuery.export}
     */
    export(): SerializedQuery;
    /**
     * {@link IfcFinderQuery.update}
     */
    update(modelID: string, file: File): Promise<void>;
    protected findInLines(modelID: string, lines: string[]): void;
}
import { IfcRelName } from "./types";
import { IfcRelation } from "../../IfcRelationsIndexer";
export declare const ifcRelClassNames: Record<IfcRelation, IfcRelName>;
export type IfcRelationNames = [
    "IfcRelAssignsToControl",
    "IfcRelAssignsToGroup",
    "IfcRelAssignsToProduct",
    "IfcRelAssociatesClassification",
    "IfcRelAssociatesMaterial",
    "IfcRelAssociatesDocument",
    "IfcRelContainedInSpatialStructure",
    "IfcRelFlowControlElements",
    "IfcRelConnectsElements",
    "IfcRelDeclares",
    "IfcRelAggregates",
    "IfcRelNests",
    "IfcRelDefinesByProperties",
    "IfcRelDefinesByType",
    "IfcRelDefinesByTemplate"
];
export type IfcRelName = IfcRelationNames[number];
import { BooleanSettingsControl, NumberSettingControl } from "../../Types";
import { Configurator } from "../../ConfigManager";
import { CullerRenderer } from "../index";
type CullerRendererConfigType = {
    enabled: BooleanSettingsControl;
    width: NumberSettingControl;
    height: NumberSettingControl;
    updateInterval: NumberSettingControl;
    autoUpdate: BooleanSettingsControl;
    renderDebugFrame: BooleanSettingsControl;
    threshold: NumberSettingControl;
};
/**
 * Configuration interface for the {@link CullerRenderer}.
 */
export interface CullerRendererConfig {
    /**
     * Whether the culler renderer should make renders or not.
     */
    enabled: boolean;
    /**
     * Width of the render target used for visibility checks.
     */
    width: number;
    /**
     * Height of the render target used for visibility checks.
     * Default value is 512.
     */
    height: number;
    /**
     * Whether the visibility check should be performed automatically.
     * Default value is true.
     */
    autoUpdate: boolean;
    /**
     * Interval in milliseconds at which the visibility check should be performed.
     */
    updateInterval: number;
    /**
     * Whether to render the frame use to debug the culler behavior.
     */
    renderDebugFrame: boolean;
    /**
     * Pixels in screen a geometry must occupy to be considered "seen".
     * Default value is 100.
     */
    threshold: number;
}
/**
 * Settings to configure the CullerRenderer.
 */
export declare class CullerRendererConfigManager extends Configurator<CullerRenderer, CullerRendererConfigType> {
    protected _config: CullerRendererConfigType;
    private _interval;
    get enabled(): boolean;
    set enabled(value: boolean);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get autoUpdate(): boolean;
    set autoUpdate(value: boolean);
    get updateInterval(): number;
    set updateInterval(value: number);
    get renderDebugFrame(): boolean;
    set renderDebugFrame(value: boolean);
    get threshold(): number;
    set threshold(value: number);
    setWidthHeight(width: number, height: number): void;
    setAutoAndInterval(auto: boolean, interval: number): void;
    private resetRenderTarget;
    private resetInterval;
}
export {};
import * as FRAGS from "@thatopen/fragments";
import { IDSCheckResult, IDSFacetParameter } from "../types";
import { Components } from "../../../../core/Components";
import { IDSFacet } from "./Facet";
export declare class IDSAttribute extends IDSFacet {
    facetType: "Attribute";
    name: IDSFacetParameter;
    value?: IDSFacetParameter;
    constructor(components: Components, name: IDSFacetParameter);
    serialize(type: "applicability" | "requirement"): string;
    getEntities(): Promise<never[]>;
    test(entities: FRAGS.IfcProperties): Promise<IDSCheckResult[]>;
}
import * as FRAGS from "@thatopen/fragments";
import { Components } from "../../../../core/Components";
import { IDSCheckResult, IDSFacetParameter } from "../types";
import { IDSFacet } from "./Facet";
export declare class IDSClassification extends IDSFacet {
    facetType: "Classification";
    system: IDSFacetParameter;
    value?: IDSFacetParameter;
    uri?: string;
    constructor(components: Components, system: IDSFacetParameter);
    serialize(type: "applicability" | "requirement"): string;
    getEntities(model: FRAGS.FragmentsGroup, collector?: FRAGS.IfcProperties): Promise<number[]>;
    test(entities: FRAGS.IfcProperties, model: FRAGS.FragmentsGroup): Promise<IDSCheckResult[]>;
    private processReferencedSource;
    private getSystems;
    private getSystemName;
    private getAllReferenceIdentifications;
    private evalSystem;
    private evalValue;
    private evalURI;
}
import * as FRAGS from "@thatopen/fragments";
import { Components } from "../../../../core/Components";
import { IDSFacet } from "./Facet";
import { IDSCheck, IDSCheckResult, IDSFacetParameter } from "../types";
export declare class IDSEntity extends IDSFacet {
    facetType: "Entity";
    name: IDSFacetParameter;
    predefinedType?: IDSFacetParameter;
    constructor(components: Components, name: IDSFacetParameter);
    serialize(type: "applicability" | "requirement"): string;
    getEntities(model: FRAGS.FragmentsGroup, collector?: FRAGS.IfcProperties): Promise<number[]>;
    test(entities: FRAGS.IfcProperties, model: FRAGS.FragmentsGroup): Promise<IDSCheckResult[]>;
    protected evalName(attrs: any, checks?: IDSCheck[]): Promise<boolean>;
    protected evalPredefinedType(model: FRAGS.FragmentsGroup, attrs: any, checks?: IDSCheck[]): Promise<boolean | null>;
}
import * as FRAGS from "@thatopen/fragments";
import { IDSCheckResult, IDSFacetParameter } from "../types";
import { Components } from "../../../../core/Components";
import { IDSFacet } from "./Facet";
export declare class IDSProperty extends IDSFacet {
    facetType: "Property";
    propertySet: IDSFacetParameter;
    baseName: IDSFacetParameter;
    value?: IDSFacetParameter;
    dataType?: string;
    uri?: string;
    private _unsupportedTypes;
    constructor(components: Components, propertySet: IDSFacetParameter, baseName: IDSFacetParameter);
    serialize(type: "applicability" | "requirement"): string;
    getEntities(model: FRAGS.FragmentsGroup, collector?: FRAGS.IfcProperties): Promise<never[]>;
    test(entities: FRAGS.IfcProperties, model: FRAGS.FragmentsGroup): Promise<IDSCheckResult[]>;
    private getItemsAttrName;
    private getValueKey;
    private simplifyPset;
    private getTypePsets;
    private getPsets;
    private evalValue;
    private evalDataType;
    private evalURI;
}
import { BCFTopics } from "../..";
export declare const extensionsImporter: (manager: BCFTopics, extensionsXML: string) => void;
import * as FRAGS from "@thatopen/fragments";
import { Components } from "../../../../core/Components";
import { IDSFacetParameter, IDSCheckResult, IDSFacetParameterName, IDSCheck, IDSConditionalCardinaltiy, IDSSimpleCardinality, IDSFacetType } from "../types";
export declare abstract class IDSFacet {
    protected components: Components;
    abstract facetType: IDSFacetType;
    cardinality: IDSSimpleCardinality | IDSConditionalCardinaltiy;
    instructions?: string;
    constructor(components: Components);
    protected addCheckResult(check: IDSCheck, checks: IDSCheck[]): void;
    protected evalRequirement: (value: string | number | boolean | null, facetParameter: IDSFacetParameter, parameter: IDSFacetParameterName, checks?: IDSCheck[]) => boolean;
    protected testResult: IDSCheckResult[];
    protected saveResult(attrs: any, pass: boolean): void;
    /**
     * Returns the list of expressIDs that pass the criteria of this facet.
     * @param model - The IFC model to retrieve entities from.
     * @param collector - An optional object to collect the retrieved entities.
     * @remarks
     * If the collector already includes the entity, it won't get processed any further.
     *
     * @returns An array of express IDs of the retrieved entities.
     */
    abstract getEntities(model: FRAGS.FragmentsGroup, collector: FRAGS.IfcProperties): Promise<number[]>;
    abstract test(entities: FRAGS.IfcProperties, model?: FRAGS.FragmentsGroup): Promise<IDSCheckResult[]>;
    abstract serialize(type: "applicability" | "requirement"): string;
}
import { BufferGeometry } from "three";
import * as THREE from "three";
export declare class TransformHelper {
    getHelper(geometries: BufferGeometry[]): THREE.Object3D<THREE.Object3DEventMap>;
}
declare const actual: {
    186: {
        7: number[];
    };
    250: {
        8: number[];
    };
    253: {
        8: number[];
    };
    257: {
        8: number[];
    };
};
declare const newVersion: {
    186: {
        7: ({
            259: number[];
            263?: undefined;
            266?: undefined;
        } | {
            263: number[];
            259?: undefined;
            266?: undefined;
        } | {
            266: number[];
            259?: undefined;
            263?: undefined;
        })[];
    };
    190: {
        7: {
            259: number[];
        }[];
    };
    250: {
        8: {
            259: number[];
        }[];
    };
};
interface V2Schema {
    [expressID: number]: {
        [invAttrIndex: number]: {
            [IfcRelationship: number]: number[];
        };
    };
}
type RelationsMap = Map<number, Map<number, {
    [ifcRel: number]: number[];
}>>;
import { IDSFacetParameter } from "../types";
import { IDSFacet } from "./Facet";
export declare class IdsMaterialFacet extends IDSFacet {
    facetType: "Material";
    value?: IDSFacetParameter;
    uri?: string;
    serialize(type: "applicability" | "requirement"): string;
    getEntities(): Promise<number[]>;
    test(): Promise<import("../types").IDSCheckResult[]>;
}
import * as FRAGS from "@thatopen/fragments";
import { Components } from "../../../../core/Components";
import { IDSFacet } from "./Facet";
import { IDSFacetParameter, IDSSimpleCardinality } from "../types";
export declare class IDSPartOf extends IDSFacet {
    facetType: "PartOf";
    private _entityFacet;
    private _entity;
    set entity(value: {
        name: IDSFacetParameter;
        predefinedType?: IDSFacetParameter;
    });
    get entity(): {
        name: IDSFacetParameter;
        predefinedType?: IDSFacetParameter;
    };
    relation?: number;
    cardinality: IDSSimpleCardinality;
    constructor(components: Components, entity: {
        name: IDSFacetParameter;
        predefinedType?: IDSFacetParameter;
    });
    serialize(): string;
    getEntities(model: FRAGS.FragmentsGroup, collector?: FRAGS.IfcProperties): Promise<number[]>;
    test(entities: FRAGS.IfcProperties, model: FRAGS.FragmentsGroup): Promise<import("../types").IDSCheckResult[]>;
}
import { IDSFacetParameterName, IDSFacetParameter } from "../types";
export declare const getParameterXML: (name: IDSFacetParameterName, parameter?: IDSFacetParameter) => string;

}