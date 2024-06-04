import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from 'three';
import { FrameHandler } from '../helpers/FrameHandler';

export class Preview {
    /**
     * Main Canvas
     * @private
     */
    private readonly canvas: HTMLCanvasElement;

    /**
     * Resize Observer
     * @private
     */
    private readonly resizeObserver: ResizeObserver;

    /**
     * Main buffer
     * @private
     */
    private readonly renderer: WebGLRenderer;

    /**
     * Main camera
     * @private
     */
    private readonly camera: PerspectiveCamera;

    /**
     * Main scene
     * @private
     */
    private readonly scene: Scene;

    /**
     * Frame handler
     * @private
     */
    private readonly frameHandler: FrameHandler;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
        this.camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.z = 5;
        this.scene = new Scene();

        const box = new Mesh(new BoxGeometry(), new MeshBasicMaterial());
        this.scene.add(this.camera, box);

        this.update = this.update.bind(this);
        this.resize = this.resize.bind(this);
        this.resizeObserver = new ResizeObserver(this.resize);
        this.resizeObserver.observe(this.canvas);
        this.frameHandler = new FrameHandler(this.update);
        this.resize();
        this.frameHandler.start();
    }

    /**
     * Update logic
     * @private
     */
    private update(_delta: number) {
        this.render();
    }

    /**
     * Update render
     * @private
     */
    private render() {
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Update on resize
     * @private
     */
    private resize() {
        const { width, height } = this.canvas.getBoundingClientRect();
        const dpi = window.devicePixelRatio;
        const w = width * dpi;
        const h = height * dpi;

        this.canvas.width = w;
        this.canvas.height = h;

        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h, false);
    }

    /**
     * Clear
     */
    public dispose() {
        this.resizeObserver.disconnect();
        this.frameHandler.stop();
    }
}
