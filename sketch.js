var Play = 1;
var End = 0;
var gameStates = 1
var ground;
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,death;
var forest,forest_img;

function preload(){
  
  monkey_collided = loadAnimation("sprite_0.png");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  forest_img = loadImage("images.jpg")
   
}

function setup() {
  createCanvas(400,400);
  
  forest = createSprite(200,200);
  forest.addImage("forest",forest_img);
  forest.scale = 3.2;
  forest.x = forest.width/2;

  
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(400,360,900,10);
  ground.x=ground.width/2;
  ground.visible = false;
  
  FoodGroup = new Group();
  
  obstacleGroup = new Group();
  
  score = 0;
  
  death = 0;
  
}

function draw() {
 background(forest_img);
  
  if(gameStates === Play){

    forest.velocityX = -4
    ground.velocityX = -4;
  
    if(keyDown("space") && monkey.y >= 250){
       monkey.velocityY = -12;
}  

    monkey.velocityY = monkey.velocityY +0.8;
      
  
  if(FoodGroup.isTouching(monkey)){
    score = score +2;
    FoodGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)){
    death = death +1;
    obstacleGroup.destroyEach();
  }
  
  switch(score){
    case 10: monkey.scale = 0.12;
            break;
    case 20: monkey.scale = 0.14;
            break;        
    case 30: monkey.scale = 0.16;
            break;
    case 40: monkey.scale = 0.18;
            break;
    default: break;        
  }
     
  switch(death){
    case 1: monkey.scale = 0.1;
           break;
    case 2: gameStates = End;       
  }
  
if(ground.x < 0){
  ground.x=ground.width/2;
}
  
if(forest.x < 0){
  forest.x=forest.width/2;
}
  
  monkey.collide(ground);
  
  spawnFood();
  
  spawnObstacle();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score "+" = "+score,250,50);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Deaths "+" = "+death,50,50);
    
  }
  
  if(gameStates === End){
    fill("yellow");
    textSize(30);
    text("GAME "+"OVER",125,200);
  }
    
}

function spawnFood(){
  
  if(frameCount % 80 === 0){
    banana = createSprite(500,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    banana.lifetime = 300;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth +1;
    
    FoodGroup.add(banana);
    
  }
}

function spawnObstacle(){
  
  if(frameCount % 300 === 0){
    rock = createSprite(500,337,20,20);
    rock.addImage(obstaceImage);
    rock.scale = 0.1;
    rock.velocityX = -8;
    rock.lifetime = 300;
    
    obstacleGroup.add(rock);
    
  }
}



