var WIDTH=1300;
var HEIGHT=800;
var primesList;
var factorList;
var factorCounter;
var factorCounterStack;
var Total=1;
var frRate=0.5;
var spaceCount=0;
var numberDiv;
var factorsDiv;

function setup() {
  numberDiv=document.getElementById("Number");
  factorsDiv=document.getElementById("Factors");

	createCanvas(WIDTH,HEIGHT);
  clear();
  
  primesList=[];
  factorList=[];
  factorCounterStack=[];
  factorCounter=0;
  generatePrimes(1000);
  frameRate(frRate);

  

}

function draw() {
  factorList=[];
  clear();
  background(0);
  stroke(255);

  factor(Total);
  textSize(50);

  var factorString="";
  for(var i=0; i<factorList.length;i++){
    factorString+=factorList[i];
    if(i<factorList.length-1){
      factorString+=".";
    }
  }
  if(Total==1){factorString=1};
  var str=Total+" = "+factorString;

  fill(255,255,255);
  
  text(str,WIDTH/2-(str.length/2)*25,50);


  if(Total<1000){
    drawCirclesRecurse(0,0,256,Total);
    Total++;
  }
  else{
    Total=1;
  }
  
  
}

function keyPressed(){
  
  if(keyCode===32){
    spaceCount++;
    if(spaceCount%2==1){noLoop();}
    else{loop();}
  };

  if(keyCode===UP_ARROW){frRate++;frameRate(frRate);};
  if(keyCode===DOWN_ARROW){
    if(frRate>0.5){frRate--;frameRate(frRate);}}
    

}


function drawCircles(x,y,R,n){

  for(var i=0; i<n; i++){
    var X=x+(R/(1+sin(PI/n)))*cos(i*TWO_PI/n);
    var Y=y+(R/(1+sin(PI/n)))*sin(i*TWO_PI/n);
    var r=(R*sin(PI/n))/(1+sin(PI/n))
    if(factorCounter%2==0){col=0;}
    else{ col=255;}
    X=pixelTransformX(X);
    Y=pixelTransformY(Y);
    fill(col);
    // noFill();
    ellipse(X,Y,2*r);


  }
}

function drawCirclesRecurse(x,y,R,N){ 
  factorCounterStack.push(factorCounter);
  if(N==1){

    var X=pixelTransformX(x);
    var Y=pixelTransformY(y);
    // noFill();
    ellipse(X,Y,2*R);
  }
  else{
      if(isPrime(N)){
        
        factorCounter++;
        drawCircles(x,y,R,N);
      }
      else{
        
        var P=findLargestPrimeFactor(N);
        factorCounter++;
        drawCircles(x,y,R,P);
        for(var k=0; k<P; k++){
          drawCirclesRecurse(x+(R/(1+sin(PI/P)))*cos(k*TWO_PI/P),y+(R/(1+sin(PI/P)))*sin(k*TWO_PI/P),(R*sin(PI/P))/(1+sin(PI/P)),round(N/P));
        }

      }
    }

    factorCounter=factorCounterStack.pop();
  }









function pixelTransformX(x){
  return x+WIDTH/2;
}
function pixelTransformY(y){
  return HEIGHT/2-y;
}

function generatePrimes(N){
  primesList.push(2);

  for(var n=3;n<N;n++){
    var k=2;
    var isComposite=false;
    while(!isComposite && k<1+sqrt(n)){
      if(n%k==0){
        isComposite=true;
      }
      k++;
    }
    if(!isComposite){
      primesList.push(n)
    }
  }

}

function isPrime(n){
  var isPrime=false;
  var j=0;
  while(j<primesList.length && !isPrime){
    if(n==primesList[j]){
      isPrime=true;
    }
    j++;
  }
  return isPrime;
}

function factor(n) {
  if(n==1){}
    else{
      var finished=false;
      var i=0;
      while(!finished && i<primesList.length){
        if(n%primesList[i]==0){
          factorList.push(primesList[i])
          finished=true;
          factor(n/primesList[i]);
        }
        i++;
      }
    }

}

function findLargestPrimeFactor(n){
  var P;
  var done=false;
  var i=primesList.length-1;
  while(i!=-1 && !done){
    if(n%primesList[i]==0){
      P=primesList[i];
      done=true;
    }
    i--;
  }
  return P;
}