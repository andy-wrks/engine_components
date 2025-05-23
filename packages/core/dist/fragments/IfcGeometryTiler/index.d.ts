import * as WEBIFC from "web-ifc";
import { Components, Disposable, Event, Component, AsyncEvent } from "../../core";
import { IfcStreamingSettings, StreamedGeometries, StreamedAsset } from "./src";
export * from "./src";
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
     * ```typescript
     * const ifcData = await fetch('path/to/ifc/file.ifc');
     * const rawBuffer = await response.arrayBuffer();
     * const ifcBuffer = new Uint8Array(rawBuffer);
     * await ifcGeometryTiler.streamFromBuffer(ifcBuffer);
     * ```
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
