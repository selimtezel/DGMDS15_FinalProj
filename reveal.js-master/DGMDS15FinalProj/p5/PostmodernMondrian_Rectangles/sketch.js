
var iterDepth;
var canvasWidth=1280;
var canvasHeight=720;
var iterMAX=15;

var frRate=0.5;
var spaceCount=0;

function setup() {
	createCanvas(canvasWidth,canvasHeight);
	stroke(0,0,0);
	strokeWeight(20);
	rect(0,0,canvasWidth,canvasHeight);
	var done=false;
	while(!done){
		iterDepth=round(prompt("Enter an iteration depth 1-"+iterMAX+":"));
		if(iterDepth>=1 && iterDepth<=iterMAX){done=true;}
	}
	
	frameRate(frRate);
}

function keyPressed(){
  
  if(keyCode===32){
    spaceCount++;
    if(spaceCount%2==0){noLoop();}
    else{loop();}
  };

  if(keyCode===UP_ARROW){frRate++;frameRate(frRate);};
  if(keyCode===DOWN_ARROW){
    if(frRate>0.5){frRate--;frameRate(frRate);}}
    

}

function draw() {
	color=[0,255,0];
  	mondrian(10,10,canvasWidth-20,canvasHeight-20,iterDepth);
}

function drawRectangle(x,y,width,height,color,strwt)
{
	stroke(0, 0, 0);
  	strokeWeight(strwt);
	fill(color[0],color[1],color[2]);
	rect(x,y,width,height)
}

function mondrian(x,y,width,height,iter){
	var m;
	if(iter==1){
		var r=random(255);
		var g=random(255);
		var b=random(255);
		drawRectangle(x,y,width,height,[r,g,b],round(iterMAX/iterDepth));

	}
	else{
		m=random([1,2,3,4])/5;
		if(width>height){
			mondrian(x,y,m*width,height,iter-1);
			mondrian(x+m*width,y,(1-m)*width,height,iter-1);
		}
		else{
			mondrian(x,y,width,m*height,iter-1);
			mondrian(x,y+m*height,width,(1-m)*height,iter-1);
		}

	}
}