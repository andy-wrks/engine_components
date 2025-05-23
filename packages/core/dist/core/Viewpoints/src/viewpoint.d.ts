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
     *                      Default value is `true`.
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
     * This function iterates through the `componentColors` map, retrieves the fragment IDs
     * corresponding to each color, and then uses the `Classifier` to apply the color to those fragments.
     *
     * @remarks
     * The color is applied using the `Classifier.setColor` method, which sets the color of the specified fragments.
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
