var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gamestate = "play"

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
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg); 
  ghost.scale = 0.3
  doorG = createGroup()
  woodG = createGroup()
  blockG = createGroup()
}

function draw() {
  background(0);
  if(gamestate==="play"){
  if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("space")){
    ghost.velocityY = -8
  }
  ghost.velocityY = ghost.velocityY+0.5
  ghost.velocityX = 0
  if(keyDown("left")){
    ghost.velocityX = -3
  }

  if(keyDown("right")){
    ghost.velocityX = 3
  }
  doors()
  ghost.collide(woodG)
  if(ghost.isTouching(blockG)){
    gamestate = "end"
  }
}

if(gamestate==="end"){
  ghost.destroy()
  tower.destroy()
  woodG.destroyEach()
  doorG.destroyEach()
  blockG.destroyEach()
  textSize(30)
  textAlign(CENTER)
  text("You Lost",300,300)
}
  drawSprites()
}

function doors(){
  if(frameCount%150===0){
    door = createSprite(random(100,500),-50)
    door.addImage(doorImg)
    door.velocityY = 1
    ghost.depth = door.depth+1
    wood = createSprite(door.x,10)
    wood.addImage(climberImg)
    wood.velocityY = 1
    block = createSprite(door.x,20,50,10)
    block.velocityY = 1
    block.visible = false 
    doorG.add(door)
    woodG.add(wood)
    blockG.add(block)
  }
}
