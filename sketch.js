var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  
  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
}

function draw() {
  background(200);
  if (gameState=="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    spaw_doors()
    if(keyDown("space") ){
      ghost.velocityY = -10

    }
    ghost.velocityY += 0.8
    if(keyDown("right")){

       ghost.x += 3 
    }
    if(keyDown("left")){
      ghost.x -= 3

    }
    if(ghost.isTouching(climbersGroup)){

      ghost.velocityY = 0
    }
    if(ghost.isTouching(invisibleBlockGroup)|| ghost.y > 600){
      ghost.destroy()
      gameState = "end"
   
    }
    drawSprites()
  } else if (gameState == "end"){
      fill("black")
      textSize(50)
      textAlign(CENTER)
      text("game over",300,400)  
  }
  
   
  
}

function spaw_doors(){
    if(frameCount % 250 == 0){
      var door = createSprite(random(100,500),-50) 
      door.velocityY = 1
      door.addImage(doorImg)
      var climber =  createSprite(door.x,door.y+50)
      climber.velocityY =1
      climber.addImage(climberImg)
      var invisibleBlock = createSprite(door.x,door.y+60,climber.weidth,10)
      invisibleBlock.velocityY = 1
      invisibleBlock.visible = false
      door.lifetime = 800
      climber.lifetime = 800
      invisibleBlock.lifetime = 800
      doorsGroup.add(door)
      climbersGroup.add(climber)
      invisibleBlockGroup.add(invisibleBlock)
    }
 
}