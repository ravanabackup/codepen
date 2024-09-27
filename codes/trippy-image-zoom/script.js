"use strict";
console.clear();
const baseUrl = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/";
//
// APPLICATION
// ===========================================================================
class Application extends PIXI.Application {
    constructor(animationOptions) {
        super({
            view: document.querySelector("#view"),
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x000000,
            autoStart: false
        });
        this.animationOptions = animationOptions;
        this.isResized = true;
        this.zoomSize = 1200;
        this.textures = [];
        this.groupedTextures = [];
        this.loader.baseUrl = baseUrl;
    }
    load(manifest, callback) {
        this.loader
            .add("tone", `shepard-tone-8.mp3`)
            .add(manifest)
            .load(() => {
            callback && callback();
            this.init();
        });
    }
    init() {
        this.createTextures();
        this.container = new PIXI.Container();
        this.stage.addChild(this.container);
        this.animator = new Animator(this, this.animationOptions);
        this.container.filters = [new PIXI.filters.AlphaFilter()];
        this.container.filterArea = this.screen;
        this.stage.filterArea = this.screen;
        this.stage.filters = this.animator.filters;
        this.renderer.plugins.prepare.upload(this.stage, () => {
            window.addEventListener("resize", () => this.isResized = true);
            this.ticker.add(this.update, this);
            this.start();
            this.sound.play();
            this.animator.play();
            TweenLite.to(this.view, 0.8, { autoAlpha: 1 });
        });
    }
    createTextures() {
        const resources = this.loader.resources;
        this.sound = PIXI.sound.Sound.from({
            source: resources.tone.data,
            volume: 0.01,
            speed: 0.1,
            autoPlay: false,
            singleInstance: true,
        });
        let minWidth = Infinity;
        let minHeight = Infinity;
        const tempTextures = [];
        Object.keys(resources).forEach(key => {
            if (resources[key].texture) {
                const texture = resources[key].texture;
                minWidth = Math.min(minWidth, texture.frame.width);
                minHeight = Math.min(minHeight, texture.frame.height);
                tempTextures.push(texture);
            }
        });
        this.zoomSize = Math.min(minWidth, minHeight);
        this.frameSize = new PIXI.Rectangle(0, 0, minWidth, minHeight);
        // Create a new baseTexture for an image set to improve performance
        for (let i = 0; i < tempTextures.length; i += 3) {
            const tempTexture1 = tempTextures[i];
            const tempTexture2 = tempTextures[i + 1];
            const tempTexture3 = tempTextures[i + 2];
            const frame1 = new PIXI.Rectangle(0, 0, minWidth, minHeight);
            const frame2 = new PIXI.Rectangle(minWidth, 0, minWidth, minHeight);
            const frame3 = new PIXI.Rectangle(0, minHeight, minWidth, minHeight);
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = minWidth * 2;
            canvas.height = minHeight * 2;
            context.drawImage(tempTexture1.baseTexture.source, 0, 0, minWidth, minHeight);
            context.drawImage(tempTexture2.baseTexture.source, minWidth, 0, minWidth, minHeight);
            context.drawImage(tempTexture3.baseTexture.source, 0, minHeight, minWidth, minHeight);
            const baseTexture = PIXI.BaseTexture.fromCanvas(canvas);
            const texture1 = new PIXI.Texture(baseTexture, frame1);
            const texture2 = new PIXI.Texture(baseTexture, frame2);
            const texture3 = new PIXI.Texture(baseTexture, frame3);
            this.textures.push(texture1, texture2, texture3);
            this.groupedTextures.push([texture1, texture2, texture3]);
            tempTexture1.destroy(true);
            tempTexture2.destroy(true);
            tempTexture3.destroy(true);
        }
    }
    resize() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const cx = vw / 2;
        const cy = vh / 2;
        const viewSize = Math.sqrt(vw * vw + vh * vh);
        const scale = viewSize / this.zoomSize;
        const radius = Math.min(vw, vh) / 2.1;
        this.renderer.resize(vw, vh);
        this.container.scale.set(scale);
        this.container.position.set(cx, cy);
        this.animator.filterPoint.set(cx, cy);
        this.animator.bulgePinchFilter.radius = radius;
    }
    update() {
        if (this.isResized) {
            this.resize();
            this.isResized = false;
        }
    }
}
//
// ANIMATOR
// ===========================================================================
class Animator {
    constructor(app, options) {
        this.app = app;
        this.options = options;
        this.mainTimeline = new TimelineMax({
            repeat: -1,
            yoyo: true,
            paused: true,
            onRepeat: () => {
                this.app.sound.play();
            }
        });
        this.zoomTimeline = new TimelineMax({
            repeat: -1,
            paused: true
        });
        this.rotateTimeline = new TimelineMax({
            repeat: -1,
            paused: true
        });
        this.filterPoint = new PIXI.Point();
        this.zoomFilter = new PIXI.filters.ZoomBlurFilter(0, this.filterPoint, 0);
        this.bulgePinchFilter = new PIXI.filters.BulgePinchFilter([0.5, 0.5], 600, -0.35);
        this.bloomFilter = new PIXI.filters.AdvancedBloomFilter({ threshold: 1 });
        this.filters = [
            this.zoomFilter,
            this.bulgePinchFilter,
            this.bloomFilter
        ];
        this.createZoomContainers();
        this.buildTimelines();
    }
    play() {
        this.mainTimeline.play(0);
    }
    createZoomContainers() {
        const app = this.app;
        const filterArea = app.screen;
        const container = app.container;
        const zoomTimeline = this.zoomTimeline;
        const options = this.options;
        const fade = options.fade;
        const startScale = options.startScale;
        const endScale = options.endScale;
        const scaleDifference = endScale - startScale;
        const extendedScale = endScale + scaleDifference * 2;
        const ease = ExpoScaleEase.config(startScale, endScale);
        const extendedEase = ExpoScaleEase.config(endScale, extendedScale);
        const partialScale = endScale + extendedEase.getRatio(fade / 1) * (extendedScale - endScale);
        const partialEase = ExpoScaleEase.config(endScale, partialScale);
        const repeats = options.repeats;
        const fadeTime = options.fadeTime;
        const delay = `-=${fadeTime}`;
        let lastContainer;
        app.groupedTextures.forEach((textures, index) => {
            const zoomContainer = new ZoomContainer({
                index,
                filterArea,
                startScale,
                endScale,
                ease,
                fade,
                partialScale,
                partialEase,
                repeats,
                textures
            });
            if (lastContainer) {
                zoomTimeline
                    .to(lastContainer.alphaFilter, fadeTime, { alpha: 0, ease: Power1.easeIn }, delay)
                    .set(lastContainer, { visible: false });
            }
            zoomTimeline
                .to(zoomContainer.alphaFilter, fadeTime, { alpha: 1, ease: Power1.easeOut }, delay)
                .set(zoomContainer, { visible: true }, delay);
            zoomTimeline.add(zoomContainer.timeline, delay);
            container.addChild(zoomContainer);
            lastContainer = zoomContainer;
        });
    }
    buildTimelines() {
        const options = this.options;
        const duration = options.duration;
        const filterDuration = duration * 0.2;
        const filterDelayIn = duration * 0.15;
        const filterDelayOut = `-=${filterDelayIn + filterDuration}`;
        const baseEase = Sine.easeInOut;
        const ease = ExpoScaleEase.config(1, 2, baseEase);
        const soundDuration = duration / this.app.groupedTextures.length * 2;
        this.rotateTimeline.to(this.app.container, 2, {
            rotation: Math.PI * 2,
            ease: Linear.easeNone,
        });
        this.mainTimeline
            .to(this.rotateTimeline, duration, { progress: options.rotations, ease }, 0)
            .to(this.zoomTimeline, duration, { progress: 1, ease }, 0)
            .to(this.zoomFilter, filterDuration, { strength: 0.1, ease: Power2.easeIn }, filterDelayIn)
            .to(this.zoomFilter, filterDuration, { strength: 0, ease: Power2.easeOut }, filterDelayOut)
            .to(this.bulgePinchFilter, filterDuration, { strength: 0.5, ease: Power2.easeIn }, filterDelayIn)
            .to(this.bulgePinchFilter, filterDuration, { strength: -0.35, ease: Power2.easeOut }, filterDelayOut)
            .to(this.bloomFilter, filterDuration, { threshold: 0.8, ease: Power2.easeIn }, filterDelayIn)
            .to(this.bloomFilter, filterDuration, { threshold: 1, ease: Power2.easeOut }, filterDelayOut)
            .to(this.app.sound, soundDuration, { volume: 0.9, speed: 1, ease }, 0)
            .to(this.app.sound, soundDuration, { volume: 0.01, speed: 0.1, ease }, `-=${soundDuration}`)
            .duration(duration);
    }
}
//
// ZOOM CONTAINER
// ===========================================================================
class ZoomContainer extends PIXI.Container {
    constructor(options) {
        super();
        this.options = options;
        this.alphaFilter = new PIXI.filters.AlphaFilter(0);
        this.filters = [this.alphaFilter];
        this.filterArea = this.options.filterArea;
        this.timeline = new TimelineMax();
        this.visible = false;
        const { startScale, endScale, ease, fade, partialScale, partialEase } = options;
        const delay = `-=${fade}`;
        let lastSprite;
        for (let i = 0; i < options.repeats; i++) {
            options.textures.forEach(texture => {
                const sprite = new PIXI.Sprite(texture);
                sprite.alpha = 0;
                sprite.visible = false;
                sprite.anchor.set(0.5);
                sprite.scale.set(startScale);
                this.addChild(sprite);
                if (lastSprite) {
                    this.timeline
                        .to(lastSprite, fade, { pixi: { scale: partialScale }, ease: partialEase })
                        .set(lastSprite, { pixi: { autoAlpha: 0 } });
                }
                this.timeline
                    .to(sprite, fade, { pixi: { autoAlpha: 1 } }, delay)
                    .to(sprite, 1, { pixi: { scale: endScale }, ease }, delay);
                lastSprite = sprite;
            });
        }
    }
}
//
// CONFIG
// ===========================================================================
const animationOptions = {
    duration: 200,
    fade: 0.7,
    startScale: 1,
    endScale: 2,
    rotations: 30,
    fadeTime: 8,
    repeats: 24
};
const manifest = [
    1, 2, 3,
    7, 8, 9,
    10, 11, 12,
    13, 14, 15,
    16, 17, 18,
    19, 20, 21,
    22, 23, 24,
    28, 29, 30,
    37, 38, 39,
    34, 35, 36,
    25, 26, 27
].map(id => ({
    name: `zoom${id}`,
    url: `zoom-ozora-${id}.jpg?v=54321`
}));
const app = new Application(animationOptions);
app.load(manifest);