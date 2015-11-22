var flapState = {
    game: {},
    player: {},
    bullet_shot_delay:100, // milliseconds (10 bullets/second)
    bullet_speed:800, // pixels/second
    number_of_bullets : 1,
    planets: [],
    planetsBaseSpeed:80,
    planetsWidth:135,
    planetsHeight:135,
    planetsTypes:8,
    chocos: [],
    chocosBaseSpeed:120,
    chocosWidth:80,
    chocosHeight:65,
    chocosTypes:3,
    collectedChocos:0,
    collectedChocosText:"",
    powerUpsSpeed:250,
    powerUpsWidth:135,
    powerUpsHeight:135,
    powerUpsTypes:2,
    asteroidsWidth:220,
    asteroidsHeight:220,
    asteroidsTypes:1,
    asteroidsSpead:400,
    spaceKey: {},
    ondamage:0,
    health_bar: "",
    healthwidth: 210,
    score:0,
    scoreText:"",
    collectables:{},//Here you have to push any group that have collectable objects
    enemies:{},//Here you have to push any group that have enemies

init: function(thisgame){ //You can pass any number of init parameters
	
     this.game=thisgame;
     this.game.stage.disableVisibilityChange = false; //not run on loosing focus  
     
     
     this.width=this.game.globals.width;
     this.height=this.game.globals.height;
     
     

  },



shutDown: function(){

},

create: function() {
	console.log("on create");
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
   
   
   
    this.game.stage.backgroundColor = '#111';
    //nubulu as background (place first-- oreder of sprites matters)
    this.nubulu = this.game.add.tileSprite(0, 0, 1024, 768, 'nubulu');
   
     
     this.game.globals.createStars();

    //Bullets
    this.bullets = this.game.add.group();
      for(var i = 0; i < this.number_of_bullets; i++) {
        // Create each bullet and add it to the group.
        var bullet = this.game.add.sprite(0, 0, 'bullet');
        this.bullets.add(bullet);
        // Set its pivot point to the center of the bullet
        bullet.anchor.setTo(0, 0.5);
        // Enable physics on the bullet
        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
         

        // Set its initial state to "dead".
        bullet.kill();
    }
  
     //Planets
    this.planets = this.game.add.group();
    
    var maxplanets=Math.floor(this.height/this.planetsHeight);
    var planetsPosheight=this.height/maxplanets;

    for (var i = 0; i < maxplanets; i++)
    {
        //  This creates a new Phaser.Sprite instance within the group
        //  It will be randomly placed within the world
      var planet =  this.planets.create((Math.random() * 900) + 530, i * planetsPosheight, 'planets',Math.floor(Math.random() * this.planetsTypes));
      this.game.physics.arcade.enable(planet);
      planet.body.velocity.x = 1-(Math.random()*((this.planetsBaseSpeed*2)-this.planetsBaseSpeed+1)+this.planetsBaseSpeed);
    }
 

     //PowerUps
      this.powerups = this.game.add.group();
      this.shield = this.powerups.create((Math.random() * 900) + 530, -1000, 'shield',1);
      this.game.physics.arcade.enable(this.shield);
      this.shield.body.velocity.x = 1-(Math.random()*((this.powerUpsSpeed*2)-this.powerUpsSpeed+1)+this.powerUpsSpeed);

      this.slowdown = this.powerups.create((Math.random() * 900) + 530, -1000, 'slowdown',1);
      this.game.physics.arcade.enable(this.slowdown);
      this.slowdown.body.velocity.x = 1-(Math.random()*((this.powerUpsSpeed*2)-this.powerUpsSpeed+1)+this.powerUpsSpeed);
    
     //chocos
     this.chocos =  this.game.add.group();
     for (var i = 0; i < 5; i++)
    {
       var choco = this.chocos.create( (Math.random() * 900) + 530, Math.floor(Math.random() * (this.height-this.chocosHeight)) + 1 , 'chocos',Math.floor(Math.random() * this.chocosTypes)); 
       this.game.physics.arcade.enable(choco);
       choco.anchor.setTo(0.5, 0.5);
       choco.body.velocity.x = 1-(Math.random()*((this.chocosBaseSpeed*2)-this.chocosBaseSpeed+1)+this.chocosBaseSpeed);
       choco.inputEnabled = true
       choco.events.onInputDown.add(this.collectChoco, this);
    }

     //asteroids
     this.asteroids = this.game.add.group();  
     this.asteroid = this.asteroids.create((Math.random() * 900) + 530, -1000 , 'asteroid',1);
     this.game.physics.arcade.enable(this.asteroid);
     this.asteroid.anchor.setTo(0.5, 0.5);
     this.asteroid.body.velocity.x = 1-(Math.random()*((this.asteroidsSpead*2)-this.asteroidsSpead+1)+this.asteroidsSpead);
     this.asteroid.body.angularVelocity=-100;
     this.asteroid.inputEnabled = true
    // this.asteroid.events.onInputDown.add(this.destroyasteroid, this);
     this.asteroid.events.onInputDown.add(this.shootBullet,this);
 

 
 
   //Player
   this.player = this.game.add.sprite(80, 500, 'ufo');
   //  We need to enable physics on the player
   this.game.physics.arcade.enable(this.player);
   //  Player physics properties.
   this.player.body.bounce.y = 0;
   this.player.body.gravity.y = 1000;
   this.player.body.collideWorldBounds = true;
 
  
   this.player.frame = 0; 
   this.player.maxHealth = 1000;
   this.player.health = this.player.maxHealth;
   this.player.anchor.setTo(-0.2, 0.5); 
   
   //health bar
   this.game.add.sprite(10,10,'health_back');
   this.health_bar = this.game.add.sprite(10,10,'health_bar');
   this.health_bar.cropEnabled = true;

   //key mouse touch jump    
   this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   this.spaceKey.onDown.add(this.jump, this); 
   this.input.onDown.add(this.jump, this); //Gia touch se kinita kai mouse
   
   //enemies   
   this.enemies.planets=this.planets; 
   this.enemies.asteroids=this.asteroids;
   
   //collectables
   
   
   //player 
   var player=this.player;
   
   //The score
   this.scoreText = this.game.add.text(250, 8, 'LightYears: 0', { fontSize: '32px', fill: '#fff' });
   this.scoreText.fixedToCamera = true;

   //highscore
   if (!localStorage.getItem("highscore")) localStorage.setItem("highscore", 5631);//beatme!
   this.highscore=localStorage.getItem("highscore");
   this.highscoreText=this.game.add.text(570, 8, 'HighScore: '+this.highscore, { fontSize: '32px', fill: '#f00' });
   
   //the chocos
   this.collectedChocosText = this.game.add.text(950, 8, 'Chocos: 0', { fontSize: '32px', fill: '#fff' });
    this.collectedChocosText.fixedToCamera = true;
   //difficulty
   game.time.events.loop(Phaser.Timer.SECOND*5, this.updateSpeed, this);    
   


 },

 update: function() {

	   
   	this.game.physics.arcade.overlap(this.player, this.planets, this.damage, null, this);
	this.game.physics.arcade.overlap(this.player, this.asteroids, this.hitasteroid, null, this);
	this.game.physics.arcade.overlap(this.player, this.shield, this.fixdamage, null, this);
	this.game.physics.arcade.overlap(this.player, this.slowdown, this.slowSpeed, null, this);                                

   this.game.physics.arcade.overlap(this.bullets, this.asteroids, this.destroyasteroid, null, this);
	
	if (this.player.health>this.player.maxHealth) this.player.frame = 1; else 
	    if (this.ondamage-->0) this.player.frame = 2; else  
	         this.player.frame = 0;
	//console.log(this.ondamage);
	
	
	if (this.score>0&&((this.score/110) % 1 == 0)&&this.shield.x<-this.powerUpsWidth) {
	  //console.log(this.shield.x,this.powerups.children[0].x,this.powerups.getAt(0).x);
	  this.shield.y = Math.floor(Math.random() * (this.height-this.powerUpsHeight)) + 1;
	  this.shield.x = (Math.random() * 900) + this.width+100; //Right out of screen
	  this.shield.body.velocity.x = 1-(Math.random()*((this.powerUpsSpeed*2)-this.powerUpsSpeed+1)+this.powerUpsSpeed);
     }
    
	if (this.score>880&&((this.score/360) % 1 == 0)&&this.slowdown.x<-this.powerUpsWidth) {
	  this.slowdown.y = Math.floor(Math.random() * (this.height-this.powerUpsHeight)) + 1;
	  this.slowdown.x = (Math.random() * 900) + this.width+100; //Right out of screen
	  this.slowdown.body.velocity.x = 1-(Math.random()*((this.powerUpsSpeed*2)-this.powerUpsSpeed+1)+this.powerUpsSpeed);
     }
    
    if (this.score>630&&((this.score/30) % 1 == 0)&&this.asteroid.x<-this.asteroidsWidth) {
	  this.asteroid.revive(1);
	  this.asteroid.y = Math.floor(Math.random() * (this.height-this.asteroidsHeight)) + 1;
	  this.asteroid.x = (Math.random() * 900) + this.width+100; //Right out of screen
	  this.asteroid.body.velocity.x = 1-(Math.random()*((this.asteroidsSpead*2)-this.asteroidsSpead+1)+this.asteroidsSpead);
     }
     
	this.planets.forEach(function(planet) {
		
	if (planet.x<-this.planetsWidth) 
	{
       planet.frame = Math.floor((Math.random() * this.planetsTypes) + 1);//Random frame    
       planet.x = (Math.random() * 900) + this.width+100; //Right out of screen
       planet.body.velocity.x = 1-(Math.random()*((this.planetsBaseSpeed*2)-this.planetsBaseSpeed+1)+this.planetsBaseSpeed);//Random speed based on time
    
     
     //Add and update the score
      if (this.player.health>0) this.score += 10;
         this.scoreText.text = 'LightYears: ' + this.score;
     
     //TODO if score =5000 tote ena bos kathe 2500
     
     //todo ena megalo bos sta 19500
     
     //TODO if score = 20000 then "Paradothikan ta sokolatakia!"
      }
	},this);
	
	//bullets
	 this.bullets.forEachAlive(this.rotateBullets,this);
	
	//chocos
	this.chocos.forEach(function(choco){
	 if (choco.x<-this.chocosWidth){
	   choco.revive(1); 
	   choco.frame = Math.floor((Math.random() * this.chocosTypes) + 1);//Random frame    
       choco.x = (Math.random() * 900) + this.width+100; //Right out of screen
       choco.body.velocity.x = 1-(Math.random()*((this.chocosBaseSpeed*2)-this.chocosBaseSpeed+1)+this.chocosBaseSpeed);
	   }	
	},this);
	
    //stars
    this.game.globals.updateStars();

//Slowly rotate the ufo downward, up to a certain point.
        if (this.player.angle < 20)
            this.player.angle += 1;

},
render: function(){
    
},
updateSpeed:function(){
  this.planetsBaseSpeed+=10;
  this.chocosBaseSpeed+=10;
},
hitasteroid:function(){
this.player.health=0;
	
this.damage();
},
damage: function(){

  this.ondamage=10;
  this.player.damage((this.planetsBaseSpeed/70));
  this.updateHealthBar();

 if (this.player.health<0)
 {
	this.playerExplosion = this.game.add.sprite(this.player.x, this.player.y, 'explosion');
    this.playerExplosion.anchor.setTo(0.5, 0.5);
    this.playerExplosion.rotation=this.asteroid.rotation;
    this.playerExplosion.animations.add('caboom');
    this.playerExplosion.play('caboom', 15, false, true);

	if (this.score > localStorage.getItem("highscore")) {//save highscore
                localStorage.setItem("highscore", this.score);
            }
    this.score=0;
    this.planetsBaseSpeed=80;
    this.chocosBaseSpeed=120;        
	this.game.state.start('gameOver',false,false,this.game);
	} 
},
fixdamage:function(){
	 this.player.damage(-3);
     this.updateHealthBar();
	},
slowSpeed:function(){
	if (this.planetsBaseSpeed>200)
    this.planetsBaseSpeed-=20;
    if (this.chocosBaseSpeed>220) 
      this.chocosBaseSpeed-=20;
},
rotateBullets: function(bullet) { 
	bullet.rotation = this.game.physics.arcade.angleBetween(bullet, this.asteroid);
	this.game.physics.arcade.moveToObject(bullet, this.asteroid, this.bullet_speed);
	if (bullet.x<this.player.x) bullet.kill();
},
shootBullet:function(){
	// Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.bullet_shot_delay) return;
    this.lastBulletShotAt = this.game.time.now;

    // Get a dead bullet from the pool
    var bullet = this.bullets.getFirstDead();
    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;
    bullet.revive();
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;
    var bulletOffset = 20 * Math.sin(this.game.math.degToRad(this.player.angle));
        bullet.reset(this.player.x + bulletOffset+this.player.width, this.player.y);
        bullet.angle = this.player.angle;
        this.game.physics.arcade.velocityFromAngle(bullet.angle - 90, this.bullet_speed, bullet.body.velocity);
        bullet.body.velocity.x += this.player.body.velocity.x;
        this.game.physics.arcade.moveToObject(bullet, this.asteroid, this.bullet_speed);
},
destroyasteroid:function(bullet){
	bullet.kill();
	this.asteroid.kill();
	this.asteroidExplosion = this.game.add.sprite(this.asteroid.x, this.asteroid.y, 'explosion');
    this.asteroidExplosion.anchor.setTo(0.5, 0.5);
    this.asteroidExplosion.rotation=this.asteroid.rotation;
    this.asteroidExplosion.animations.add('boom');
    this.asteroidExplosion.play('boom', 15, false, true);
	this.asteroid.x=-this.asteroidsWidth-1;//needed for update function
},
collectChoco:function(choco){
	choco.kill();
	this.collectedChocos++;
	
	var chocowhirlpool = this.game.add.sprite(choco.x, choco.y, 'whirlpool');
    chocowhirlpool.anchor.setTo(0.5, 0.5);
    chocowhirlpool.animations.add('slurp');
    chocowhirlpool.play('slurp', 15, false, true);
 
	choco.x = -this.chocosWidth-1;
	this.collectedChocosText.text = "Chocos: "+this.collectedChocos;
},
jump: function() {  
    // Add a vertical velocity to the ufo
    this.player.body.velocity.y = -350;
    // Jump animation
    this.game.add.tween(this.player).to({angle: -20}, 100).start();
},
updateHealthBar:function(){
 //update health bar
  var cw = Math.floor((this.player.health / this.player.maxHealth) * this.healthwidth);
  var cropRect = new Phaser.Rectangle(0,0,cw,18);
  this.health_bar.crop(cropRect);
	},
restartGame: function() {  
    var stateKey = this.game.state.getCurrentState().state.current;
    this.game.state.start(stateKey,true,false,this.game,"");
}

};