var canvas,ctx,ob,gtx,gty;

window.onload=function(){
    var a,b;
    canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext('2d');
    canvas.width=400;
    canvas.height=400;
    gtx=canvas.width/2;
    gty=canvas.height/2;
    
    ob=[];
    for(a=0;a<600;a++){
        b={};
        b.x=gtx+(Math.random()-0.5)*10;
        b.y=gty+(Math.random()-0.5)*10;
        b.typ=(a%3);
        ob.push(b);
    }
    pat();
};

function pat(){
    var a,b,c,d,e,f,g,h,x,y,abs,hen,han;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth=4;
    abs=Math.abs;
    hen=15;
    han=150;
    for(g=0;g<3;g++){
        for(a=0;a<ob.length;a++){
            b=ob[a];
            b.rx=b.ry=0;
        }
        for(a=0;a<ob.length;a++){
            b=ob[a];
            for(c=a+1;c<ob.length;c++){
                d=ob[c];
                x=b.x-d.x;
                y=b.y-d.y;
                h=hen;
                if(b.typ!=d.typ)h=hen*2;
                if(abs(x)>h || abs(y)>h)continue;
                e=Math.pow(x*x+y*y,0.5);
                if(e<h){
                    e=(h-e)/h;
                    e*=e;
                    x*=e;
                    y*=e;
                    b.rx+=x;
                    b.ry+=y;
                    d.rx-=x;
                    d.ry-=y;
                }
            }
        }
        
        for(a=0;a<ob.length;a++){
            b=ob[a];
            b.x+=b.rx;
            b.y+=b.ry;
            x=b.x-gtx;
            y=b.y-gty;
            e=Math.pow(x*x+y*y,0.5);
            b.han=e;
            if(e>han){
                    e=Math.random()*Math.PI*2;
                    c=Math.random()*80;
                    x=Math.cos(e)*c;
                    y=Math.sin(e)*c;
                    b.x=gtx+x;
                    b.y=gty+y;
            }
        }
    }
    
    for(a=0;a<ob.length;a++){
        b=ob[a];
        c=0.3;
        if(han-b.han<10)c*=(han-b.han)/10;
        ctx.strokeStyle=ctx.fillStyle="hsla(11,80%,60%,"+c+")";
        ctx.beginPath();
        ctx.arc(b.x,b.y,7,0,Math.PI*2,0);
        ctx.fill();
        ctx.stroke();
    }
    
    ctx.strokeStyle=ctx.fillStyle="hsla(11,80%,60%,0.3)";
    for(a=0;a<ob.length;a++){
        b=ob[a];
        for(c=a+1;c<ob.length;c++){
            d=ob[c];
            x=b.x-d.x;
            y=b.y-d.y;
            if(abs(x)>hen || abs(y)>h)continue;
            e=Math.pow(x*x+y*y,0.5);
            e=Math.abs(e-hen);
            if(e<2){
                ctx.beginPath();
                ctx.lineTo(b.x,b.y);
                ctx.lineTo(d.x,d.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(pat);
}