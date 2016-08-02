//Initialize complexity of the Op Art to 50 overlapping circles
var complexity=100;
//Generate new Op Art upon loading of the page
generateNewOpArt();

//Increase overlapping circles by 10 every time its button is pressed
function increaseComplexity() {
  if (complexity<1000) {
    complexity+=25;
    document.getElementById("complexity").innerHTML=complexity;
    //generateNewOpArt();
  }
  
}
//Decrease overlapping circles by 10 every time its button is pressed
function decreaseComplexity() {
  if (complexity>0) {
    complexity-=25;
    document.getElementById("complexity").innerHTML=complexity;
    //generateNewOpArt();
  }
  
}

//This is the main function that generates new Op Art
function generateNewOpArt() {
//Report current complexity parameter as measured by the number of overlapping circles
document.getElementById("complexity").innerHTML=complexity;

//Access the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//These are the center (x,y) corrdinates and radius of random circles to be created
var xArray=[complexity];
var yArray=[complexity];
var rArray=[complexity];

//Assign 
var width=canvas.width;
var height=canvas.height;

//Assign random centers and radii to the circles
for(var n=0; n<complexity; n++)
{
  xArray[n]=Math.random()*width;
  yArray[n]=Math.random()*height;
  rArray[n]=Math.random()*200;
}

var counter = [];

//init the grid matrix
for(var i = 0; i < width; i++) {
    counter[i] = []; 
}

var maxCount=0;
//check each pixel to find in how many circles is it included
for(var i=0; i<width; i++)
{
  for(var j=0; j<height; j++)
{
  //This piece of code for each pixel on the canvas counts the number of  circles it is contained in
  //if the count is even red color is assigned if odd black color is assigned
  var count=0;

  for(var n=0; n<complexity; n++)
  {
    //check if the current pixel is within the current circle
    var d=(i-xArray[n])*(i-xArray[n])+(j-yArray[n])*(j-yArray[n])-rArray[n]*rArray[n]
    if (d<0) {
        count++;
    }
  }
  if(count>maxCount){maxCount=count;};
  counter[i][j]=count;
  
  // if(count%2==0) {
  //   //even number of overlaps color red
  //     ctx.fillStyle = "#FF0000";
  //     ctx.fillRect(i,j,1,1);
  //   }
  // else
  //   {//odd number of overlaps color black
  //     ctx.fillStyle = "#000000";
  //     ctx.fillRect(i,j,1,1);
  //   }

}
}
//console.log(maxCount);
for(var i=0; i<width; i++)
{
  for(var j=0; j<height; j++)
{
    
      
      var k=1.61803398874989;//2.718281828459045;//3.1415927;
      var col=Math.floor((k*counter[i][j]/maxCount)*(255*256*256+255*256+255)); 
      var r=Math.floor(col/(256*256));
      col=col%(256*256);
      var g= Math.floor(col/256);
      col=col%256;
      var b=col;
      ctx.fillStyle = 'rgb('+r+','+g+','+b+')';
      ctx.fillRect(i,j,1,1);
      
      //sample print
      // if(i==j){

      // console.log(counter[i][j],maxCount,counter[i][j]/maxCount,r,g,b);};
  }
}
}

