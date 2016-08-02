function setup() {
	createCanvas(640,480);
}

function draw() {
  ellipse(100,100,80,80);
  if(mouseIsPressed){
  	fill(123);
  }
  else
  {
  	fill(255);
  }
  ellipse(mouseX,mouseY, 80, 80);
}