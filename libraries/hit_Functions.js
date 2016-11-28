function enemyHit(enemy,bullet){
  if(enemy.type > 0){
    //get rid of the bullet
    bullet.remove();
    //change color
    enemy.shapeColor = 'yellow';
    //subtract health
    enemy.type--;
  }else if(enemy.type === 0){
    //create explosion when bullet hits enemy
    
    for(var i=0; i<explosionDensity; i++) {
      //this is creating the explosion animation
      var p = createSprite(bullet.position.x, bullet.position.y,2,2);
      //this creates where the explosion is initated and the size of the particles
      p.setSpeed(random(3,5), random(360));
      //sets the speed and direction of the particles
      p.friction = 0.95;
      //the friction against the particles
      p.life = 15;
      //how long the explosion lasts
    }
    
    enemy.remove();
    //removes anemy when bullet overlaps
    bullet.remove();
    //remove buket when it hits enemy
     score++;
     if(score == 3){
      gameState = 'levelTwo';
      level1_music.stop();
      level2_music.amp(0.6);
      level2_music.loop();
    }
    if(score == 10){
      gameState = 'levelThree';
      level2_music.stop();
      level3_music.amp(0.6);
      level3_music.loop();
    }
    if(score == 20){
      gameState = 'win';
      level3_music.stop();
      win_song.amp(0.6);
      win_song.loop();
    }
  }
  
}

function heroHit(enemy,hero){
  heroHealth--;
  if(heroHealth <= 0){
    gameState = 'loose';
    level1_music.stop();
    level2_music.stop();
    level3_music.stop();
    lose_song.amp(0.6);
    lose_song.loop();
  }
  heroState = 'regular';
  enemy.remove();
  hero.shapeColor = 'red';
  
  
}

function powerHit (powerUp,hero){
  powerUp.remove();
  heroState = "power";
  
}
