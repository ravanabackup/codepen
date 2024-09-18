const fileName = "0eI7JO23zWEe8FiA";
import { Application } from "https://esm.sh/@splinetool/runtime";
const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);

app.load(`https://prod.spline.design/${fileName}/scene.splinecode`)