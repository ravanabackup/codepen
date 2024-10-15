/* Starter js1k Template Code */
var b = document.body;
var c = document.getElementsByTagName('canvas')[0];
var a = c.getContext('2d');
document.body.clientWidth;

/* js1k Entry Code - Color Shift */
function p(){this.x=~~(Math.random()*(e-e/3-e/3+1))+e/3,this.y=~~(Math.random()*(h-h/3-h/3+1))+h/3,this.a=.1,this.c=this.d=1,this.b=(e+h)/7}var e=h=c.width=c.height=250,f=c.style,g=[],j=0;k=this.requestAnimationFrame||this.webkitRequestAnimationFrame||this.mozRequestAnimationFrame||this.oRequestAnimationFrame||this.msRequestAnimationFrame||function(a){setTimeout(a,1e3/60)},b.style.backgroundColor="#000",f.position="absolute",f.left=f.top="50%",f.marginLeft=f.marginTop="-125px",function q(){k(q,c),a.globalCompositeOperation="destination-out",a.fillStyle="rgba(0, 0, 0, .05)",a.fillRect(0,0,e,h),a.globalCompositeOperation="lighter";var b=g.length;for(0==j%2&&g.push(new p);b--;){var d=g[b],f=b,i=(d.b-d.a)/d.b;d.c=.5+d.d*i,d.a+=d.c,d.alpha=2.5*i,a.beginPath(),a.arc(d.x,d.y,d.a,0,2*Math.PI),a.fillStyle="hsla("+(~~(Math.random()*(j+100-(j-100)+1))+(j-100))+", 100%, 1%, "+d.alpha+")",a.fill(),d.a>d.b&&g.splice(f,1)}j++}();