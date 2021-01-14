var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY=1;
var END=0;
var gameState=1;  
var end ;  

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(600,489);

  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;
  
  end=createSprite(300,245); 
  end.addAnimation("endGame",endImg);

  boy = createSprite(70,489,20,20);
  boy.x=Math.round(random(50,400));
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;

  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();
}

function draw() {

  background(0);
  if (gameState===PLAY){
    
   end.visible= false; 

  edges= createEdgeSprites();
  boy.collide(edges);

  if(path.y > 400 ){
    path.y = height/2;
  }
    
    boy.visible=true;
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    if(keyDown("left")){
      boy.x = boy.x-4;
    }
    
    if(keyDown("right")){
      boy.x = boy.x+4;
    }
    
    if (cashG.isTouching(boy)) {
      treasureCollection=treasureCollection+50;
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy)) {
      treasureCollection=treasureCollection+150;
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) {
      treasureCollection=treasureCollection+100;
      jwelleryG.destroyEach();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState=END;
     }
    } 
  }

  else if( gameState===END){
   end.addAnimation("endGame",endImg);
   end.visible= true; 
   boy.velocityY =0;
   path.velocityY=0;
   
   cashG.destroyEach();
   cashG.setVelocityYEach(0);
   
   jwelleryG.destroyEach();
   jwelleryG.setVelocityYEach(0);
   
   diamondsG.destroyEach();
   diamondsG.setVelocityYEach(0);
    
  if(keyDown("space")){
     gameState = 1 ;
      treasureCollection = 0;
   }
   
   boy.visible = false;
   }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,250,30);
}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50,550),40,10,10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds= createSprite(Math.round(random(50,550),40,10,10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery=createSprite(Math.round(random(50,550),40,10,10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 35 == 0) {
  var sword = createSprite(Math.round(random(50,550),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}