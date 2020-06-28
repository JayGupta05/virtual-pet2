//Create variables here
var dog,sadDog,happyDog;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  happyDog = loadImage("dogImg1.png");
  sadDog = loadImage("dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,20,20);
  dog.addImage(sadDog);
  dog.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on('value',readStock);  
}


function draw() { 
  background(46,139,87); 
  textSize(20);
  fill("white");
  text("FOOD:  " + foodS,300,100);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    image(happyDog,250,250,20,20);
  }

  drawSprites();
  //add styles here
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}