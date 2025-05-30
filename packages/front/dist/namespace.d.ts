declare namespace OBC {
import * as OBC from "@thatopen/components";
import { CivilNavigator } from "../CivilNavigator";
/**
 * This component is responsible for navigating and visualizing plan data of infra/civil models (horizontal alignments). 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/CivilPlanNavigator). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/CivilPlanNavigator).
 */
export declare class CivilPlanNavigator extends CivilNavigator {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "3096dea0-5bc2-41c7-abce-9089b6c9431b";
    /**
     * The view mode of the component.
     * In this case, the view mode is set to "horizontal".
     */
    readonly view = "horizontal";
    private planHighlighter?;
    /**
     * Getter for the world property.
     * Returns the world associated with the CivilPlanNavigator instance.
     */
    get world(): OBC.World | null;
    /**
     * Setter for the world property.
     * Sets the world associated with the CivilPlanNavigator instance.
     * If a new world is provided, the existing PlanHighlighter instance is disposed and a new one is created.
     * @param world - The new world to be associated with the CivilPlanNavigator instance.
     */
    set world(world: OBC.World | null);
    constructor(components: OBC.Components);
}
import * as OBC from "@thatopen/components";
import { CivilNavigator } from "../CivilNavigator";
/**
 * This component is responsible for navigating and visualizing elevation data of infra/civil models (vertical alignments). 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/CivilElevationNavigator). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/CivilElevationNavigator).
 */
export declare class CivilElevationNavigator extends CivilNavigator {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "097eea29-2d5a-431a-a247-204d44670621";
    /** {@link OBC.Component.enabled} */
    enabled: boolean;
    readonly view = "vertical";
    /**
     * Getter for the world property.
     * This property is used to retrieve the world context for the component.
     *
     * @returns {OBC.World | null} - The current world context for the component.
     * If null, it means the world has not been set yet.
     */
    get world(): OBC.World | null;
    /**
     * Sets the world for the CivilElevationNavigator.
     * This property is used to manage the world context for the component.
     * When the world is set, it triggers the addition of elevation markers to the scene.
     *
     * @param world - The world to set for the component. If null, it will not update the world.
     */
    set world(world: OBC.World | null);
    constructor(components: OBC.Components);
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";
import { CurveHighlighter } from "../CivilNavigator/src/curve-highlighter";
import { CivilMarkerType } from "../CivilNavigator";
import { Mark } from "../../core";
/**
 * This component provides functionality for navigating and interacting with civil engineering data in a 3D environment. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/Civil3DNavigator). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/Civil3DNavigator).
 *
 */
export declare class Civil3DNavigator extends OBC.Component {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "0a59c09e-2b49-474a-9320-99f51f40f182";
    /**
     * Event triggered when a curve is highlighted.
     * Provides information about the highlighted curve, point, and index.
     */
    readonly onHighlight: OBC.Event<{
        curve: FRAGS.CurveMesh;
        point: THREE.Vector3;
        index: number;
    }>;
    /**
     * Event triggered when a marker (point) on a curve changes.
     * Provides information about the alignment, percentage, type of marker, and the curve.
     */
    readonly onMarkerChange: OBC.Event<{
        alignment: FRAGS.AlignmentObject;
        percentage: number;
        type: CivilMarkerType;
        curve: FRAGS.CivilCurve;
    }>;
    /**
     * Event triggered when a marker (point) on a curve is hidden.
     * Provides information about the type of marker.
     */
    readonly onMarkerHidden: OBC.Event<{
        type: CivilMarkerType;
    }>;
    /** {@link OBC.Component.enabled} */
    enabled: boolean;
    mouseMarkers?: {
        hover: Mark;
        select: Mark;
    };
    private _highlighter?;
    private _curves;
    private _world;
    /**
     * Getter for the world property.
     * Returns the current world instance.
     * @returns {OBC.World | null} The current world instance or null if not set.
     */
    get world(): OBC.World | null;
    /**
     * Setter for the world property.
     * Sets the world instance and initializes the component.
     * @param {OBC.World | null} world - The new world instance or null to clear the current world.
     */
    set world(world: OBC.World | null);
    /**
     * Getter for the highlighter property.
     * Returns the curve highlighter instance.
     * @returns {CurveHighlighter} The curve highlighter instance.
     * @throws {Error} If the navigator is not initialized.
     */
    get highlighter(): CurveHighlighter;
    constructor(components: OBC.Components);
    /**
     * Draws the civil engineering data onto the 3D scene.
     *
     * @param model - The FragmentsGroup containing the civil data to be drawn.
     * @throws Will throw an error if the model does not have civil data or if the world is not set.
     */
    draw(model: FRAGS.FragmentsGroup): void;
    /**
     * Sets a marker at a specific percentage along the given alignment.
     *
     * @param alignment - The alignment on which to place the marker.
     * @param percentage - The percentage along the alignment where the marker should be placed.
     * @param type - The type of marker to be set.
     *
     * @throws Will throw an error if the mouse markers have not been initialized.
     *         This can happen if the world has not been set before using this method.
     *
     * @remarks
     * This method calculates the 3D point at the given percentage along the alignment,
     * sets the marker at that point, and makes the marker visible.
     *
     * @example
     * '''typescript
     * const navigator = new Civil3DNavigator(components);
     * navigator.world = world; // Initialize the world
     * const alignment = model.civilData.alignments.get(alignmentId);
     * if (alignment) {
     *   navigator.setMarker(alignment, 0.5, "select");
     * }
     * '''
     */
    setMarker(alignment: FRAGS.AlignmentObject, percentage: number, type: CivilMarkerType): void;
    /**
     * Hides the marker of the specified type.
     *
     * @param type - The type of marker to hide.
     *
     * @throws Will throw an error if the mouse markers have not been initialized.
     *         This can happen if the world has not been set before using this method.
     *
     * @remarks
     * This method hides the marker of the specified type by setting its visibility to false.
     *
     * @example
     * '''typescript
     * const navigator = new Civil3DNavigator(components);
     * navigator.world = world; // Initialize the world
     * navigator.hideMarker("select");
     * '''
     */
    hideMarker(type: CivilMarkerType): void;
    private newMouseMarker;
    private setupEvents;
    private updateLinesResolution;
    private onClick;
    private onMouseMove;
    private updateMarker;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";
import { FragmentsGroup } from "@thatopen/fragments";
import { CurveHighlighter } from "./src/curve-highlighter";
import { Mark } from "../../core";
/**
 * Represents the type of markers used in the CivilMarkerType class.
 */
export type CivilMarkerType = "hover" | "select";
/**
 * Abstract class representing a Civil Navigator. It provides functionality to navigate and interact with civil engineering data.
 */
export declare abstract class CivilNavigator extends OBC.Component implements OBC.Disposable {
    /**
     * The view mode for the navigator.
     * Can be either "horizontal" or "vertical".
     */
    abstract view: "horizontal" | "vertical";
    /**
     * Event triggered when a curve is highlighted.
     * Provides the point of intersection and the corresponding curve mesh.
     */
    readonly onHighlight: OBC.Event<{
        point: THREE.Vector3;
        mesh: FRAGS.CurveMesh;
    }>;
    /**
     * Event triggered when a marker (hover or select) is placed on a curve.
     * Provides the alignment, percentage, type of marker, and the corresponding curve.
     */
    readonly onMarkerChange: OBC.Event<{
        alignment: FRAGS.AlignmentObject;
        percentage: number;
        type: CivilMarkerType;
        curve: FRAGS.CivilCurve;
    }>;
    /**
     * Event triggered when a marker (hover or select) is hidden.
     * Provides the type of marker.
     */
    readonly onMarkerHidden: OBC.Event<{
        type: CivilMarkerType;
    }>;
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /** {@link OBC.Component.enabled} */
    enabled: boolean;
    /**
     * Mouse markers for hover and select actions.
     * They are of type Mark and are optional.
     */
    mouseMarkers?: {
        hover: Mark;
        select: Mark;
    };
    private _curves;
    private _previousAlignment;
    protected _highlighter?: CurveHighlighter;
    protected _world: OBC.World | null;
    /**
     * Getter for the highlighter instance.
     * Throws an error if the highlighter is not initialized.
     *
     * @returns {CurveHighlighter} The initialized highlighter instance.
     */
    get highlighter(): CurveHighlighter;
    /**
     * Getter for the world instance.
     *
     * @returns {OBC.World | null} The current world instance or null if not set.
     */
    get world(): OBC.World | null;
    /**
     * Setter for the world instance.
     * If the new world is the same as the current one, it does nothing.
     * If the current world is set, it removes the event listeners.
     * If the new world is not set, it does nothing.
     *
     * @param {OBC.World | null} world - The new world instance or null to unset.
     */
    set world(world: OBC.World | null);
    protected constructor(components: OBC.Components);
    /**
     * Draws the civil curves from the provided model onto the scene.
     *
     * @param model - The FragmentsGroup containing the civil data to be drawn.
     * @param filter - An optional Iterable of alignments to filter the curves to be drawn.
     *
     * @throws Will throw an error if the provided model doesn't have civil data or if no world was given for this navigator.
     *
     * @returns {Promise<void>} - A promise that resolves when the curves have been drawn onto the scene.
     */
    draw(model: FragmentsGroup, filter?: Iterable<FRAGS.AlignmentObject>): Promise<void>;
    /** {@link OBC.Disposable.dispose} */
    dispose(): Promise<void>;
    /**
     * Clears the civil curves from the scene.
     * Removes all the curve meshes from the scene and clears the internal array of curve meshes.
     * Also unselects and unhovers the highlighter.
     */
    clear(): void;
    /**
     * Sets a marker on a specific curve at a given percentage.
     *
     * @param alignment - The alignment where the marker should be placed.
     * @param percentage - The percentage along the alignment where the marker should be placed.
     * @param type - The type of marker to be placed (hover or select).
     *
     * @throws Will throw an error if there are no curves to place the marker on.
     */
    setMarker(alignment: FRAGS.AlignmentObject, percentage: number, type: CivilMarkerType): void;
    /**
     * Sets the definition segments and slope from the provided segments array.
     *
     * @param segmentsArray - An array of segments, where each segment is an array of numbers representing points.
     *
     * @returns An object containing the definition segments and slope.
     *
     * @throws Will throw an error if the segments array is empty or if the points in the segments array are not in the expected format.
     */
    setDefSegments(segmentsArray: any[]): {
        defSegments: any;
        slope: any;
    };
    /**
     * Hides the marker of the specified type.
     *
     * @param type - The type of marker to hide. It can be either "hover" or "select".
     *
     * @throws Will throw an error if the mouse markers are not initialized.
     */
    hideMarker(type: CivilMarkerType): void;
    private setupEvents;
    private updateLinesResolution;
    private newMouseMarker;
    private setMouseMarker;
    private updateMarker;
    private onMouseMove;
    private onClick;
    private onControlsUpdated;
    private getScaledBox;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";
import { EdgesPlane } from "../../core";
/**
 * This component is used to navigate and visualize cross sections of a 3D model. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/CivilCrossSectionNavigator). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/CivilCrossSectionNavigator).
 */
export declare class CivilCrossSectionNavigator extends OBC.Component {
    /**
     * A unique identifier for the component. This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "96b2c87e-d90b-4639-8257-8f01136fe324";
    /** {@link OBC.Component.enabled} */
    enabled: boolean;
    /**
     * A property representing the world in which the component operates.
     */
    world: OBC.World | null;
    /**
     * A property representing the plane used for cross section visualization.
     */
    plane?: EdgesPlane;
    private _world3D;
    /**
     * A getter for the 3D world.
     * @returns The 3D world.
     */
    get world3D(): OBC.World | null;
    /**
     * A setter for the 3D world.
     * @param world - The new 3D world.
     */
    set world3D(world: OBC.World | null);
    constructor(components: OBC.Components);
    /**
     * Sets the cross section plane based on the given curve mesh and point.
     *
     * @param curveMesh - The curve mesh to create the cross section from.
     * @param point - The point on the curve mesh where the cross section should be created.
     *
     * @throws Will throw an error if the world or plane is not set before calling this method.
     * @throws Will throw an error if the geometry is not indexed.
     *
     * @returns {Promise<void>}
     */
    set(curveMesh: FRAGS.CurveMesh, point: THREE.Vector3): Promise<void>;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { Mark } from "../core";
/**
 * A class that extends {@link OBC.VertexPicker} to provide a graphical marker for picking vertices in a 3D scene.
 */
export declare class GraphicVertexPicker extends OBC.VertexPicker implements OBC.Disposable {
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /** The marker used to indicate the picked vertex. */
    marker: Mark | null;
    private _className;
    get className(): string;
    set className(name: string);
    constructor(components: OBC.Components, config?: Partial<OBC.VertexPickerConfig>);
    /** {@link OBC.Disposable.onDisposed} */
    dispose(): void;
    /**
     * Retrieves the picked vertex from the world and updates the marker's position.
     * If no vertex is picked, the marker is hidden.
     *
     * @param world - The world in which to pick the vertex.
     * @returns The picked vertex, or null if no vertex was picked.
     */
    get(world: OBC.World): THREE.Vector3 | null;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { Mark } from "../../core";
/**
 * Represents a selection made by the user, containing area, perimeter, mesh, and label.
 */
export interface AreaSelection {
    /**
     * The calculated area of the selection.
     */
    area: number;
    /**
     * The calculated perimeter of the selection.
     */
    perimeter: number;
    /**
     * The 3D mesh representing the selection.
     */
    mesh: THREE.Mesh;
    /**
     * The label associated with the selection.
     */
    label: Mark;
}
/**
 * Represents a serialized version of an AreaSelection, used for saving and loading measurements.
 */
export interface SerializedAreaMeasure {
    /**
     * The position of the vertices in the selection.
     */
    position: Float32Array;
    /**
     * The calculated perimeter of the selection.
     */
    perimeter: number;
    /**
     * The calculated area of the selection.
     */
    area: number;
}
/**
 * This component allows users to measure geometry faces in a 3D scene. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/FaceMeasurement). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/FaceMeasurement).
 */
export declare class FaceMeasurement extends OBC.Component implements OBC.Createable, OBC.Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "30279548-1309-44f6-aa97-ce26eed73522";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /**
     * An array of AreaSelection objects representing the user's selections.
     * This array is used to store the selected areas, their meshes, and labels.
     */
    selection: AreaSelection[];
    /**
     * A reference to the preview dimension face.
     * This line is used to visualize the measurement while creating it.
     */
    preview: THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.MeshBasicMaterial, THREE.Object3DEventMap>;
    /**
     * Represents the material used for the selected area in the FaceMeasurement component.
     * This material is applied to the 3D mesh representing the selected area.
     */
    selectionMaterial: THREE.MeshBasicMaterial;
    /**
     * The world in which the measurements are performed.
     */
    world?: OBC.World;
    private _enabled;
    private _currentSelelection;
    /** {@link OBC.Component.enabled} */
    set enabled(value: boolean);
    /** {@link OBC.Component.enabled} */
    get enabled(): boolean;
    constructor(components: OBC.Components);
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    /** {@link OBC.Createable.create} */
    create: () => void;
    /** {@link OBC.Createable.delete} */
    delete(): void;
    /**
     * Deletes all the selections made by the user.
     * It iterates over the 'selection' array, removes each mesh and label from the scene,
     * disposes the geometry and material of the mesh, and finally clears the 'selection' array.
     */
    deleteAll(): void;
    /** {@link OBC.Createable.endCreation} */
    endCreation(): void;
    /** {@link OBC.Createable.cancelCreation} */
    cancelCreation(): void;
    /**
     * Retrieves the current state of the AreaMeasurement component in a serialized format.
     * This method is used for saving measurements.
     *
     * @returns {SerializedAreaMeasure[]} An array of SerializedAreaMeasure objects,
     * each representing a single selection made by the user.
     */
    get(): SerializedAreaMeasure[];
    /**
     * Sets the state of the AreaMeasurement component from a serialized format.
     * This method is used for loading measurements.
     *
     * @param serialized - An array of SerializedAreaMeasure objects,
     * each representing a single selection made by the user.
     *
     * @throws Will throw an error if no world is given to the face measurement.
     */
    set(serialized: SerializedAreaMeasure[]): void;
    private setupEvents;
    private setVisibility;
    private onMouseMove;
    private onKeydown;
    private unselect;
    private updateSelection;
    private newLabel;
    private regenerateHighlight;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { AreaMeasureElement } from "./src";
/**
 * This component allows users to measure areas in a 3D scene. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/AreaMeasurement). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/AreaMeasurement).
 */
export declare class AreaMeasurement extends OBC.Component implements OBC.Createable, OBC.Disposable, OBC.Hideable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "c453a99e-f054-4781-9060-33df617db4a5";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /**
     * A list of all the area measurement elements created by this component.
     */
    list: AreaMeasureElement[];
    /**
     * The world in which the area measurements are performed.
     * This property is optional and can be set to null if no world is available.
     */
    world?: OBC.World;
    private _enabled;
    private _visible;
    private _vertexPicker;
    private _currentAreaElement;
    private _clickCount;
    /** {@link OBC.Component.enabled} */
    set enabled(value: boolean);
    /** {@link OBC.Component.enabled} */
    get enabled(): boolean;
    /**
     * Setter for the working plane for the area measurement.
     * Sets the working plane for the vertex picker.
     * @param plane - The new working plane or null if no plane is to be used.
     */
    set workingPlane(plane: THREE.Plane | null);
    /**
     * Getter for the working plane for the area measurement.
     * @returns The current working plane or null if no plane is being used.
     */
    get workingPlane(): THREE.Plane | null;
    /** {@link OBC.Hideable.visible} */
    get visible(): boolean;
    /** {@link OBC.Hideable.visible} */
    set visible(value: boolean);
    constructor(components: OBC.Components);
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    /** {@link OBC.Createable.create} */
    create: () => void;
    /** {@link OBC.Createable.delete} */
    delete(): void;
    /** Deletes all the dimensions that have been previously created. */
    deleteAll(): void;
    /** {@link OBC.Createable.endCreation} */
    endCreation(): void;
    /** {@link OBC.Createable.cancelCreation} */
    cancelCreation(): void;
    private setupEvents;
    private onMouseMove;
    private onKeydown;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { AngleMeasureElement } from "./src";
/**
 * This component allows users to measure angles in a 3D scene. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/AngleMeasurement). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/AngleMeasurement).
 */
export declare class AngleMeasurement extends OBC.Component implements OBC.Createable, OBC.Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "622fb2c9-528c-4b0a-8a0e-6a1375f0a3aa";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /**
     * The world in which the angle measurements are performed.
     * This property is optional and can be set to null if no world is available.
     */
    world?: OBC.World;
    /**
     * A list of all the angle measurement elements created by this component.
     */
    list: AngleMeasureElement[];
    private _lineMaterial;
    private _enabled;
    private _vertexPicker;
    private _currentAngleElement;
    private _clickCount;
    /** {@link OBC.Component.enabled} */
    get enabled(): boolean;
    /** {@link OBC.Component.enabled} */
    set enabled(value: boolean);
    /**
     * Getter for the line material used for the angle measurement lines.
     */
    get lineMaterial(): LineMaterial;
    /**
     * Setter for the line material used for the angle measurement lines.
     * Disposes the old material and sets the new one.
     * Also updates the resolution of the material to match the window size.
     * @param material - The new line material to use.
     */
    set lineMaterial(material: LineMaterial);
    /**
     * Getter for the working plane for the angle measurement.
     * @returns The current working plane or null if no plane is being used.
     */
    get workingPlane(): THREE.Plane | null;
    /**
     * Setter for the working plane for the angle measurement.
     * Sets the working plane for the vertex picker.
     * @param plane - The new working plane or null if no plane is to be used.
     */
    set workingPlane(plane: THREE.Plane | null);
    constructor(components: OBC.Components);
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    /** {@link OBC.Createable.create} */
    create: () => void;
    /** {@link OBC.Createable.delete} */
    delete(): void;
    /** Deletes all the dimensions that have been previously created. */
    deleteAll(): void;
    /** {@link OBC.Createable.endCreation} */
    endCreation(): void;
    /** {@link OBC.Createable.cancelCreation} */
    cancelCreation(): void;
    private setupEvents;
    private onMouseMove;
    private onKeyDown;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { SimpleDimensionLine } from "../SimpleDimensionLine";
/**
 * A basic dimension tool to measure distances between 2 points in 3D and display a 3D symbol displaying the numeric value. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/LengthMeasurement). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/LengthMeasurement).
 */
export declare class LengthMeasurement extends OBC.Component implements OBC.Createable, OBC.Hideable, OBC.Disposable, OBC.Updateable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "2f9bcacf-18a9-4be6-a293-e898eae64ea1";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /** {@link OBC.Updateable.onBeforeUpdate} */
    readonly onBeforeUpdate: OBC.Event<LengthMeasurement>;
    /** {@link OBC.Updateable.onAfterUpdate} */
    readonly onAfterUpdate: OBC.Event<LengthMeasurement>;
    readonly onCleaned: OBC.Event<null>;
    /** The minimum distance to force the dimension cursor to a vertex. */
    snapDistance: number;
    /**
     * A list of all the measurement elements created by this component.
     */
    list: SimpleDimensionLine[];
    /**
     * The world in which the angle measurements are performed.
     * This property is optional and can be set to null if no world is available.
     */
    world?: OBC.World;
    private _vertexPicker;
    private _lineMaterial;
    private _visible;
    private _enabled;
    /** Temporary variables for internal operations */
    private _temp;
    /** {@link OBC.Component.enabled} */
    get enabled(): boolean;
    /** {@link OBC.Component.enabled} */
    set enabled(value: boolean);
    /** {@link OBC.Hideable.visible} */
    get visible(): boolean;
    /** {@link OBC.Hideable.visible} */
    set visible(value: boolean);
    /**
     * Getter for the color of the dimension lines.
     * Returns the color of the line material used for the dimension lines.
     *
     */
    get color(): THREE.Color;
    /**
     * Setter for the color of the dimension lines.
     * Sets the color of the line material used for the dimension lines.
     *
     */
    set color(color: THREE.Color);
    constructor(components: OBC.Components);
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    /** {@link OBC.Updateable.update} */
    update(_delta: number): Promise<void>;
    /**
     * Starts or finishes drawing a new dimension line.
     *
     * @param data - forces the dimension to be drawn on a plane. Use this if you are drawing
     * dimensions in floor plan navigation.
     */
    create: (data?: any) => void;
    /**
     * Creates a new dimension line between two given points.
     *
     * @param p1 - The start point of the dimension line.
     * @param p2 - The end point of the dimension line.
     *
     */
    createOnPoints(p1: THREE.Vector3, p2: THREE.Vector3): SimpleDimensionLine;
    /** {@link OBC.Createable.delete} */
    delete(): void;
    /**
     * Deletes a specific measurement from the list.
     *
     * @param measurement - The measurement to be deleted.
     *
     * @remarks
     * If the measurement does not exist in the list, no action is taken.
     *
     */
    deleteMeasurement(measurement: SimpleDimensionLine): Promise<void>;
    /** Deletes all the dimensions that have been previously created. */
    deleteAll(): void;
    /** {@link OBC.Createable.cancelCreation} */
    cancelCreation(): void;
    /** {@link OBC.Createable.endCreation} */
    endCreation(): void;
    private drawStart;
    private drawInProcess;
    private drawDimension;
    private getBoundingBoxes;
    private setupEvents;
    private onMouseMove;
    private onKeydown;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { Mark } from "../../core";
/**
 * Interface representing the data required to create a dimension line.
 */
export interface DimensionData {
    /**
     * The starting point of the dimension line in 3D space.
     */
    start: THREE.Vector3;
    /**
     * The ending point of the dimension line in 3D space.
     */
    end: THREE.Vector3;
    /**
     * The material to be used for the line of the dimension.
     */
    lineMaterial: THREE.Material;
    /**
     * The HTML element to be used as the endpoint marker for the dimension line.
     */
    endpointElement: HTMLElement;
}
/**
 * A class representing a simple dimension line in a 3D space.
 */
export declare class SimpleDimensionLine {
    /**
     * The label for the dimension line.
     */
    label: Mark;
    /**
     * The bounding box for the dimension line.
     */
    boundingBox: THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>;
    /**
     * The world in which the dimension line exists.
     */
    world: OBC.World;
    /**
     * The components used by the dimension line.
     */
    components: OBC.Components;
    /**
     * The scale factor for the dimension line.
     */
    static scale: number;
    /**
     * The units used for the dimension line.
     */
    static units: string;
    /**
     * The number of decimals to show in the label.
     */
    static rounding: number;
    private _length;
    private _visible;
    private _start;
    private _end;
    private readonly _root;
    private readonly _endpoints;
    private readonly _line;
    /**
     * Getter for the visibility of the dimension line.
     * @returns {boolean} The current visibility state.
     */
    get visible(): boolean;
    /**
     * Setter for the visibility of the dimension line.
     * @param {boolean} value - The new visibility state.
     */
    set visible(value: boolean);
    /**
     * Getter for the end point of the dimension line.
     * @returns {THREE.Vector3} The current end point.
     */
    get endPoint(): THREE.Vector3;
    /**
     * Setter for the end point of the dimension line.
     * Updates the line geometry and position of the end point marker.
     * @param {THREE.Vector3} point - The new end point.
     */
    set endPoint(point: THREE.Vector3);
    /**
     * Getter for the start point of the dimension line.
     * @returns {THREE.Vector3} The current start point.
     */
    get startPoint(): THREE.Vector3;
    /**
     * Setter for the start point of the dimension line.
     * Updates the line geometry and position of the start point marker.
     * @param {THREE.Vector3} point - The new start point.
     */
    set startPoint(point: THREE.Vector3);
    private get _center();
    constructor(components: OBC.Components, world: OBC.World, data: DimensionData);
    /**
     * Disposes of the dimension line and its associated resources.
     * This method should be called when the dimension line is no longer needed.
     * It removes the dimension line from the world, destroys its components, and frees up memory.
     */
    dispose(): void;
    /**
     * Creates a bounding box for the dimension line.
     * The bounding box is a 3D box that encloses the dimension line.
     * It is used for collision detection and visibility culling.
     * The bounding box is initially invisible and can be toggled using the 'toggleBoundingBox' method.
     */
    createBoundingBox(): void;
    /**
     * Toggles the visibility of the dimension line's label.
     * The label is a text element that displays the length of the dimension line.
     * This method is used to show or hide the label when needed.
     */
    toggleLabel(): void;
    private newEndpointElement;
    private updateLabel;
    private createLine;
    private newText;
    private getTextContent;
    private getLength;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";
import { Mark } from "../../core";
/**
 * This component allows users to measure geometry volumes in a 3D scene. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/VolumeMeasurement). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/VolumeMeasurement).
 */
export declare class VolumeMeasurement extends OBC.Component implements OBC.Createable, OBC.Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "811da532-7af3-4635-b592-1c06ae494af5";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /**
     * Event triggered when a volume is found.
     * The event passes the calculated volume as a parameter.
     */
    readonly onVolumeFound: OBC.Event<number>;
    /**
     * Label used to display the calculated volume.
     * It is initially set to null and will be created when needed.
     */
    label: Mark | null;
    /**
     * The world in which the measurements are performed.
     */
    world?: OBC.World;
    private _enabled;
    /** {@link OBC.Component.enabled} */
    set enabled(value: boolean);
    /** {@link OBC.Component.enabled} */
    get enabled(): boolean;
    constructor(components: OBC.Components);
    /** {@link OBC.Disposable.dispose} */
    dispose(): Promise<void>;
    /** {@link OBC.Createable.create} */
    create: () => void;
    /** {@link OBC.Createable.delete} */
    delete(): void;
    /**
     * Deletes all the measurements created by this component.
     */
    deleteAll(): Promise<void>;
    /** {@link OBC.Createable.endCreation} */
    endCreation(): void;
    /** {@link OBC.Createable.cancelCreation} */
    cancelCreation(): void;
    /**
     * Calculates the volume of a set of fragments.
     *
     * @param frags - A map of fragment IDs to their corresponding item IDs.
     * @returns The total volume of the fragments.
     *
     * @remarks
     * This method creates a set of instanced meshes from the given fragments and item IDs.
     * It then calculates the volume of each mesh and returns the total volume.
     *
     * @throws Will throw an error if the world is not set.
     * @throws Will throw an error if the label is not created.
     * @throws Will throw an error if the world's renderer is not set.
     * @throws Will throw an error if the geometry of the meshes is not indexed.
     * @throws Will throw an error if the fragment manager is not available.
     */
    getVolumeFromFragments(frags: FRAGS.FragmentIdMap): number;
    /**
     * Calculates the total volume of a set of meshes.
     *
     * @param meshes - An array of meshes or instanced meshes to calculate the volume from.
     * @returns The total volume of the meshes.
     *
     * @throws Will throw an error if the world is not set.
     * @throws Will throw an error if the label is not created.
     *
     * @remarks
     * This method calculates the volume of each mesh in the provided array and returns the total volume.
     * It also handles the creation of a label if it doesn't exist, adds the label to the world's scene,
     * and positions the label at the center of the bounding sphere of the meshes.
     *
     */
    getVolumeFromMeshes(meshes: THREE.InstancedMesh[] | THREE.Mesh[]): number;
    /**
     * Clears the label associated with the volume measurement.
     *
     * @remarks
     * This method is used to hide the label when the volume measurement is no longer needed.
     * If the label exists, it sets its visibility to false.
     *
     */
    clear(): void;
    private newLabel;
    private setupEvents;
    private setLabel;
    private onMouseMove;
    private onKeydown;
}
import * as OBC from "@thatopen/components";
import { SimpleDimensionLine } from "../SimpleDimensionLine";
/**
 * This component allows users to measure geometry edges in a 3D scene. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/EdgeMeasurement). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/EdgeMeasurement).
 */
export declare class EdgeMeasurement extends OBC.Component implements OBC.Createable, OBC.Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "e7be5749-89df-4514-8d25-83aa38ce12d8";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /**
     * A reference to the preview dimension line.
     * This line is used to visualize the measurement while creating it.
     */
    preview?: SimpleDimensionLine;
    /**
     * The tolerance value for edge selection.
     * This value determines the maximum distance from the mouse cursor to an edge for it to be selected.
     */
    tolerance: number;
    /**
     * The world in which the measurements are performed.
     */
    world?: OBC.World;
    private _enabled;
    private _lineMaterial;
    /** {@link OBC.Component.enabled} */
    set enabled(value: boolean);
    /** {@link OBC.Component.enabled} */
    get enabled(): boolean;
    constructor(components: OBC.Components);
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    /** {@link OBC.Createable.create} */
    create: () => Promise<void>;
    /** {@link OBC.Createable.delete} */
    delete(): void;
    /**
     * Deletes all the measurements created by the EdgeMeasurement component.
     */
    deleteAll(): void;
    /** {@link OBC.Createable.endCreation} */
    endCreation(): void;
    /** {@link OBC.Createable.cancelCreation} */
    cancelCreation(): void;
    /**
     * Retrieves the current state of the measurements created by the EdgeMeasurement component.
     * The state is serialized as an array of arrays, where each inner array represents a line measurement.
     * Each line measurement is represented by six numbers: the x, y, and z coordinates of the start and end points.
     */
    get(): number[][];
    /**
     * Sets the state of the measurements created by the EdgeMeasurement component.
     * The state is serialized as an array of arrays, where each inner array represents a line measurement.
     * Each line measurement is represented by six numbers: the x, y, and z coordinates of the start and end points.
     *
     * @param dimensions - The serialized state of the measurements.
     * Each inner array should contain six numbers representing the x, y, and z coordinates of the start and end points of a line measurement.
     *
     */
    set(dimensions: number[][]): void;
    private setupEvents;
    private onMouseMove;
    private onKeydown;
    private updateSelection;
}
import * as OBC from "@thatopen/components";
import { EdgesStyles } from "./src/edges-styles";
/**
 * A component that can add fills and outlines to the Clipper. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/ClipEdges). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/ClipEdges).
 */
export declare class ClipEdges extends OBC.Component implements OBC.Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "24dfc306-a3c4-410f-8071-babc4afa5e4d";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /** {@link OBC.Component.enabled} */
    enabled: boolean;
    /**
     * The styling properties for the edges.
     */
    styles: EdgesStyles;
    /**
     * A flag indicating whether the fills need to be updated.
     */
    fillsNeedUpdate: boolean;
    private _visible;
    /**
     * Gets the visibility state of the edges.
     * @returns {boolean} The current visibility state.
     */
    get visible(): boolean;
    /**
     * Sets the visibility state of the edges.
     * Updates the visibility of the associated {@link EdgesPlane} instances.
     * @param {boolean} active - The new visibility state.
     */
    set visible(active: boolean);
    constructor(components: OBC.Components);
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    /**
     * Updates all the lines of the component.
     *
     * @param {boolean} [updateFills=false] - If true, the fills will be updated regardless of the 'fillsNeedUpdate' flag.
     * @returns {Promise<void>} - A promise that resolves when the update is complete.
     *
     * @remarks
     * This method iterates through all the {@link EdgesPlane} instances associated with the {@link Clipper} component.
     */
    update(updateFills?: boolean): Promise<void>;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { Mark } from "./src";
/**
 * Interface representing a marker object.
 */
export interface IMarker {
    /**
     * Unique identifier for the marker.
     */
    key: string;
    /**
     * Label of the marker.
     */
    label: Mark;
    /**
     * Optional type of the marker.
     */
    type?: string;
    /**
     * Indicates whether the marker is merged with other markers.
     */
    merged: boolean;
    /**
     * Indicates whether the marker is static and should not be clustered.
     */
    static: boolean;
}
/**
 * Interface representing a group of markers.
 */
export interface IGroupedMarkers {
    /**
     * Unique identifier for the group of markers.
     */
    key: string;
    /**
     * Array of keys of markers that belong to this group.
     */
    markerKeys: string[];
    /**
     * Label of the group of markers.
     */
    label: Mark;
}
/**
 * Component for Managing Markers along with creating different types of markers. Every marker is a Simple2DMarker. For every marker that needs to be added, you can use the Manager to add the marker and change its look and feel. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/Marker). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/Marker).
 */
export declare class Marker extends OBC.Component implements OBC.Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "4079eb91-79b0-4ede-bcf2-15b837129236";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /** {@link OBC.Component.enabled} */
    enabled: boolean;
    /**
     * The distance threshold for clustering markers.
     * Markers within this distance will be considered for clustering.
     * Default value is 50.
     */
    threshold: number;
    /**
     * Indicates whether markers should be automatically clustered.
     * If true, markers will be clustered based on the threshold value.
     * Default value is true.
     */
    autoCluster: boolean;
    /**
     * A Map containing the markers grouped by world UUID.
     * Each world can have its own set of markers.
     */
    list: Map<string, Map<string, IMarker>>;
    protected clusterLabels: Set<IGroupedMarkers>;
    protected currentKeys: Set<string>;
    protected _color: string;
    protected _markerKey: number;
    protected _clusterKey: number;
    private _worldEvents;
    private _setupWorlds;
    /**
     * Getter for the color property.
     * Returns the current color of the markers.
     *
     * @returns {string} The current color of the markers.
     */
    get color(): string;
    /**
     * Setter for the color property.
     * Updates the color of all the markers to the new value.
     *
     * @param {string} value - The new color value for the markers.
     */
    set color(value: string);
    constructor(components: OBC.Components);
    /**
     * Creates a new marker at the specified point in the world.
     *
     * @param world - The world where the marker will be created.
     * @param text - The text content of the marker.
     * @param point - The 3D position where the marker will be placed.
     * @param isStatic - Indicates whether the marker should be static and not clustered.
     * @returns The unique key of the created marker.
     */
    create(world: OBC.World, text: string, point: THREE.Vector3, isStatic?: boolean): string | undefined;
    /**
     * Deletes a marker with the specified ID from all worlds.
     *
     * @param id - The unique identifier of the marker to be deleted.
     *
     * @remarks
     * This method iterates through all the worlds and their respective markers.
     * If a marker with the specified ID is found, it disposes of the marker's label
     * and removes the marker from the world's marker list.
     *
     */
    delete(id: string): void;
    /**
     * Retrieves the list of markers associated with a specific world.
     * If the list does not exist for the given world, it creates a new one.
     *
     * @param world - The world for which the marker list is to be retrieved.
     * @returns A Map containing the markers associated with the given world.
     *
     * @remarks
     * This method is used to manage markers per world. It ensures that each world has its own set of markers.
     * If a marker list for the given world does not exist, it creates a new one and associates it with the world.
     */
    getWorldMarkerList(world: OBC.World): Map<string, IMarker>;
    /** {@link OBC.Disposable.dispose} */
    dispose(type?: string): void;
    /**
     * Sets up event listeners for clustering markers in the given world.
     *
     * @param world - The world where the event listeners will be set up.
     * @param enabled - Indicates whether the event listeners should be enabled or disabled.
     *
     * @remarks
     * This method checks if the event listeners are already set up for the given world.
     * If the event listeners are already set up and the 'enabled' parameter is true, the method returns without doing anything.
     * If the world does not have camera controls, the method returns without doing anything.
     *
     * The method then retrieves the event listener for the given world using the 'getWorldEvent' method.
     * It removes the existing event listeners for the "sleep" and "rest" events from the world's camera controls.
     *
     * If the 'enabled' parameter is true, the method adds the event listener for the "sleep" and "rest" events to the world's camera controls.
     */
    setupEvents(world: OBC.World, enabled: boolean): void;
    /**
     * Performs clustering of markers in the given world.
     *
     * @param world - The world where clustering will be performed.
     *
     */
    cluster(world: OBC.World): void;
    private getWorldEvent;
    private resetMarkers;
    private removeMergeMarkers;
    private getAveragePositionFromLabels;
    private createClusterElement;
    private getScreenPosition;
    private distance;
    private navigateToCluster;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { Postproduction } from "./src/postproduction";
import { RendererWith2D } from "../Marker";
/**
 * A class that extends RendererWith2D and adds post-processing capabilities. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/PostproductionRenderer). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/PostproductionRenderer).
 */
export declare class PostproductionRenderer extends RendererWith2D {
    private _postproduction?;
    /**
     * Getter for the postproduction instance.
     * Throws an error if the postproduction instance is not yet initialized.
     *
     * @returns The initialized Postproduction instance.
     */
    get postproduction(): Postproduction;
    constructor(components: OBC.Components, container: HTMLElement, parameters?: Partial<THREE.WebGLRendererParameters>);
    /** {@link Updateable.update} */
    update(): void;
    /** {@link OBC.Disposable.dispose}. */
    dispose(): void;
    private resizePostproduction;
    private setPostproductionSize;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
/**
 * Represents a shadow object used in the application.
 */
export interface Shadow {
    /**
     * The root group of the shadow.
     */
    root: THREE.Group;
    /**
     * The render target for the shadow texture.
     */
    rt: THREE.WebGLRenderTarget;
    /**
     * The render target for the blurred shadow texture.
     */
    rtBlur: THREE.WebGLRenderTarget;
    /**
     * The mesh used for blurring the shadow.
     */
    blurPlane: THREE.Mesh;
    /**
     * The camera used to render the shadow.
     */
    camera: THREE.Camera;
    /**
     * The world in which the shadow is rendered.
     */
    world: OBC.World;
}
/**
 * Represents a collection of shadows, where each shadow is identified by a unique ID. The keys of the object are the IDs, and the values are the corresponding {@link Shadow} objects.
 */
export interface Shadows {
    [id: string]: Shadow;
}
/**
 * This component drops shadows on meshes in a 3D scene. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/ShadowDropper). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/ShadowDropper).
 */
export declare class ShadowDropper extends OBC.Component implements OBC.Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "f833a09a-a3ab-4c58-b03e-da5298c7a1b6";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /** {@link OBC.Component.enabled} */
    enabled: boolean;
    /**
     * Controls how far away the shadow is computed
     */
    cameraHeight: number;
    /**
     * The darkness of the shadow.
     * A higher value makes the shadow darker.
     */
    darkness: number;
    /**
     * The opacity of the shadow.
     * A higher value makes the shadow more opaque.
     */
    opacity: number;
    /**
     * The resolution of the shadow texture.
     * A higher value results in a higher-quality shadow.
     */
    resolution: number;
    /**
     * The amount of blur applied to the shadow.
     * A higher value makes the shadow more blurred.
     */
    amount: number;
    /**
     * The color of the shadow plane.
     * This color is used when the ground color plane is enabled.
     */
    planeColor: number;
    /**
     * The offset of the shadow from the ground.
     * A positive value moves the shadow upwards.
     */
    shadowOffset: number;
    /**
     * The extra scale factor applied to the shadow size.
     * A higher value makes the shadow larger.
     */
    shadowExtraScaleFactor: number;
    /**
     * A collection of shadows, where each shadow is identified by a unique ID.
     */
    list: Shadows;
    private tempMaterial;
    private depthMaterial;
    constructor(components: OBC.Components);
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    /**
     * Creates a blurred dropped shadow of the given mesh.
     *
     * @param model - the mesh whose shadow to generate.
     * @param id - the name of this shadow.
     */
    create(model: THREE.Mesh[], id: string, world: OBC.World): THREE.Group<THREE.Object3DEventMap>;
    /**
     * Deletes the specified shadow (if it exists).
     *
     * @param id - the name of this shadow.
     */
    deleteShadow(id: string): void;
    private createPlanes;
    private initializeShadow;
    private bakeShadow;
    private static initializeCamera;
    private static initializeRenderTargets;
    private initializeRoot;
    private createBasePlane;
    private static createBlurPlane;
    private createPlaneMaterial;
    private initializeDepthMaterial;
    private createShadow;
    private createCamera;
    private getSizeCenterMin;
    private blurShadow;
}
import * as OBC from "@thatopen/components";
export declare class PlatformComponents extends OBC.Component {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "74c0c370-1af8-4ca9-900a-4a4196c0f2f5";
    enabled: boolean;
    inputs: string[];
    private readonly _requestEventID;
    private readonly _createEventID;
    constructor(components: OBC.Components);
    import(componentSource: string): Promise<OBC.ComponentWithUI>;
}
import * as FRAG from "@thatopen/fragments";
import * as OBC from "@thatopen/components";
import { GeometryCullerRenderer, StreamPropertiesSettings, StreamLoaderSettings } from "./src";
/**
 * The IfcStreamer component is responsible for managing and streaming tiled IFC data. It provides methods for loading, removing, and managing IFC models, as well as handling visibility and caching. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/IfcStreamer). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/IfcStreamer).
 */
export declare class IfcStreamer extends OBC.Component implements OBC.Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "22437e8d-9dbc-4b99-a04f-d2da280d50c8";
    /** {@link OBC.Component.enabled} */
    enabled: boolean;
    /**
     * Event triggered when fragments are deleted.
     */
    readonly onFragmentsDeleted: OBC.Event<FRAG.Fragment[]>;
    /**
     * Event triggered when fragments are loaded.
     */
    readonly onFragmentsLoaded: OBC.Event<FRAG.Fragment[]>;
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /**
     * The data of the streamed models. It defines the geometries, their instances, its bounding box (OBB) and the assets to which they belong.
     */
    models: {
        [modelID: string]: {
            assetsMap: Map<number, OBC.StreamedAsset>;
            geometries: OBC.StreamedGeometries;
            /** @deprecated use assetsMap instead */
            assets: OBC.StreamedAsset[];
        };
    };
    /**
     * Importer of binary IFC data previously converted to fragment tiles.
     */
    serializer: FRAG.StreamSerializer;
    /**
     * Maximum time in milliseconds for a geometry to stay in the RAM cache.
     */
    maxRamTime: number;
    /**
     * Flag indicating whether to use the local cache for storing geometry files.
     */
    useCache: boolean;
    /**
     * Flag to cancel the files that are being currently loaded.
     */
    cancel: boolean;
    /**
     * The URL of the data source for the streaming service.
     * It should be set before using the streaming service. Alternatively, you can use a custom fetch function.
     */
    url: string;
    /**
     * Function used to retrieve tiles. Can be overriden to work with specific backends.
     */
    fetch: (fileName: string) => Promise<Response | File>;
    /**
     * Cache system that uses the File System API.
     */
    fileDB: FRAG.StreamerFileDb;
    private _culler;
    private _world;
    private _ramCache;
    private _isDisposing;
    private _geometryInstances;
    private _loadedFragments;
    private fragIDData;
    private _baseMaterial;
    private _baseMaterialT;
    /**
     * The world in which the fragments will be displayed.
     * It must be set before using the streaming service.
     * If not set, an error will be thrown when trying to access the world.
     */
    get world(): OBC.World;
    /**
     * Sets the world in which the fragments will be displayed.
     * @param world - The new world to be set.
     */
    set world(world: OBC.World);
    /**
     * The culler used for managing and rendering the fragments.
     * It is automatically created when the world is set.
     */
    get culler(): GeometryCullerRenderer;
    constructor(components: OBC.Components);
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    /**
     * Loads a new fragment group into the scene using streaming.
     *
     * @param settings - The settings for the new fragment group.
     * @param coordinate - Whether to federate this model with the rest.
     * @param properties - Optional properties for the new fragment group.
     * @returns The newly loaded fragment group.
     */
    load(settings: StreamLoaderSettings, coordinate: boolean, properties?: StreamPropertiesSettings): Promise<FRAG.FragmentsGroup>;
    /**
     * Removes a fragment group from the scene.
     *
     * @param modelID - The unique identifier of the fragment group to remove.
     *
     * @deprecated use OBC.FragmentsManager.disposeGroup instead.
     */
    remove(modelID: string): void;
    /**
     * Sets the visibility of items in fragments based on the provided filter.
     *
     * @param visible - The visibility state to set.
     * @param filter - A map of fragment IDs to arrays of item IDs.
     *                  Only items with IDs present in the arrays will be visible.
     *                  If not provided, it will take all loaded models as filter.
     */
    setVisibility(visible: boolean, filter?: FRAG.FragmentIdMap): void;
    /**
     * Clears the local cache used for storing downloaded fragment files.
     *
     * @returns A Promise that resolves when the cache is cleared.
     */
    clearCache(): Promise<void>;
    /**
     * Sets or unsets the specified fragments as static. Static fragments are streamed once and then kept in memory.
     *
     * @param ids - The list of fragment IDs to make static.
     * @param active - Whether these items should be static or not.
     * @param culled - Whether these items should be culled or not. If undefined: active=true will set items as culled, while active=false will remove items from both the culled and unculled list.
     */
    setStatic(ids: Iterable<string>, active: boolean, culled?: boolean): Promise<void>;
    /**
     * Gets a FragmentsGroup with the OBB of the specified items. Keep in mind that you will need to dispose this group yourself using the dispose(false) method (geometry is shared with bounding boxes used for visibility check).
     *
     * @param items - The items whose bounding boxes to get.
     */
    getBoundingBoxes(items: FRAG.FragmentIdMap): FRAG.FragmentsGroup;
    private loadFoundGeometries;
    private unloadLostGeometries;
    private setMeshVisibility;
    private newFragment;
    private disposeStreamedGroup;
    private cancelLoading;
    private loadFragmentFile;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";
import { FragmentIdMap } from "@thatopen/fragments";
/**
 * Interface defining the events that the Highlighter class can trigger. Each highlighter has its own set of events, identified by the highlighter name.
 */
export interface HighlightEvents {
    [highlighterName: string]: {
        /** Event triggered before a fragment is highlighted, giving the last selection. */
        onBeforeHighlight: OBC.Event<FRAGS.FragmentIdMap>;
        /** Event triggered when a fragment is highlighted. */
        onHighlight: OBC.Event<FRAGS.FragmentIdMap>;
        /** Event triggered when a fragment is cleared. */
        onClear: OBC.Event<null>;
    };
}
/**
 * Interface defining the configuration options for the Highlighter class.
 */
export interface HighlighterConfig {
    /** Name of the selection event. */
    selectName: string;
    /** Toggles the select functionality. */
    selectEnabled: boolean;
    /** Name of the hover event. */
    hoverName: string;
    /** Toggles the hover functionality. */
    hoverEnabled: boolean;
    /** Color used for selection. */
    selectionColor: THREE.Color | null;
    /** Color used for hover. */
    hoverColor: THREE.Color | null;
    /** Whether to automatically highlight fragments on click. */
    autoHighlightOnClick: boolean;
    /** The world in which the highlighter operates. */
    world: OBC.World | null;
}
/**
 * This component allows highlighting and selecting fragments in a 3D scene. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/Highlighter). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/Highlighter).
 */
export declare class Highlighter extends OBC.Component implements OBC.Disposable, OBC.Eventable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "cb8a76f2-654a-4b50-80c6-66fd83cafd77";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /** {@link OBC.Updateable.onBeforeUpdate} */
    readonly onBeforeUpdate: OBC.Event<Highlighter>;
    /** {@link OBC.Updateable.onAfterUpdate} */
    readonly onAfterUpdate: OBC.Event<Highlighter>;
    /** Event triggered when the Highlighter is setup. */
    readonly onSetup: OBC.Event<Highlighter>;
    /** Indicates whether the Highlighter is setup. */
    isSetup: boolean;
    /** {@link OBC.Component.enabled} */
    enabled: boolean;
    /** Stores the events triggered by the Highlighter. */
    events: HighlightEvents;
    /** Determines the multiple selection behavior. */
    multiple: "none" | "shiftKey" | "ctrlKey";
    /** Zoom factor applied when zooming to selection. */
    zoomFactor: number;
    /** Indicates whether to zoom to the selection when highlighting. */
    zoomToSelection: boolean;
    /** Stores the backup color before selection. */
    backupColor: THREE.Color | null;
    /** Stores the current selection. */
    selection: {
        [selectionID: string]: FRAGS.FragmentIdMap;
    };
    /** Stores the configuration options for the Highlighter. */
    config: Required<HighlighterConfig>;
    /** Stores the colors used for highlighting selections. If null, the highlighter won't color geometries (useful for selection without coloring). */
    colors: Map<string, THREE.Color | null>;
    /** Styles with auto toggle will be unselected when selected twice. */
    autoToggle: Set<string>;
    /** Position of the mouse on mouseDown. */
    private mouseDownPosition;
    /** Threshhold on how much the mouse have to move until its considered movement */
    mouseMoveThreshold: number;
    /** If defined, only the specified elements will be selected by the specified style. */
    selectable: {
        [name: string]: FragmentIdMap;
    };
    /** Manager to easily toggle and reset all events. */
    eventManager: OBC.EventManager;
    private _fills;
    private _mouseState;
    private _colorsBeforeSelect;
    constructor(components: OBC.Components);
    /** {@link Disposable.dispose} */
    dispose(): Promise<void>;
    /**
     * Adds a new selection with the given name and color.
     * Throws an error if a selection with the same name already exists.
     *
     * @param name - The name of the new selection.
     * @param color - The color to be used for highlighting the selection.
     *
     * @throws Will throw an error if a selection with the same name already exists.
     */
    add(name: string, color: THREE.Color | null): void;
    /**
     * Removes the specified selection.
     *
     * @param name - The name of the new selection.
     */
    remove(name: string): void;
    /**
     * Highlights a fragment based on a raycast from the mouse position.
     *
     * @param name - The name of the selection.
     * @param removePrevious - Whether to remove previous highlights.
     * @param zoomToSelection - Whether to zoom to the highlighted selection.
     * @param exclude - Fragments to exclude from the highlight.
     *
     * @returns The highlighted fragment and its ID, or null if no fragment was highlighted.
     *
     * @throws Will throw an error if the world or a required component is not found.
     * @throws Will throw an error if the selection does not exist.
     * @throws Will throw an error if the fragment or its geometry is not found.
     * @throws Will throw an error if the item ID is not found.
     * @throws Will throw an error if the fragment does not belong to a FragmentsGroup.
     */
    highlight(name: string, removePrevious?: boolean, zoomToSelection?: boolean, exclude?: FragmentIdMap): Promise<{
        id: number;
        fragments: FRAGS.FragmentIdMap;
    } | null>;
    /**
     * Highlights a fragment based on a given fragment ID map.
     *
     * @param name - The name of the selection.
     * @param fragmentIdMap - The fragment ID map to highlight.
     * @param removePrevious - Whether to remove previous highlights.
     * @param zoomToSelection - Whether to zoom to the highlighted selection.
     * @param exclude - Fragments to exclude from the highlight.
     * @param fillMesh - The fill mesh to also highlight, if any.
     * @param isPicking - Whether this function is called when picking with the mouse.
     *
     * @returns Promise that resolves when the highlighting is complete.
     *
     * @throws Will throw an error if the selection does not exist.
     * @throws Will throw an error if the fragment or its geometry is not found.
     * @throws Will throw an error if the item ID is not found.
     * @throws Will throw an error if the fragment does not belong to a FragmentsGroup.
     */
    highlightByID(name: string, fragmentIdMap: FragmentIdMap, removePrevious?: boolean, zoomToSelection?: boolean, exclude?: FragmentIdMap, fillMesh?: THREE.Mesh | undefined, isPicking?: boolean): Promise<void>;
    /**
     * Clears the selection for the given name or all selections if no name is provided.
     *
     * @param name - The name of the selection to clear. If not provided, clears all selections.
     * @param filter - The only items to unselect. If not provided, all items will be unselected.
     *
     */
    clear(name?: string, filter?: FRAGS.FragmentIdMap): void;
    /**
     * Sets up the Highlighter with the provided configuration.
     *
     * @param config - Optional configuration for the Highlighter.
     * If not provided, the Highlighter will use the default configuration.
     *
     * @throws Will throw an error if the world or a required component is not found.
     * @throws Will throw an error if the selection already exists.
     * @throws Will throw an error if the fragment or its geometry is not found.
     * @throws Will throw an error if the item ID is not found.
     * @throws Will throw an error if the fragment does not belong to a FragmentsGroup.
     */
    setup(config?: Partial<HighlighterConfig>): void;
    /**
     * Applies all the existing styles to the given fragments. Useful when combining the highlighter with streaming.
     *
     * @param fragments - The list of fragment to update.
     */
    updateFragments(fragments: Iterable<FRAGS.Fragment>): void;
    private zoomSelection;
    private saveHighlightersBeforeSelect;
    private restoreHighlightersAfterDeselect;
    private setupEvents;
    private clearHover;
    private onMouseDown;
    private onMouseUp;
    private onMouseMove;
}
import * as OBC from "@thatopen/components";
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
/**
 * This component allows adding a colored outline with thickness to fragments in a 3D scene. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/Highlighter). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/Outliner).
 */
export declare class Outliner extends OBC.Component implements OBC.Disposable {
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /**
     * The world where the outliner operates.
     */
    world?: OBC.World;
    /** {@link OBC.Component.enabled} */
    get enabled(): boolean;
    /** {@link OBC.Component.enabled} */
    set enabled(value: boolean);
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "2fd3bcc5-b3b6-4ded-9f64-f47a02854a10";
    /**
     * Creates a new outlining style.
     *
     * @param name - The name of the style.
     * @param material - The material to use for the style. The color controls the line color and the opacity controls the line thickness.
     *
     */
    create(name: string, material: THREE.MeshBasicMaterial): void;
    /**
     * Adds fragments to the specified outlining style.
     *
     * @param name - The name of the style.
     * @param items - The fragments to add to the style.
     *
     */
    add(name: string, items: FRAGS.FragmentIdMap): void;
    /**
     * Clears the specified style. If no style is specified, clear all styles.
     *
     * @param name - Optional: the style to clear.
     *
     */
    clear(name?: string): void;
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    private clearStyle;
    private getStyles;
    private getRenderer;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";
import { Section } from "../Sections";
/** The data that describes a plan view. */
export interface PlanView extends Section {
    /** The offset of the clipping plane to the plan height. */
    planOffset: number;
}
/**
 * Component to easily define and navigate 2D floor plans. 📕 [Tutorial](https://docs.thatopen.com/Tutorials/Components/Front/Plans). 📘 [API](https://docs.thatopen.com/api/@thatopen/components-front/classes/Plans).
 */
export declare class Plans extends OBC.Component implements OBC.Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "a80874aa-1c93-43a4-80f2-df346da086b1";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /** The plane type for the clipping planes created by this component. */
    readonly planeType = "floorplan";
    /**
     * Event triggered when the user navigates to a different floor plan.
     * The event provides the id of the floor plan the user navigated to.
     */
    readonly onNavigated: OBC.Event<{
        id: string;
    }>;
    /**
     * Event triggered when the user exits the floor plan view.
     */
    readonly onExited: OBC.Event<unknown>;
    /** {@link OBC.Component.enabled} */
    enabled: boolean;
    /** The floorplan that is currently selected. */
    currentPlan: PlanView | null;
    /** The offset from the clipping planes to their respective floor plan elevation. */
    offset: number;
    /**
     * A list of all the floor plans created.
     * Each floor plan is represented by a {@link PlanView} object.
     */
    list: PlanView[];
    private _cachedPlanCamera;
    /**
     * A reference to the world in which the floor plans are displayed.
     * This is used to access the camera and other relevant components.
     */
    get world(): OBC.World | undefined;
    /**
     * A reference to the world in which the floor plans are displayed.
     * This is used to access the camera and other relevant components.
     */
    set world(world: OBC.World | undefined);
    /** The offset of the 2D camera to the floor plan elevation. */
    get defaultCameraOffset(): number;
    /** The offset of the 2D camera to the floor plan elevation. */
    set defaultCameraOffset(value: number);
    constructor(components: OBC.Components);
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    /**
     * Generates floor plans from the provided IFC model.
     * @param model - The IFC model from which to generate floor plans.
     * @throws Will throw an error if the model does not have properties or if floor plans are not found.
     */
    generate(model: FRAGS.FragmentsGroup): Promise<void>;
    /**
     * Creates a new floor plan based on the provided configuration.
     *
     * @param config - The configuration object for the new floor plan.
     */
    create(config: {
        id: string;
        name?: string;
        point: THREE.Vector3;
        normal: THREE.Vector3;
        type?: string;
    }): void;
    /**
     * Navigates to the floor plan with the specified id.
     *
     * @param id - The id of the floor plan to navigate to.
     * @param animate - Whether to animate the camera movement. Default is false.
     */
    goTo(id: string, animate?: boolean): Promise<void>;
    /**
     * Exits the floor plan view and returns to the 3D view.
     *
     * @param animate - Whether to animate the camera movement. Default is false.
     */
    exitPlanView(animate?: boolean): Promise<void>;
    private cachePlanCamera;
    private applyCachedPlanCamera;
    private getAbsoluteFloorHeight;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";
export declare class PlanHighlighter {
    components: OBC.Components;
    private _scene;
    private _world;
    private offset;
    private markupLines;
    private currentCurveMesh?;
    private readonly markupMaterial;
    constructor(components: OBC.Components, scene: THREE.Object3D, world: OBC.World);
    showCurveInfo(curveMesh: FRAGS.CurveMesh): void;
    updateOffset(screenSize: {
        height: number;
        width: number;
    }, _zoom: number, _triggerRedraw: boolean): void;
    dispose(): void;
    private disposeMarkups;
    unSelect(): void;
    private calculateTangent;
    private calculateParallelCurve;
    private calculateDimensionLines;
    private offsetDimensionLine;
    private showLineInfo;
    private showClothoidInfo;
    private showCircularArcInfo;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { EdgesPlane } from "../../core";
/** The data that describes a section view. */
export interface Section {
    /** The human-readable name of this floor plan (e.g. "First floor"). */
    name: string;
    /** The unique identifier for this Section plan (e.g. "0w984V0GL6yR4z75YWgVfX"). */
    id: string;
    /** The clipping plane object that cuts the model. */
    plane: EdgesPlane;
    /** The offset of the camera to the clipping plane. */
    offset: number;
    /** The cached camera data of the view when the user exited it. */
    cached: {
        position: THREE.Vector3;
        target: THREE.Vector3;
        zoom: number;
        size: number;
    };
}
/**
 * A component to create and manage arbitrary sections for BIM models.
 */
export declare class Sections extends OBC.Component implements OBC.Disposable {
    enabled: boolean;
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "45b41ba3-7bb8-4e08-909f-e0fa87973965";
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /** Event that fires after navigating to ta section. */
    readonly onNavigated: OBC.Event<{
        id: string;
    }>;
    /** Event that fires after exiting the section navigation mode. */
    readonly onExited: OBC.Event<void>;
    /** The plane type for the clipping planes created by this component. */
    readonly planeType = "section";
    /** The default offset of the camera to the clipping plane. */
    offset: number;
    /** All the created sections. */
    list: Map<string, Section>;
    /** The current world where the sections are being created. */
    world?: OBC.World;
    /** The current section that is being navigated. */
    current: Section | null;
    private cached3DCamera;
    /**
     * Generates a section with the given data.
     * @param data - The required data to create a section.
     * @param data.id - The unique identifier of the section.
     * @param data.name - The human-readable name of the section.
     * @param data.point - The 3D point where the section plane lies.
     * @param data.normal - The unit vector that describes the orientation of the clipping plane.
     * @param data.type - The type to apply to the created clipping plane.
     * @param data.offset - The offset of the camera to the section.
     */
    create(data: {
        id: string;
        name?: string;
        point: THREE.Vector3;
        normal: THREE.Vector3;
        type?: string;
        offset?: number;
    }): Section;
    /**
     * Deletes the section with the given ID.
     * @param id - The identifier whose section to delete.
     */
    delete(id: string): void;
    /**
     * Goes to the section with the given ID.
     * @param id - The identifier whose section to delete.
     * @param animate - Whether to animate the transition.
     */
    goTo(id: string, animate?: boolean): Promise<void>;
    /**
     * Exits the section view mode.
     * @param animate - Whether to animate the transition.
     */
    exit(animate?: boolean): Promise<void>;
    /** {@link OBC.Disposable.onDisposed} */
    dispose(): void;
    private getWorld;
    private getCamera;
    private cacheCameraPosition;
    private hidePreviousClippingPlane;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { Mark } from "../../../core";
interface Area {
    points: THREE.Vector3[];
    workingPlane: THREE.Plane | null;
    area: number;
}
export declare class AreaMeasureElement implements OBC.Hideable, OBC.Disposable {
    enabled: boolean;
    points: THREE.Vector3[];
    workingPlane: THREE.Plane | null;
    labelMarker: Mark;
    world: OBC.World;
    components: OBC.Components;
    readonly onDisposed: OBC.Event<unknown>;
    readonly onAreaComputed: OBC.Event<number>;
    readonly onWorkingPlaneComputed: OBC.Event<THREE.Plane>;
    readonly onPointAdded: OBC.Event<THREE.Vector3>;
    readonly onPointRemoved: OBC.Event<THREE.Vector3>;
    private _visible;
    private _rotationMatrix;
    private _dimensionLines;
    private _defaultLineMaterial;
    /** {@link OBC.Hideable.visible} */
    get visible(): boolean;
    /** {@link OBC.Hideable.visible} */
    set visible(value: boolean);
    constructor(components: OBC.Components, world: OBC.World, points?: THREE.Vector3[]);
    setPoint(point: THREE.Vector3, index?: number): void;
    removePoint(index: number): void;
    toggleLabel(): void;
    private addDimensionLine;
    private getLinesBetweenIndex;
    computeWorkingPlane(): void;
    computeArea(): number;
    dispose(): void;
    get(): Area;
}
export {};
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { Mark } from "../../../core";
interface Angle {
    points: THREE.Vector3[];
    angle: number;
}
export declare class AngleMeasureElement implements OBC.Hideable, OBC.Disposable {
    enabled: boolean;
    visible: boolean;
    points: THREE.Vector3[];
    world: OBC.World;
    readonly onDisposed: OBC.Event<unknown>;
    private _lineMaterial;
    private _lineGeometry;
    private _line;
    private _labelMarker;
    readonly onAngleComputed: OBC.Event<number>;
    readonly onPointAdded: OBC.Event<unknown>;
    set lineMaterial(material: LineMaterial);
    get lineMaterial(): LineMaterial;
    set labelMarker(marker: Mark);
    get labelMarker(): Mark;
    get angle(): Angle;
    constructor(world: OBC.World, points?: THREE.Vector3[]);
    setPoint(point: THREE.Vector3, index?: 0 | 1 | 2): void;
    toggleLabel(): void;
    computeAngle(): number;
    dispose(): void;
}
export {};
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { CustomEffectsPass } from "./custom-effects-pass";
/**
 * Interface defining the settings for the post-processing effects.
 */
export interface PostproductionSettings {
    /**
     * Flag indicating whether to apply gamma correction.
     * Default: true
     */
    gamma?: boolean;
    /**
     * Flag indicating whether to apply custom effects.
     * Default: true
     */
    custom?: boolean;
    /**
     * Flag indicating whether to apply Ambient Occlusion (AO) effect.
     * Default: false
     */
    ao?: boolean;
}
/**
 * Class representing a post-processing effect manager for a 3D scene. It uses the EffectComposer from three.js to apply various post-processing effects. Thanks to [this](https://discourse.threejs.org/t/how-to-render-full-outlines-as-a-post-process-tutorial/22674).
 */
export declare class Postproduction {
    /**
     * The EffectComposer instance used for managing the post-processing effects.
     */
    readonly composer: EffectComposer;
    /**
     * Flag indicating whether to override the clipping planes of the renderer.
     * Default: false
     */
    overrideClippingPlanes: boolean;
    private readonly _components;
    private readonly _world;
    private readonly _renderTarget;
    private _enabled;
    private _initialized;
    private _n8ao?;
    private _customEffects?;
    private _basePass?;
    private _gammaPass?;
    private _depthTexture?;
    private _renderer;
    private _settings;
    /**
     * Getter for the base pass. Throws an error if the custom effects are not initialized.
     */
    get basePass(): RenderPass;
    /**
     * Getter for the gamma pass. Throws an error if the custom effects are not initialized.
     */
    get gammaPass(): ShaderPass;
    /**
     * Getter for the custom effects pass. Throws an error if the custom effects are not initialized.
     */
    get customEffects(): CustomEffectsPass;
    /**
     * Getter for the N8AO pass. Throws an error if the custom effects are not initialized.
     */
    get n8ao(): any;
    /**
     * Getter for the enabled state of the post-processing effects.
     */
    get enabled(): boolean;
    /**
     * Setter for the enabled state of the post-processing effects.
     * If the custom effects are not initialized, it calls the initialize method.
     * @param {boolean} active - The new enabled state.
     */
    set enabled(active: boolean);
    /**
     * Getter for the current post-processing settings.
     */
    get settings(): {
        /**
         * Flag indicating whether to apply gamma correction.
         * Default: true
         */
        gamma?: boolean | undefined;
        /**
         * Flag indicating whether to apply custom effects.
         * Default: true
         */
        custom?: boolean | undefined;
        /**
         * Flag indicating whether to apply Ambient Occlusion (AO) effect.
         * Default: false
         */
        ao?: boolean | undefined;
    };
    constructor(components: OBC.Components, renderer: THREE.WebGLRenderer, world: OBC.World);
    /**
     * Disposes of the resources held by the post-processing manager.
     * This method should be called when the post-processing manager is no longer needed.
     * It releases the memory occupied by the render target, depth texture, custom effects pass, gamma pass, and N8AO pass.
     */
    dispose(): void;
    /**
     * Sets the post-processing settings and updates the passes accordingly.
     * This method checks if the settings have changed before updating the passes.
     *
     * @param settings - The new post-processing settings.
     * @returns {void}
     */
    setPasses(settings: PostproductionSettings): void;
    /**
     * Sets the size of the render target and all related passes.
     * This method should be called when the window size changes to ensure that the post-processing effects are rendered correctly.
     *
     * @param width - The new width of the render target.
     * @param height - The new height of the render target.
     * @returns {void}
     */
    setSize(width: number, height: number): void;
    /**
     * Updates the post-processing effects.
     * This method checks if the post-processing effects are enabled before rendering.
     * If the effects are enabled, it calls the 'composer.render()' method to apply the effects.
     */
    update(): void;
    /**
     * Updates the camera settings for the post-processing effects.
     * This method is called whenever the camera settings change.
     * It updates the camera settings for the N8AO pass, custom effects pass, and base pass.
     */
    updateCamera(): void;
    /**
     * Updates the projection of the camera for the post-processing effects.
     * This method iterates over all passes in the EffectComposer and updates the camera property of each pass.
     * After updating the camera, it calls the update method to apply the changes.
     *
     * @param camera - The new camera to use for the post-processing effects.
     * @returns {void}
     */
    updateProjection(camera: THREE.Camera): void;
    private initialize;
    private updatePasses;
    private newCustomPass;
    private newGammaPass;
    private newSaoPass;
    private newBasePass;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";
import { Mark } from "../../core";
declare const CivilLabelArray: readonly ["Station", "Radius", "Length", "InitialKP", "FinalKP", "KP", "Slope", "Height", "InitialKPV", "FinalKPV"];
type CivilLabel = (typeof CivilLabelArray)[number];
/**
 * A component for displaying civil engineering markers in a 3D scene.
 */
export declare class CivilMarker extends OBC.Component {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "0af12c32-81ee-4100-a030-e9ae546f6170";
    /** {@link OBC.Component.enabled} */
    enabled: boolean;
    /**
     * A reference to the 3D world in which the markers will be displayed.
     * This property should be set before using any methods of this component.
     */
    world: OBC.World | null;
    protected _markerKey: number;
    private _list;
    private type;
    private divisionLength;
    constructor(components: OBC.Components);
    /**
     * Adds a KP station marker to the world.
     *
     * @param world - The world to add the marker to.
     * @param text - The text to display on the marker.
     * @param mesh - The line representing the KP station.
     *
     * @returns {void}
     */
    addKPStation(world: OBC.World, text: string, mesh: THREE.Line): void;
    /**
     * Adds a vertical marker to the 3D world based on the given parameters.
     *
     * @param world - The 3D world where the marker will be added.
     * @param text - The text to be displayed on the marker.
     * @param mesh - The mesh data related to the marker.
     * @param type - The type of the marker.
     * @param root - The root object for the marker.
     *
     * @returns The created and added marker.
     */
    addVerticalMarker(world: OBC.World, text: string, mesh: FRAGS.CurveMesh, type: CivilLabel, root: THREE.Object3D): Mark;
    /**
     * Adds a civil engineering marker to the world based on the given type.
     *
     * @param world - The world to add the marker to.
     * @param text - The text to display on the marker.
     * @param mesh - The mesh related to the marker.
     * @param type - The type of the marker.
     *
     * @returns The created marker.
     */
    addCivilMarker(world: OBC.World, text: string, mesh: FRAGS.CurveMesh, type: CivilLabel): Mark;
    /**
     * Shows the KP stations on the given mesh.
     *
     * @param mesh - The mesh to show the KP stations on.
     * @throws Will throw an error if a world is not set for this component.
     * @throws Will throw an error if the type is not set to "horizontal".
     */
    showKPStations(mesh: FRAGS.CurveMesh): void;
    /**
     * Shows the length of a curve on the world.
     *
     * @param points - The points that make up the curve.
     * @param length - The length of the curve.
     * @throws Will throw an error if a world is not set for this component.
     */
    showCurveLength(points: THREE.Vector3[], length: number): void;
    /**
     * Shows the length of a line on the world.
     *
     * @param line - The line to show the length on.
     * @param length - The length of the line.
     * @throws Will throw an error if a world is not set for this component.
     */
    showLineLength(line: THREE.Line, length: number): void;
    /**
     * Shows the radius of a curve on the world.
     *
     * @param line - The line to show the radius on.
     * @param radius - The radius of the curve.
     * @throws Will throw an error if a world is not set for this component.
     */
    showCurveRadius(line: THREE.Line, radius: number): void;
    /**
     * Deletes civil engineering markers of the specified types from the world.
     *
     * @param types - The types of markers to delete. If not provided, all types will be deleted.
     * @returns {void}
     */
    deleteByType(types?: Iterable<CivilLabel>): void;
    private generateStartAndEndKP;
    private createNormalLine;
    private generateConstantKP;
    private getNormal;
    private getShortendKPValue;
    private save;
}
export {};
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { LineBasicMaterial } from "three";
import { ClipStyle } from "./types";
/**
 * A type representing a dictionary of {@link ClipStyle} objects, where the keys are the names of the styles.
 */
export type LineStyles = {
    [name: string]: ClipStyle;
};
/**
 * A class representing styles for clipping edges in a 3D scene.
 */
export declare class EdgesStyles implements OBC.Disposable, OBC.Updateable {
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /**
     * A boolean indicating whether the styles are enabled.
     * Default value is 'true'.
     */
    enabled: boolean;
    /**
     * A dictionary of {@link ClipStyle} objects, where the keys are the names of the styles.
     * Default value is an empty object.
     */
    list: LineStyles;
    protected _defaultLineMaterial: THREE.LineBasicMaterial;
    /** {@link OBC.Updateable.onAfterUpdate} */
    onAfterUpdate: OBC.Event<LineStyles>;
    /** {@link OBC.Updateable.onBeforeUpdate} */
    onBeforeUpdate: OBC.Event<LineStyles>;
    /** {@link OBC.Updateable.update} */
    update(_delta: number): void;
    /**
     * Creates a new style that applies to all clipping edges for generic models.
     *
     * @param name - The name of the style.
     * @param meshes - A set of meshes to apply the style to.
     * @param world - The world where the meshes are located.
     * @param lineMaterial - The material for the lines of the style. If not provided, the default material is used.
     * @param fillMaterial - The material for the fill of the style.
     * @param outlineMaterial - The material for the outline of the style.
     *
     * @returns The newly created style.
     *
     * @throws Will throw an error if the given world doesn't have a renderer.
     */
    create(name: string, meshes: Set<THREE.Mesh>, world: OBC.World, lineMaterial?: LineBasicMaterial, fillMaterial?: THREE.Material, outlineMaterial?: THREE.MeshBasicMaterial): ClipStyle;
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    /**
     * Deletes a style from the list and optionally disposes of its materials.
     *
     * @param id - The id of the style to delete.
     * @param disposeMaterials - A boolean indicating whether to dispose of the materials associated with the style.
     *                           Default value is 'true'.
     *
     * @throws Will throw an error if the style with the given id doesn't exist in the list.
     */
    deleteStyle(id: string, disposeMaterials?: boolean): void;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { ClippingEdges } from "./clipping-edges";
/**
 * A more advanced version of Clipper planes that also includes edges and fills.
 */
export declare class EdgesPlane extends OBC.SimplePlane {
    readonly edges: ClippingEdges;
    /**
     * The max rate in milliseconds at which edges can be regenerated.
     * To disable this behaviour set this to 0.
     */
    edgesMaxUpdateRate: number;
    protected _visible: boolean;
    protected _edgesVisible: boolean;
    /**
     * Getter for the visibility state of the plane.
     * @returns {boolean} The current visibility state.
     */
    get visible(): boolean;
    /**
     * Setter for the visibility state of the plane.
     * Also toggles the visibility of the controls.
     * @param {boolean} state - The new visibility state.
     */
    set visible(state: boolean);
    /**
     * Setter for the enabled state of the plane.
     * Also sets the enabled state in the renderer.
     * @param {boolean} state - The new enabled state.
     */
    set enabled(state: boolean);
    /**
     * Getter for the enabled state of the plane.
     * @returns {boolean} The current enabled state.
     */
    get enabled(): boolean;
    constructor(components: OBC.Components, world: OBC.World, origin: THREE.Vector3, normal: THREE.Vector3, material: THREE.Material, size?: number, activateControls?: boolean);
    /**
     * Disposes of the EdgesPlane and its associated ClippingEdges.
     * This method should be called when the EdgesPlane is no longer needed to free up resources.
     * After calling this method, the EdgesPlane and its ClippingEdges should not be used anymore.
     */
    dispose(): void;
    /**
     * Updates the fill of the edges.
     * This method sets the 'fillNeedsUpdate' flag to true, triggers the 'update' method of the 'edges',
     * and sets the visibility of the 'edges' to the current value of '_visible'.
     *
     * @returns {void}
     */
    updateFill: () => void;
}
export declare function newDimensionMark(): HTMLDivElement;
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
/**
 * A class to manage and highlight edges fill meshes based on selected fragments. Useful for highlighting sectioned elements in floorplan and section views.
 */
export declare class FillHighlighter {
    private _meshes;
    /**
     * Highlights edges fill meshes based on selected fragments.
     */
    highlight(name: string, mesh: THREE.Mesh, color: THREE.Color, selection: FRAGS.FragmentIdMap): void;
    /**
     * Clears the highlighted meshes for a specific style or all styles.
     *
     * @param name - The name of the style to clear. If not provided, clears all styles.
     *
     */
    clear(name?: string): void;
    dispose(): void;
}
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { Edge } from "./types";
/**
 * Type definition for the Edges object. The Edges object is a dictionary where the keys are strings and the values are of type {@link Edge}. It is used to store and manage multiple {@link Edge} instances, each identified by a unique name.
 */
export type Edges = {
    [name: string]: Edge;
};
/**
 * Class representing the ClippingEdges component. This is responsible for managing and rendering the edges of clipped objects.
 */
export declare class ClippingEdges implements OBC.Hideable, OBC.Disposable, OBC.Updateable {
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /** {@link OBC.Updateable.onAfterUpdate} */
    onAfterUpdate: OBC.Event<Edge[]>;
    /** {@link OBC.Updateable.onBeforeUpdate} */
    onBeforeUpdate: OBC.Event<Edge[]>;
    /** Indicates whether the component is enabled. */
    enabled: boolean;
    /** Indicates whether the fill needs to be updated. */
    fillNeedsUpdate: boolean;
    /** Reference to the components manager. */
    components: OBC.Components;
    /** Reference to the world. */
    world: OBC.World;
    protected _edges: Edges;
    protected _visible: boolean;
    protected _inverseMatrix: THREE.Matrix4;
    protected _localPlane: THREE.Plane;
    protected _tempLine: THREE.Line3;
    protected _tempVector: THREE.Vector3;
    protected _plane: THREE.Plane;
    /** {@link OBC.Hideable.visible} */
    get visible(): boolean;
    /** {@link OBC.Hideable.visible} */
    set visible(visible: boolean);
    /**
     * Getter that returns an array of THREE.Mesh instances representing the fills of the edges.
     *
     * @returns An array of THREE.Mesh instances representing the fills of the edges.
     */
    get fillMeshes(): THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>[];
    constructor(components: OBC.Components, world: OBC.World, plane: THREE.Plane);
    /** {@link OBC.Updateable.update} */
    update(): void;
    get(): Edges;
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
    private newEdgesMesh;
    private newFillMesh;
    private newFillOutline;
    private drawEdges;
    private initializeStyle;
    private shapecast;
    private updateDeletedEdges;
    private disposeOutline;
    private disposeEdge;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
type CivilHighlightType = "horizontal" | "absolute" | "vertical";
export declare class CurveHighlighter {
    protected scene: THREE.Object3D;
    static settings: {
        colors: {
            [curve: string]: number[];
        };
    };
    readonly onSelect: OBC.Event<FRAGS.CurveMesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[]>>;
    type: CivilHighlightType;
    selectCurve: Line2;
    selectPoints: THREE.Points;
    hoverCurve: Line2;
    hoverPoints: THREE.Points;
    caster: THREE.Raycaster;
    constructor(scene: THREE.Object3D, type: CivilHighlightType);
    dispose(): void;
    castRay(event: MouseEvent, camera: THREE.Camera, dom: HTMLElement, meshes: FRAGS.CurveMesh[]): THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>> | null;
    select(mesh: FRAGS.CurveMesh): void;
    unSelect(): void;
    hover(mesh: FRAGS.CurveMesh): void;
    unHover(): void;
    setResolution({ x, y }: THREE.Vector2): void;
    protected highlight(mesh: FRAGS.CurveMesh, curve: Line2, points: THREE.Points, useColors: boolean): void;
    private newCurve;
    private newPoints;
}
export {};
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { ClippingFills } from "./clipping-fills";
/**
 * A style defines the appearance of the lines of the {@link ClippingEdges} for a set of meshes.
 */
export interface ClipStyle {
    /** The name of the style. */
    name: string;
    /** The meshes where the style will be applied. */
    meshes: Set<THREE.Mesh | THREE.InstancedMesh>;
    /**
     * The material that defines the appearance of the lines of the
     * {@link ClippingEdges}.
     */
    lineMaterial: THREE.LineBasicMaterial;
    /** The IDs of the fragment items that are clipped by this style. */
    fragments: FRAGS.FragmentIdMap;
    /**
     * The material that defines the appearance of the fill of the
     * {@link ClippingEdges}.
     */
    fillMaterial?: THREE.Material;
    /**
     * The material that defines the appearance of the outline of the
     * {@link ClippingEdges}. This requires to use the {@link PostproductionRenderer}
     * and {@link fillMaterial}.
     */
    outlineMaterial?: THREE.MeshBasicMaterial;
}
/**
 * The lines that are drawn when the clipping plane cuts the geometry specified by the {@link ClipStyle}.
 */
export interface Edge {
    /** The name of the style to which this Edges belong. */
    name: string;
    /** The visible clipping lines in the scene. */
    mesh: THREE.LineSegments;
    /** The fill of the section. */
    fill?: ClippingFills;
}
/**
 * A line segments geometry whose [BVH](https://github.com/gkjohnson/three-mesh-bvh) has been computed.
 */
export interface BvhLineSegmentsGeometry extends LineSegmentsGeometry {
    /** The computed BVH. */
    boundsTree: any;
    /** Disposes the data of the computed BVH. */
    disposeBoundsTree: () => void;
}
/**
 * A map used to map the triangles of the clipping fill with the original fragment item. It's used to be able to trace to which elements a specific triangle of the clipping fill's face belongs (e.g. for highlighting an item when selecting one of its clipping fills).
 */
export type IndexFragmentMap = Map<number, FRAGS.FragmentIdMap>;
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import { IndexFragmentMap } from "./types";
/**
 * Class for managing and rendering the fills of a clipping plane.
 */
export declare class ClippingFills {
    /**
     * The THREE.js mesh representing the fills.
     */
    mesh: THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>;
    /**
     * The components instance associated with the clipping fills.
     */
    components: OBC.Components;
    /**
     * The world in which the clipping plane and fills exist.
     */
    world: OBC.World;
    /**
     * The name of the style associated with this clipping fills.
     */
    styleName?: string;
    private _precission;
    private _tempVector;
    private _plane;
    private _geometry;
    private _outlinedMesh;
    private _plane2DCoordinateSystem;
    private _planeAxis?;
    /**
     * Gets the visibility of the clipping fills mesh.
     * @returns {boolean} Returns true if the mesh is visible, false otherwise.
     */
    get visible(): boolean;
    /**
     * Sets the visibility of the clipping fills mesh.
     * @param {boolean} value - The new visibility state. If true, the mesh will be added to the scene and the style's meshes set. If false, the mesh will be removed from the scene and the style's meshes set.
     */
    set visible(value: boolean);
    /**
     * Sets the geometry of the clipping fills mesh.
     * @param {THREE.BufferGeometry} geometry - The new geometry for the mesh. The position attribute of the geometry will be assigned to the mesh's geometry.
     */
    set geometry(geometry: THREE.BufferGeometry);
    constructor(components: OBC.Components, world: OBC.World, plane: THREE.Plane, geometry: THREE.BufferGeometry, material: THREE.Material);
    /**
     * Disposes of the clipping fills mesh and its associated resources.
     * This method should be called when the clipping fills are no longer needed to free up memory.
     */
    dispose(): void;
    /**
     * Updates the clipping fills mesh with new indices.
     *
     * @param trianglesIndices - An array of indices representing triangles in the geometry.
     * @param indexFragMap - A map that allows to trace back the original fragment and id from each triangle of the fill mesh.
     *
     */
    update(trianglesIndices: number[], indexFragMap: IndexFragmentMap): void;
    private computeFill;
    private updatePlane2DCoordinateSystem;
    private getStyleAndScene;
}
import * as FRAGS from "@thatopen/fragments";
import * as THREE from "three";
import * as OBC from "@thatopen/components";
/**
 * A renderer to determine a geometry visibility on screen
 */
export declare class GeometryCullerRenderer extends OBC.CullerRenderer {
    threshold: number;
    bboxThreshold: number;
    maxLostTime: number;
    maxHiddenTime: number;
    boxes: Map<number, FRAGS.Fragment>;
    private _staticGeometries;
    private readonly _geometry;
    private _material;
    readonly onViewUpdated: OBC.AsyncEvent<{
        toLoad: {
            [modelID: string]: Map<number, Set<number>>;
        };
        toRemove: {
            [modelID: string]: Set<number>;
        };
        toHide: {
            [modelID: string]: Set<number>;
        };
        toShow: {
            [modelID: string]: Set<number>;
        };
    }>;
    private _modelIDIndex;
    private _indexModelID;
    private _nextModelID;
    private _geometries;
    private _geometriesGroups;
    private _geometriesInMemory;
    private _intervalID;
    private codes;
    constructor(components: OBC.Components, world: OBC.World);
    dispose(): void;
    add(modelID: string, assets: OBC.StreamedAsset[], geometries: OBC.StreamedGeometries): void;
    remove(modelID: string): void;
    addFragment(modelID: string, geometryID: number, frag: FRAGS.Fragment): void;
    removeFragment(modelID: string, geometryID: number): void;
    setModelTransformation(modelID: string, transform: THREE.Matrix4): void;
    setVisibility(visible: boolean, modelID: string, geometryIDsAssetIDs: Map<number, Set<number>>): void;
    updateTransformations(modelID: string): void;
    addStaticGeometries(geometries: {
        [modelID: string]: Set<number>;
    }, culled?: boolean): Promise<void>;
    removeStaticGeometries(geometries: {
        [modelID: string]: Set<number>;
    }, culled?: boolean): void;
    cancel(items: {
        [modelID: string]: Set<number>;
    }): void;
    getBoundingBoxes(items: {
        [modelID: number]: Iterable<number>;
    }): FRAGS.FragmentsGroup;
    getInstanceID(assetID: number, geometryID: number): number;
    private setGeometryVisibility;
    private handleWorkerMessage;
    private handleLostGeometries;
    private createModelIndex;
}
import * as OBC from "@thatopen/components";
/**
 * Represents an instance of a streamed object.
 */
export interface StreamedInstance {
    /**
     * Unique identifier of the instance.
     */
    id: number;
    /**
     * Color of the instance.
     */
    color: number[];
    /**
     * Transformation matrix of the instance.
     */
    transformation: number[];
}
/**
 * A map of streamed instances, grouped by their unique identifier.
 */
export type StreamedInstances = Map<number, StreamedInstance[]>;
/**
 * Settings for the stream loader.
 */
export interface StreamLoaderSettings {
    /**
     * Array of streamed assets.
     */
    assets: OBC.StreamedAsset[];
    /**
     * Streamed geometries.
     */
    geometries: OBC.StreamedGeometries;
    /**
     * Identifier of the global data file.
     */
    globalDataFileId: string;
}
/**
 * Settings for the stream properties.
 */
export interface StreamPropertiesSettings {
    /**
     * Map of identifiers to numbers.
     */
    ids: {
        [id: number]: number;
    };
    /**
     * Map of types to arrays of numbers.
     */
    types: {
        [type: number]: number[];
    };
    /**
     * Identifier of the indexes file.
     */
    indexesFile: string;
}
import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Components, SimpleRenderer } from "@thatopen/components";
/**
 * A basic renderer capable of rendering 3D and 2D objects ([Objec3Ds](https://threejs.org/docs/#api/en/core/Object3D) and [CSS2DObjects](https://threejs.org/docs/#examples/en/renderers/CSS2DRenderer) respectively).
 */
export declare class RendererWith2D extends SimpleRenderer {
    /**
     * This renderer is used to render 2D objects (CSS2DObjects) in a 3D scene.
     */
    three2D: CSS2DRenderer;
    constructor(components: Components, container: HTMLElement, parameters?: Partial<THREE.WebGLRendererParameters>);
    private setupHtmlRenderer;
}
import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import * as OBC from "@thatopen/components";
/**
 * Represents a marker in the 3D world.
 */
export declare class Mark implements OBC.Hideable, OBC.Disposable {
    /**
     * The CSS object representing the marker.
     */
    three: CSS2DObject;
    /**
     * The world in which the marker exists.
     */
    world: OBC.World;
    /** {@link OBC.Disposable.onDisposed} */
    readonly onDisposed: OBC.Event<unknown>;
    /** {@link OBC.Hideable.visible} */
    set visible(value: boolean);
    /** {@link OBC.Hideable.visible} */
    get visible(): boolean;
    constructor(world: OBC.World, element?: HTMLElement, parent?: THREE.Object3D);
    /**
     * Toggles the visibility of the marker.
     *
     * This method changes the 'visible' property of the marker to its opposite value.
     * If the marker is currently visible, it will be hidden, and vice versa.
     *
     * @returns {void}
     */
    toggleVisibility(): void;
    /** {@link OBC.Disposable.dispose} */
    dispose(): void;
}
import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";
import { Pass, FullScreenQuad } from "three/examples/jsm/postprocessing/Pass.js";
export declare class CustomEffectsPass extends Pass {
    components: OBC.Components;
    resolution: THREE.Vector2;
    renderScene: THREE.Scene;
    renderCamera: THREE.Camera;
    fsQuad: FullScreenQuad;
    normalOverrideMaterial: THREE.ShaderMaterial;
    glossOverrideMaterial: THREE.ShaderMaterial;
    planeBuffer: THREE.WebGLRenderTarget;
    glossBuffer: THREE.WebGLRenderTarget;
    outlineBuffer: THREE.WebGLRenderTarget;
    excludedMeshes: THREE.Mesh[];
    outlinedMeshes: {
        [name: string]: {
            meshes: Set<THREE.InstancedMesh | THREE.Mesh | FRAGS.FragmentMesh>;
            material: THREE.MeshBasicMaterial;
        };
    };
    outlineScene: THREE.Scene;
    private _outlineEnabled;
    private _lineColor;
    private _opacity;
    private _tolerance;
    private _glossEnabled;
    private _glossExponent;
    private _minGloss;
    private _maxGloss;
    get lineColor(): number;
    set lineColor(lineColor: number);
    get tolerance(): number;
    set tolerance(value: number);
    get opacity(): number;
    set opacity(value: number);
    get glossEnabled(): boolean;
    set glossEnabled(active: boolean);
    get glossExponent(): number;
    set glossExponent(value: number);
    get minGloss(): number;
    set minGloss(value: number);
    get maxGloss(): number;
    set maxGloss(value: number);
    get outlineEnabled(): boolean;
    set outlineEnabled(active: boolean);
    constructor(resolution: THREE.Vector2, components: OBC.Components, world: OBC.World, scene: THREE.Scene, camera: THREE.Camera);
    dispose(): Promise<void>;
    setSize(width: number, height: number): void;
    render(renderer: THREE.WebGLRenderer, writeBuffer: any, readBuffer: any): void;
    get vertexShader(): string;
    get fragmentShader(): string;
    createOutlinePostProcessMaterial(): THREE.ShaderMaterial;
    private newRenderTarget;
}
import * as THREE from "three";
export declare function getPlaneDistanceMaterial(): THREE.ShaderMaterial;
import * as THREE from "three";
export declare function getProjectedNormalMaterial(): THREE.ShaderMaterial;
declare module "n8ao";
export {};

}