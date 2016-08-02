

var WIDTH=1300;
var HEIGHT=700;

var xList=[];
var yList=[];
var rList=[];
var mList=[];
var VxList=[];
var VyList=[];
var colorList=[];
var total=1;
var TOTALMAX=150;


function setup() {
	createCanvas(WIDTH,HEIGHT);

	var done=false;
	while(!done){
		total=round(prompt("How many particles in the system: 1-"+TOTALMAX+":"));
		if(total>=1 && total<=TOTALMAX){done=true;}
	}

	for(var i=0; i<total; i++){
		xList.push(Math.random()*WIDTH);
		yList.push(Math.random()*HEIGHT);
		var r=10+Math.random()*40;
		rList.push(r);
		mList.push(r*r);
		VxList.push(Math.random()*6-3);
		VyList.push(Math.random()*6-3);
		colorList.push([Math.random()*255,Math.random()*255,Math.random()*255]);

	}
}

function draw() {
	clear();
	background(50);

	moveBodies();
	drawBodies();
 
}

function drawBodies(){
	for(var i=0; i<total; i++){
		stroke(0, 0, 0);
  		strokeWeight(4);
		fill(colorList[i][0],colorList[i][1],colorList[i][2]);
		ellipse(xList[i],yList[i],2*rList[i]);
	}

}

function moveBodies(){
	checkForCollisions();
	for(var i=0; i<total; i++){
		xList[i]=xList[i]+VxList[i];
		yList[i]=yList[i]+VyList[i];

	}

}

function checkForCollisions(){
	checkEdgeCollisions();
	checkCollisionsBetweenBodies();

}

function checkEdgeCollisions(){
	for(var i=0; i<total; i++){
		if(xList[i]+rList[i]>WIDTH){
			xList[i]=WIDTH-rList[i];
			VxList[i]=(-1)*VxList[i];
		}
		else if(xList[i]-rList[i]<0){
			xList[i]=0+rList[i];
			VxList[i]=(-1)*VxList[i];
		}
		
		if(yList[i]+rList[i]>HEIGHT){
			yList[i]=HEIGHT-rList[i];
			VyList[i]=(-1)*VyList[i];
		}
		else if(yList[i]-rList[i]<0){
			yList[i]=0+rList[i];
			VyList[i]=(-1)*VyList[i];
		}
	}

}

function isColliding(i,j){
	var isCol=false;
	var epsilon=1;
	var d=Math.sqrt((xList[i]-xList[j])*(xList[i]-xList[j])+(yList[i]-yList[j])*(yList[i]-yList[j]));

	if(d<rList[i]+rList[j]+epsilon){
		var X1=xList[i]+(rList[i]+rList[j]+epsilon-d)*(xList[i]-xList[j])/d;
		var Y1=yList[i]+(rList[i]+rList[j]+epsilon-d)*(yList[i]-yList[j])/d;
		var X2=xList[j]+(rList[i]+rList[j]+epsilon-d)*(xList[j]-xList[i])/d;
		var Y2=yList[j]+(rList[i]+rList[j]+epsilon-d)*(yList[j]-yList[i])/d;
		xList[i]=X1;
		xList[j]=X2;
		yList[i]=Y1;
		yList[j]=Y2;
		isCol=true;
		console.log(xList[i]);

	}
	return isCol;
}

function checkCollisionsBetweenBodies(){

	for(var i=0; i<total; i++){
		for(var j=i+1; j<total; j++){
			if(isColliding(i,j)){
				var m=mList[i]/mList[j];
				var V1=2*(m*m*VxList[i]+m*VxList[j])/(m*m+m)-VxList[i];
				var v1=m*VxList[i]+VxList[j]-m*V1;
				VxList[i]=V1;
				VxList[j]=v1;

				V1=2*(m*m*VyList[i]+m*VyList[j])/(m*m+m)-VyList[i];
				v1=m*VyList[i]+VyList[j]-m*V1;
				VyList[i]=V1;
				VyList[j]=v1;

			}
		}
	}

}


