
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
	//noLoop();
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
	colr=[0,255,0];
	mondrianTriangle(0,0,canvasWidth/2,0,0,canvasHeight, iterDepth);
  	mondrianTriangle(0,canvasHeight,canvasWidth/2,0,canvasWidth,canvasHeight, iterDepth);
  	mondrianTriangle(canvasWidth/2,0,canvasWidth,canvasHeight,canvasWidth,0, iterDepth);
}

function drawTriangle(x1,y1,x2,y2,x3,y3,colr,strwt)
{
	stroke(0, 0, 0);
  	strokeWeight(strwt);
	fill(colr[0],colr[1],colr[2]);
	triangle(x1,y1,x2,y2,x3,y3);
}

function mondrianTriangle(x1,y1,x2,y2,x3,y3,iter){
	var m;
	if(iter==1){
		var r=random(255);
		var g=random(255);
		var b=random(255);
		drawTriangle(x1,y1,x2,y2,x3,y3,[r,g,b],round(iterMAX/iterDepth));

	}
	else{
		m=random(45,55)/100;
		var vSort=sortSides(x1,y1,x2,y2,x3,y3);
		var x4=vSort[0]*m+(1-m)*vSort[4];
		var y4=vSort[1]*m+(1-m)*vSort[5];



		mondrianTriangle(vSort[0],vSort[1],vSort[2],vSort[3],x4,y4,iter-1);
		mondrianTriangle(vSort[2],vSort[3],vSort[4],vSort[5],x4,y4,iter-1);

		


	}
}

function sortSides(x1,y1,x2,y2,x3,y3){
	var d1=distance(x1,y1,x2,y2);
	var d2=distance(x2,y2,x3,y3);
	var d3=distance(x1,y1,x3,y3);
	//console.log(d1,d2,d3);
	vSort=[];
	if(d1<=d2 && d2<=d3){
		vSort.push(x1);
		vSort.push(y1);
		vSort.push(x2);
		vSort.push(y2);
		vSort.push(x3);
		vSort.push(y3);
	}
	else if (d1<=d2 && d3<=d2){
		vSort.push(x1);
		vSort.push(y1);
		vSort.push(x3);
		vSort.push(y3);
		vSort.push(x2);
		vSort.push(y2);
	}
	else if (d2<=d1 && d1<=d3){
		vSort.push(x2);
		vSort.push(y2);
		vSort.push(x1);
		vSort.push(y1);
		vSort.push(x3);
		vSort.push(y3);

	}
	else if(d2<=d1 && d3<=d1){
		vSort.push(x2);
		vSort.push(y2);
		vSort.push(x3);
		vSort.push(y3);
		vSort.push(x1);
		vSort.push(y1);

	}
	else if(d3<=d1 && d1<=d2){
		vSort.push(x3);
		vSort.push(y3);
		vSort.push(x1);
		vSort.push(y1);
		vSort.push(x2);
		vSort.push(y2);
		

	}
	 else {
		vSort.push(x3);
		vSort.push(y3);
		vSort.push(x2);
		vSort.push(y2);
		vSort.push(x1);
		vSort.push(y1);

	}
	//console.log(vSort);
	return vSort;
}

function distance(x1,y1,x2,y2){
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}