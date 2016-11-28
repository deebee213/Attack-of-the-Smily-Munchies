 function levelTwo(){
   
  //setup the enemy to be created ever 30 frames
  if(frameCount%enemyRate === 0){
    //make an enemy at the top, random X
    var enemy = createSprite(random(width), 0,40,40);
    //set the speed and direction of the bullet
    enemy.setSpeed(3,random(90 - enemyAngle,90 + enemyAngle));
    //make the bullet dissappear after a certain number of frames
    enemy.life = 900;
    //we are going to store the enemy health in the .type parameter
    enemy.type = 2;
    enemy.shapeColor = 'red';
    enemy.addImage(enemyOneImg);
    //add the singular bullet to the GROUP bullets
    enemies.add(enemy);
    
  }
  
  if(frameCount%enemyRate === 20){
    //make an enemy at the top, random X
    var enemy = createSprite(random(width), 0,40,40);
    //set the speed and direction of the bullet
    enemy.setSpeed(3,random(90 - enemyAngle,90 + enemyAngle));
    //make the bullet dissappear after a certain number of frames
    enemy.life = 900;
    //we are going to store the enemy health in the .type parameter
    enemy.type = 3;
    enemy.shapeColor = 'red';
    enemy.addImage(enemyTwoImg);
    //add the singular bullet to the GROUP bullets
    enemies.add(enemy);
    
  }
  
  //Now for POWERUPS
  if(frameCount%powerRate === 0){
    //make an enemy at the top, random X
    var powerUp = createSprite(random(width), 0,40,40);
    //set the speed and direction of the bullet
    powerUp.setSpeed(3,random(90 - enemyAngle,90 + enemyAngle));
    //make the bullet dissappear after a certain number of frames
    powerUp.life = 200;
    
    //power.addImage(enemyOneImg);
    //add the singular bullet to the GROUP bullets
    powerUps.add(powerUp);
    
    
  }
    
  //eneimes.length returns the current length of the enemies array
  /*
  for(var i = 0;i < enemies.length;i++ ){
    if(enemies[i].position.x > width){
      enemies[i].position.x = 0;
    }
    if(enemies[i].position.x < 0){
      enemies[i].position.x = width;
    }
  }*/
  
  /* THIS IS CODE FOR BOUNCING ENEMIES ON THE X
  for(var i = 0;i < enemies.length;i++){
    // || is the OR symbol && is the AND symbol
    if(enemies[i].position.x > width || enemies[i].position.x < 0){
      enemies[i].velocity.x *= -1;
    }
    
  }
  */
  
  /* THIS IS THE CODE FOR RANDOM ENEMY MOVEMENT
  for(var i = 0;i < enemies.length;i++){
    //a technique for timing something randomly
    if(random(100) < enemyDrunkness){
      enemies[i].velocity.x += random(-enemyDrunkDirection,enemyDrunkDirection);
    }
    
    // || is the OR symbol && is the AND symbol
    if(enemies[i].position.x > width || enemies[i].position.x < 0){
      enemies[i].velocity.x *= -1;
    }
  } 
  */
  
  
  
  
  
  
  background(bg_background2);
  //test any overlap
  //first group name.overlap(second group,callback function)
  enemies.overlap(bullets,enemyHit);
  //did the enemy hit the hero?
  enemies.overlap(hero,heroHit);
  
  //did the hero touch the power up? 
  powerUps.overlap(hero,powerHit);
  
 
 
  textSize(18);
  text("Score " + score, 10, 30);
  
  text("Health",10, 45);
    switch(heroHealth) {
      case 1:
        image(Healthbar_End,20,50);break;
      case 2:
        image(Healthbar_Half,20,50);break;
      case 3:
        image(Healthbar_Full,20,50);break;
    }
  //use this in every p5play program
  // only call it once per frame, almost always at the end of the draw
  

if(hero.getAnimationLabel() == "heroLeft" && hero.animation.getframe() === hero.animation.getLastFrame ()){
    hero.changeAnimation ("heroDefault")
    
  //start at the beginning 
  hero.animation.changeFrame (0);
}
  drawSprites();
  
  
 }