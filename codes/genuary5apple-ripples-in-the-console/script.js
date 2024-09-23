//https://genuary.art/prompts
//click to change
let n, n2;
function setup() {
  cnv = createCanvas(500, 500);
  background(255);
  n = 40
  angleMode(DEGREES) 
  //frameRate(3)
}
function draw() {
  //translate(width / 2, height / 2);
  t=frameCount/100
  background(255);
  str1 = []
  str2=[]
  for(let i =0;i<n;i++){
    str1 = []
    for(let j=0;j<n;j++){
      p = 360*abs(sin(j*i+(t))*tan(t*j/2*i-j*i))-100*cos(i*t)
      if (p>=-340&&p<10){
        str2[j] = "_"
      }else if(p>=10&&p<360){
        str2[j] = "_"
      } else{
        str2[j] = ""
      }
      text(str2[j],i*width/n, j*height/n)
      str1 = str1+str2[j]
    }
    console.log(str1)
    
  }
  for(let i=0;i<n;i++){
    
  }
  
}


function mousePressed() {
  noLoop()
}