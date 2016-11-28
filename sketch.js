// resize the canvas, but keep the 9:16 aspect ratio

var canvasMultiplier = 40;

//make an enemy every so many frames
var enemyRate = 100;
var powerRate = 500
var enemyAngle = 20;
var enemyDrunkness = 50;
// drunk direction is the magnitude of direction shifts
var enemyDrunkDirection = 2;
var heroSpeed = 8;
var explosionDensity = 30;
var score = 0;
var gameState = 'startUp';
var heroHealth = 3;
var hero_idle_sprite_sheet;
var sprite_animation;

//declare the hero
var hero;

//declare herostate
var heroState = 'regular';

//declare sprite GROUP
var bullets;
var enemies; 

//declare powerup sprite

var powerUps;


//variable for health
var Healthbar_End,Healthbar_Half,Healthbar_Full;
//declare enemy sprite images
var enemyOneImg,enemyTwoImg,enemyThreeImg;

var bg_title,bg_win,bg_lose,bg_background,bg_background2,bg_background3;

var shootSound;
var Level1_music, level2_music,level3_music;
var title_music;
var win_music;
var lose_music;
var enemy_munch;

var hero_frames = [
  {'name':'hero_smiley01', 'frame':{'x':256, 'y': 256, 'width': 256, 'height': 256}},
  {'name':'hero_smiley02', 'frame':{'x':512, 'y': 256, 'width': 256, 'height': 256}},
  {'name':'hero_smiley03', 'frame':{'x':768, 'y': 256, 'width': 256, 'height': 256}},
  //{'name':'hero_smiley02', 'frame':{'x':768, 'y': 0, 'width': 256, 'height': 256}},
  //{'name':'hero_smiley01', 'frame':{'x':1024, 'y': 0, 'width': 256, 'height': 256}}
  ];
  
  
function preload (){
  
    hero_idle_sprite_sheet= loadSpriteSheet("assets/hero_idle_Sprite_Sheet.png", hero_frames);
    sprite_animation = loadAnimation(hero_idle_sprite_sheet);


  //use this function to preload any media ie: picture, animations, sound
  shootSound =loadSound("assets/woosh.mp3");
  title_screen =loadSound("assets/Title_screen.mp3");
  level1_music = loadSound("assets/Stage_1_song.mp3")
  level2_music = loadSound("assets/Stage_2_song.mp3")
  level3_music = loadSound("assets/Stage_3_song.mp3")
  win_song = loadSound("assets/Win_song.mp3")
  lose_song = loadSound("assets/Gameover_song.mp3")
  enemy_munch = loadSound("assets/Crunch.mp3")
  
  enemyOneImg = loadImage("assets/Enemy_01.png")
  enemyTwoImg = loadImage("assets/Enemy_02.png")
  enemyThreeImg = loadImage("assets/Enemy_03.png")
  
  heroDefault = loadAnimation()
  heroLeft = loadAnimation ()
  
  bg_title = loadImage ("assets/bg_title.png");
  bg_win = loadImage ("assets/bg_win.png");
  bg_lose = loadImage ("assets/bg_lose.png");
  bg_background = loadImage ("assets/bg_background.png");
  bg_background2 = loadImage ("assets/bg_background2.png");
  bg_background3 = loadImage ("assets/bg_background3.png");
  
  
  bulletImg = loadImage ('assets/bulletimg.png')
  
  Healthbar_End  = loadImage("assets/Healthbar_End.png")
  Healthbar_Half = loadImage("assets/Healthbar_Half.png") 
  Healthbar_Full = loadImage("assets/Healthbar_Full.png")
  //make sure animation doesnt loop
  //heroLeft.frameDelay =4
  //heroRight.looping =false;
  //heroLeft.frameDelay =4;
  
  
}

function setup() {
  
  
  var tempWidth = canvasMultiplier * 9;
  var tempHeight = canvasMultiplier * 16;
  createCanvas(tempWidth,tempHeight);
  
  
  //initialize bullets as a group of sprites
  bullets = new Group();
  enemies = new Group();
  powerUps = new Group();
  
  //load the hero image
  var heroImg = loadImage ("assets/Hero.png");
  
  //define the hero sprite in the middle towards the bottom 
  hero = createSprite(width/2, height*.8, 10, 10);
  
  // give the hero sprite some friction
  //decrease number to increase friction, increase number to decrease friction
  hero.friction = 0.85;
  hero.addImage(heroImg);
  
  hero.addAnimation('hero_smiley',sprite_animation);
  hero.changeAnimation('hero_smiley');
  
  
      title_screen.amp(0.6);
      title_screen.loop();
  }
  
  // To see hit boxes of enemies
  //hero.debug = true;
  
  //hero.shapeColor = 'white';
  



function draw() {
  
  switch(gameState){
    case 'startUp':
      //draw image to background
      background (bg_title);
      text('Press X to START',width/3,height/2);
      break;
      
    case 'loose':
      background (bg_lose)
      text(' Game Over!! ',width/2.1,height/1.8);
      break;
      
    case 'win':
      background (bg_win)
      text(' Congrats! Faces are fed! ',width/3,height/6);
      break;
      
    case 'levelOne':
    levelOne();
    break;
      
    case 'levelTwo':
    levelTwo();
    break;
    
    case 'levelThree':
    levelThree();
    break;
    
    hero.changeAnimation('hero_smiley');
  
  
  }
  
  
/*
 if(gameState == 'startUp'){
   text('Press X to START',width/2,height/2);
 }else if(gameState == 'loose'){
   text('Game Over Man',width/2,height/2);
 }else if(gameState == 'win'){
   text("You're Awesome",width/2,height/2);
 }else if(gameState == 'levelOne'){
  levelOne();
 }
*/
}


function keyPressed(){
 
  if (keyCode == RIGHT_ARROW) {
    //provide a burst of speed to the right (zero degrees)
    hero.setSpeed(heroSpeed,0);
  } else if (keyCode == LEFT_ARROW) {
   //provide a burst of speed to the left (180 degress)
    hero.setSpeed(heroSpeed,180);
   
  } else if(key == ' '){
    if(heroState == 'regular'){
      //create bullet at the location of the hero and set the size
      var loudness =random(0.7,1);
      var panning =map(hero.position.x,0,width,-1.0,1.0);
      shootSound.pan(panning);
      shootSound.amp(loudness);
      //play the shooting sound
      shootSound.play();
      var bullet = createSprite(hero.position.x, hero.position.y,5,5);
      //set the speed and direction of the bullet
      bullet.setSpeed(20,270);
      //make the bullet dissappear after a certain number of frames
      bullet.life = 20;
      bullet.shapeColor = 'black';
      //add the singular bullet to the GROUP bullets
      bullets.add(bullet);
      bullet.addImage(bulletImg);
    }
    if(heroState == 'power'){
    for(var i = 0; i < 3;i++){
       //create bullet at the location of the hero and set the size
      var bullet = createSprite(hero.position.x, hero.position.y,5,5);
      //set the speed and direction of the bullet
      var angle = 255 + (i*15)
      bullet.setSpeed(20,angle);
      //make the bullet dissappear after a certain number of frames
      bullet.life = 20;
      bullet.shapeColor = 'black';
      //add the multiple bullet to the GROUP bullets
      bullets.add(bullet);
      bullet.addImage(bulletImg);
      }
  
    
    }  
  
    
  }

}

function keyTyped(){
  if(key === 'x'){
     gameState = 'levelOne';
     title_screen.stop();
      level1_music.amp(0.6);
      level1_music.loop();
  }
}



//only runs when contact is made

