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
     * The classification is stored in the `list.models` property,
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
     * The classification is stored in the `list.predefinedTypes` property,
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
     * The classification is stored in the `list.entities` property,
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
     * The classification is stored in the `list` property under the specified system name,
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
     * The classification is stored in the `list` property under the system name "spatialStructures",
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
     * and sets their color using the `setColor` method of the FragmentsGroup class.
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
     * and resets their color using the `resetColor` method of the FragmentsGroup class.
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
