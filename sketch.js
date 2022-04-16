var engine, world;
var aliens, aliensImage;
var backgroundImage;
var soldier, aliensGroup;
var ammos = [];
var alienss = [];
var ghosts = [];
var bulletImage;
var soldierImage;
var ghost, ghostImage;
var gameState = 0;
var border;

function preload(){

  backgroundImage = loadImage("./images/Background.jpg");
  aliensImage = loadImage("./images/Alien.png");
  bulletImage = loadImage("./images/Bullet.png");
  soldierImage = loadImage("./images/Soldier.png");
  ghostImage = loadImage("./images/Ghost.png");

}

function setup(){

  createCanvas(windowWidth, windowHeight);

  soldier = createSprite(width/2, 600, 20, 20);
  soldier.addImage(soldierImage);
  soldier.scale = 0.5;

  border = createSprite(width/2, 650, 1500, 20);
  border.visible = false;

  aliensGroup = new Group();

  imageMode(CENTER);

}

function draw(){
  
  background(20);
  image(backgroundImage, width/2, height/2, width, height);

  if (gameState === 0){
    soldier.x = mouseX;
  
  spawnAliens();
  spawnGhost();

  for (var i = 0 ; i<ammos.length ; i++){
    for(var j = 0 ; j<alienss.length ; j++){
      if (ammos[i].isTouching(alienss[j])){
        ammos[i].destroy();
        alienss[j].destroy();
        ammos.splice(i, 1);
        alienss.splice(j, 1);
      }
    }
  }

  for (var k = 0 ; k<alienss.length ; k++){
      if (alienss[k].isTouching(border)){
        gameState = 1;
        console.log("game over");
      }
    }
  }

  if (gameState === 1){
    aliensGroup.setVelocityYEach(0);
    gameOver();
  } 

  drawSprites();
  
}

function spawnAliens(){

  if (frameCount % 50 === 0){
    var aliens = createSprite(random(20, width-20), 0, 50, 50);
    aliens.addImage(aliensImage);
    aliens.velocityY = 5;
    aliens.scale = 0.6;
    alienss.push(aliens);
    aliensGroup.add(aliens);
  }

}

function spawnGhost(){

  if (frameCount % 100 === 0){
    var ghost = createSprite(random(20, width-20), 0, 50, 50);
    ghost.addImage(ghostImage);
    ghost.velocityY = 15;
    ghost.scale = 0.3;
    ghosts.push(ghost);
    aliensGroup.add(ghost);
  }

}

function mouseClicked(){

  var ammo = createSprite(soldier.x, soldier.y-10, 10, 10);
  ammo.velocityY = -20;
  ammo.addImage(bulletImage);
  ammo.scale = 0.2;
  ammos.push(ammo);

}

function gameOver(){

  swal({
    text :"Game Over", title : "Well Played",
    confirmButtonText : "Restart" 
  },
function (isConfirmed){
  if (isConfirmed){
    location.reload();
  }
}
  )
    
  }