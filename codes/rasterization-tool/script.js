function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // Rasterization process using a background
// canvas element and some fancy processing

// Basic Canvas helper to set and get the
// two canvas objects we'll be using to
// rasterize an image
//
// Source can be image / upload or webcam
// Ability to export image or dataset
// Color options - basic but its a start
// Note - webcam and screen shot take a sec
// to acitvate the cam and shut it down

class Canvas {
  constructor(_element) {_defineProperty(this, "setViewport",



    element => {
      const canvasElement = element;
      const doc = document.documentElement;
      this.width = ~~(doc.clientWidth, window.innerWidth || 0);
      this.height = ~~(doc.clientHeight, window.innerHeight || 0);
      canvasElement.width = this.width;
      canvasElement.height = this.height;
      const canvasObject = {
        width: this.width,
        height: this.height };

      return canvasObject;
    });_defineProperty(this, "createCanvas",
    name => {
      let canvasElement;
      if (document.getElementById(name)) {
        canvasElement = document.getElementById(name);
      } else {
        canvasElement = document.createElement('canvas');
        canvasElement.id = name;
      }
      const viewportSize = this.setViewport(canvasElement);

      if (!document.getElementById(name)) this.element.appendChild(canvasElement);

      const context = canvasElement.getContext('2d');
      context.scale(1, 1);
      return {
        context: context,
        canvas: canvasElement,
        ...viewportSize };

    });this.element = _element || document.body;this.canvas = this.createCanvas('canvas');}}
;

const Can = new Canvas();

