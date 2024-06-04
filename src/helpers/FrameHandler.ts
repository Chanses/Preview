type FrameCallback = (delta: number) => void;

/**
 * TODO:
 */
export class FrameHandler {
    /**
     * TODO:
     */
    private rafTime: number;

    /**
     * TODO:
     */
    private rafHandle: number;

    /**
     * TODO:
     */
    private readonly handler: FrameCallback;

    /**
     * TODO:
     * @param handler
     */
    public constructor(handler: FrameCallback) {
        this.rafHandle = -1;
        this.rafTime = 0;
        this.handler = handler;
        this.frame = this.frame.bind(this);
    }

    /**
     * TODO:
     */
    public start() {
        this.stop();
        this.rafTime = performance.now();
        this.frame(this.rafTime);
    }

    /**
     * TODO:
     */
    public stop() {
        if (this.rafHandle !== -1) {
            cancelAnimationFrame(this.rafHandle);
            this.rafHandle = -1;
        }
    }

    /**
     * TODO:
     * @param time
     */
    private frame(time: number) {
        this.rafHandle = requestAnimationFrame(this.frame);
        const delta = (time - this.rafTime) / 16.666;
        this.rafTime = time;
        this.handler(delta);
    }
}