// Parent Render Class where the magic happens
class Render {
  constructor(element, _width, _height) {_defineProperty(this, "startWebcam",































































    () => {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

      if (navigator.getUserMedia) {// get webcam feed if available
        navigator.getUserMedia({ video: true, audio: false },
        stream => {
          this.video = document.getElementById('video');
          try {
            this.video.srcObject = stream;
          } catch (error) {
            console.log(error);
            this.video.src = window.URL.createObjectURL(stream);
          }
        },
        () => {
          console.log('error');
        });

      }
    });_defineProperty(this, "stopWebcam",

    () => {
      window.cancelAnimationFrame(this.animation);
      let stream = this.video.srcObject;
      let tracks = stream.getTracks();

      tracks.forEach(track => {
        track.stop();
      });

      this.video.srcObject = null;
      this.loadData(document.getElementById('rawImage').src);
    });_defineProperty(this, "createGUI",

    () => {
      this.options = {
        pixelType: this.pixelType,
        source: this.source,
        spacing: this.spacing,
        sizing: this.sizing,
        intensity: this.intensity,
        color: this.color,
        foreground: this.foreground,
        invert: this.invert,
        useUnderlyingColors: this.useUnderlyingColors };

      this.gui = new dat.GUI();
      const functions = {
        WebCamShot: () => {
          this.startWebcam();
          setTimeout(this.snapShot, 2000);
        },
        ExportImage: () => {this.downloadImage();},
        ExportData: () => {this.exportDataSet();},
        UploadImage: e => {document.getElementById('fileUpload').click();} };

      const folderSource = this.gui.addFolder('Source Options');
      const folderRender = this.gui.addFolder('Pixel Options');
      const folderColor = this.gui.addFolder('Color Options');
      folderSource.add(this.options, 'source', ['webcam', 'image']).
      onFinishChange(value => {
        this.source = value;
        if (value === 'webcam') {
          this.startWebcam();
          this.renderLoop();
        } else {
          this.stopWebcam();
        }
      });
      folderSource.add(functions, 'UploadImage');
      folderSource.add(functions, 'ExportImage');
      folderSource.add(functions, 'ExportData');
      folderSource.add(functions, 'WebCamShot');
      folderRender.add(this.options, 'pixelType', ['square', 'dot']).
      onFinishChange(value => {
        this.pixelType = value;
        this.preparePoints();
      });
      folderRender.add(this.options, 'sizing', 10, 300).step(1).
      onFinishChange(value => {
        this.sizing = value;
        this.spacing = ~~(this.canvas.width / this.sizing);
        this.preparePoints();
      });
      folderRender.add(this.options, 'intensity', 0.01, 5.00).step(0.01).
      onFinishChange(value => {
        this.intensity = value;
        this.preparePoints();
      });
      folderColor.add(this.options, 'useUnderlyingColors').
      onChange(value => {
        this.useUnderlyingColors = value;
        this.preparePoints();
      });
      folderColor.add(this.options, 'invert').
      onChange(value => {
        this.invert = value;
        this.preparePoints();
      });
      folderColor.addColor(this.options, 'color').
      onChange(value => {
        this.color = value;
        this.preparePoints();
      });
      folderColor.addColor(this.options, 'foreground').
      onChange(value => {
        this.foreground = value;
        this.preparePoints();
      });
    });_defineProperty(this, "resize",

    () => {
      window.cancelAnimationFrame(this.animation);
      const bgCanvasReturn = Can.setViewport(this.bgCanvas);
      this.bgCanvas.width = bgCanvasReturn.width;
      this.bgCanvas.height = bgCanvasReturn.height;
      const canvasReturn = Can.setViewport(this.canvas);
      this.canvas.width = canvasReturn.width;
      this.canvas.height = canvasReturn.height;
      this.spacing = ~~(this.canvas.width / this.sizing);
      this.baseRadius = this.spacing * .95;

      this.bgContext.drawImage(this.bgImage, 0, 0, this.bgCanvas.width, this.bgCanvas.height);

      this.preparePoints();
      this.renderLoop();
    });_defineProperty(this, "rgbToHex",

    (r, g, b) => {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    });_defineProperty(this, "hexToRgb",

    hex => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16) } :
      null;
    });_defineProperty(this, "uploadImage",

    e => {
      const fileReader = new FileReader();
      fileReader.onload = event => {
        this.loadData(event.target.result);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    });_defineProperty(this, "exportDataSet",

    e => {
      const regx = /([rgba()])|([)])\w+/g;
      let dataSet = this.points.map(point => {
        const rawColor = point.color.replace(regx, ' ');
        const myColor = rawColor.split(',');
        return {
          x: point.x,
          y: point.y,
          radius: point.radius,
          color: [
          parseInt(myColor[0]),
          parseInt(myColor[1]),
          parseInt(myColor[2]),
          parseInt(myColor[3])] };


      });
      const output = {
        size: this.sizing,
        data: dataSet };

      window.open().document.write(JSON.stringify(output));
    });_defineProperty(this, "downloadImage",

    e => {
      const imageCanvas = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      const imageData = imageCanvas.data;
      for (let i = 0; i < imageData.length; i += 4) {
        const pixelHex = this.rgbToHex(
        imageData[i],
        imageData[i + 1],
        imageData[i + 2]);

        if (pixelHex === this.foreground) {
          imageData[i + 3] = 0;
        }
      }
      this.context.putImageData(imageCanvas, 0, 0);
      const canvas = document.getElementById('canvas');
      const image = canvas.toDataURL('image/png').
      replace('image/png', 'image/octet-stream');
      // window.location.href = image;
      const date = new Date();
      this.downloadLink.href = image;
      this.downloadLink.download = `RasterExport${date.getMinutes()}${date.getSeconds()}.png`;
      this.downloadLink.click(e => {e.preventDefaut();});
    });_defineProperty(this, "snapShot",

    () => {
      this.drawImageToBackground(this.video);
    });_defineProperty(this, "getPixelData",

    (x, y, width, height) => {
      let pixels;
      if (x === undefined) {
        pixels = this.bgContext.getImageData(0, 0, this.bgCanvas.width, this.bgCanvas.height);
      } else {
        pixels = this.bgContext.getImageData(x, y, width, height);
      }
      return pixels;
    });_defineProperty(this, "preparePoints",

    () => {
      this.points = [];
      this.cols = ~~(this.canvas.width / this.spacing);
      this.rows = ~~(this.canvas.height / this.spacing);
      const pixelData = this.getPixelData();
      const colors = pixelData.data;
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          const pixelPosition = (j * this.spacing + i * this.spacing * pixelData.width) * 4;
          // We only need one color here... since they are all the same.
          const brightness = 0.34 * colors[pixelPosition] + 0.5 * colors[pixelPosition + 1] +
          0.16 * colors[pixelPosition + 2];
          const baseRadius = this.calculateRadius(j, i, brightness);
          const color = `rgba(${colors[pixelPosition]},${colors[pixelPosition + 1]},${colors[pixelPosition + 2]},1)`;
          this.points.push({ x: j, y: i, radius: baseRadius, color: color });
        }
      }
      this.drawPoints();
    });_defineProperty(this, "calculateRadius",

    (x, y, color) => {
      const radius = this.baseRadius * (color / 150);
      return radius * this.intensity;
    });_defineProperty(this, "drawPoints",

    () => {
      let currentPoint;
      let nextPoint;
      this.context.lineWidth = this.lineWidth;
      const gc = this.hexToRgb(this.foreground);
      this.context.fillStyle = `rgba(${gc.r},${gc.g},${gc.b},1)`;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.lineSize = 0;
      this.context.lineCap = 'square';
      const d = ~~(this.canvas.width / this.spacing);
      const pointTotal = this.points.length;
      let n;let x;let y;
      for (let i = 0; i < pointTotal; i++) {
        currentPoint = this.points[i];
        nextPoint = i < pointTotal - 1 ? this.points[i + 1] : this.points[i];
        x = i % d;
        y = ~~((i - x) / d);

        const compColor = this.color;

        if (this.useUnderlyingColors) {
          this.context.fillStyle = currentPoint.color;
          this.context.strokeStyle = currentPoint.color;
        } else {
          this.context.fillStyle = compColor;
          this.context.strokeStyle = compColor;
        }

        const radius = currentPoint.radius;
        const bs = this.invert ?
        this.spacing - radius : radius;
        const baseSize = bs < .5 ? 0 : Math.abs(bs);
        const adjust = this.spacing - baseSize / 2;
        switch (this.pixelType) {
          case 'square':
            this.context.fillRect(
            x * this.spacing + adjust,
            y * this.spacing + adjust,
            baseSize,
            baseSize);
            this.context.fill();
            break;
          case 'dot':
            this.context.beginPath();
            this.context.arc(
            x * this.spacing + adjust,
            y * this.spacing + adjust,
            Math.abs(baseSize / 2),
            0,
            2 * Math.PI,
            true);
            this.context.closePath();
            this.context.fill();
            break;
          default:
            break;}

      }
    });_defineProperty(this, "loadData",

    data => {
      this.bgImage = new Image();
      this.bgImage.crossOrigin = "Anonymous";
      this.bgImage.src = data;
      this.bgImageHeight = this.bgImage.height;
      this.bgImageWidth = this.bgImage.width;
      this.bgImage.onload = () => {
        this.bgContext.drawImage(this.bgImage, 0, 0, this.bgCanvas.width,
        this.bgCanvas.height);
        this.preparePoints();
      };
    });_defineProperty(this, "drawImageToBackground",

    image => {
      this.bgContext.drawImage(image, 0, 0, this.bgCanvas.width,
      this.bgCanvas.height);
      this.preparePoints();
    });_defineProperty(this, "renderLoop",

    () => {
      this.frames += 1;

      switch (this.source) {
        case 'webcam':
          if (this.frames % 3 === 0) {
            this.snapShot();
            this.drawPoints();
          }

          break;
        case 'image':
          break;
        default:
          break;}

      this.animation = window.requestAnimationFrame(this.renderLoop);

    }); // Display Canvas //
    const _canvasReturn = Can.createCanvas('canvas');this.canvas = _canvasReturn.canvas;this.context = _canvasReturn.context; // Background Canvas for Images //
    const _bgCanvasReturn = Can.createCanvas('bgcanvas');this.bgCanvas = _bgCanvasReturn.canvas;this.bgContext = _bgCanvasReturn.context;this.bgImageHeight = 0;this.bgImageWidth = 0;this.video = null;this.element = element;this.isWebcam = true; // Settings //
    this.color = '#abf7fc';this.foreground = '#000000';this.invert = false;this.useUnderlyingColors = true;this.padding = 0;this.points = [];this.time = 0;this.frames = 0;this.pixelType = 'square';this.source = 'image';this.intensity = 0.75;this.sizing = 100;this.spacing = ~~(this.canvas.width / this.sizing);this.baseRadius = this.spacing * .95; // File upload Form Stuff
    const formBox = document.createElement('div');formBox.className = 'hidden';formBox.addEventListener('change', this.uploadImage, { capture: true, passive: true });const upload = document.createElement('input');this.downloadLink = document.createElement('a');upload.className = 'upload';upload.type = 'file';upload.id = 'fileUpload';formBox.appendChild(upload);formBox.appendChild(this.downloadLink);document.body.appendChild(formBox); // video stuff
    const videoBlock = document.createElement('video');videoBlock.className = 'video';videoBlock.width = 640;videoBlock.height = 320;videoBlock.id = 'video';videoBlock.setAttribute('autoplay', true);document.body.appendChild(videoBlock);this.createGUI();const RawImage = document.getElementById('rawImage').src;this.loadData(RawImage);window.addEventListener('resize', this.resize, { capture: true, passive: true });}};window.onload = () => {const demo = new Render(document.body);};