/**
* @author       Panagiotis Skarvelis
* @copyright    2016
* @license      {@link https://github.com/sl45sms/FlapAtSpace/blob/master/license.txt|MIT License}
*/

var flapState = {
    game: {},
    player: {},
    bullet_shot_delay:100, // milliseconds (10 bullets/second)
    bullet_speed:800, // pixels/second
    alien_bullet_speed:1200,
    number_of_bullets : 1,
    planets: [],
    planetsBaseSpeed:80,
    planetsWidth:135,
    planetsHeight:135,
    planetsTypes:8,
    blackholeWidth:230,
    blackholeHeight:260,
    blackholeSpeed:150,
    alienWidth:120,
    alienHeight:80,
    alienSpeed:300,
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
    alienfiringTimer:0,
    spaceKey: {},
    ondamage:0,
    health_bar: "",
    healthwidth: 210,
    distance:0,
    distanceText:"",
    maxDistance:20000,
    collectables:{},//Here you have to push any group that have collectable objects
    enemies:{},//Here you have to push any group that have enemies
    letsplaymusic:false,

resetVars:function(){
	 this.distance =0;
     this.collectedChocos=0;
     this.planetsBaseSpeed=80;
     this.chocosBaseSpeed=120;  
     this.ondamage=0;
     this.alienondamage=0;
},

init: function(thisgame){ //You can pass any number of init parameters
	
	 this.t =thisgame.t;
     this.game=thisgame;
     this.game.stage.disableVisibilityChange = false; //not run on loosing focus  
     this.padchocos =19-(this.t['chocolates'].length);  
     this.padhighscore = 16-(this.t['highscore'].length); 
     this.scaleRatio=this.game.globals.scaleRatio;
     this.width=this.game.globals.width;
     this.height=this.game.globals.height;
     this.resetVars();
  },



shutDown: function(){

},

create: function() {
	
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
   
    this.game.stage.backgroundColor = '#111';
    //nubulu as background (place first-- order of sprites maters)
    this.nubulu = this.game.add.sprite(0, 0, 'nubulu');
    this.nubulu.width=this.width;
    this.nubulu.height=this.height;
   
   
     //stars 
    this.game.globals.createStars();
    
    //blackhole above all 
      this.blackhole = this.game.add.sprite(-1000, 500, 'blackhole');
      this.game.physics.arcade.enable(this.blackhole);
      this.blackhole.animations.add('hairyblackhole');
      this.blackhole.play('hairyblackhole', 15, true, true);
      this.blackhole.body.angularVelocity=-120;  
      this.blackhole.anchor.setTo(0.5, 0.5);
      this.blackhole.body.velocity.x = 1-(Math.random()*((this.blackholeSpeed*2)-this.blackholeSpeed+1)+this.blackholeSpeed);
      this.blackhole.body.immovable = true;
      this.blackhole.scale.setTo(this.scaleRatio, this.scaleRatio);


    //Bullets
     this.bullets = this.game.add.group();
      for(var i = 0; i < this.number_of_bullets; i++) {
        var bullet = this.game.add.sprite(0, 0, 'bullet');
        this.bullets.add(bullet);
         bullet.anchor.setTo(0, 0.5);
         bullet.scale.setTo(this.scaleRatio, this.scaleRatio);
         this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
         bullet.kill();
        }
  
     //alien bullet
     this.alienbullet = this.game.add.sprite(-1000, 500, 'alienbullet');
     this.game.physics.arcade.enable(this.alienbullet);
     this.alienbullet.checkWorldBounds = true;
     this.alienbullet.outOfBoundsKill = true;
     this.alienbullet.scale.setTo(this.scaleRatio, this.scaleRatio);
     this.alienbullet.kill();
      
     
     //Planets
     this.planets = this.game.add.group();
     this.maxplanets=Math.floor(this.height/(this.planetsHeight*this.scaleRatio));//TODO on scale???
     this.planetsPosheight=this.height/this.maxplanets;

    for (var i = 0; i < this.maxplanets; i++)
    {
      var planet =  this.planets.create((Math.random() * 900) + 530, i * this.planetsPosheight, 'planets',Math.floor(Math.random() * this.planetsTypes));
      planet.num = i; //to keep y pos at update
      this.game.physics.arcade.enable(planet);
      planet.body.velocity.x = 1-(Math.random()*((this.planetsBaseSpeed*2)-this.planetsBaseSpeed+1)+this.planetsBaseSpeed);
      planet.body.immovable = true;
      planet.scale.setTo(this.scaleRatio, this.scaleRatio);
    }
 

     //PowerUps
      this.powerups = this.game.add.group();
      this.shield = this.powerups.create((Math.random() * 900) + 530, -1000, 'shield',1);
      this.game.physics.arcade.enable(this.shield);
      this.shield.body.velocity.x = 1-(Math.random()*((this.powerUpsSpeed*2)-this.powerUpsSpeed+1)+this.powerUpsSpeed);
      this.shield.body.immovable = true;
      this.shield.scale.setTo(this.scaleRatio, this.scaleRatio);
      this.slowdown = this.powerups.create((Math.random() * 900) + 530, -1000, 'slowdown',1);
      this.game.physics.arcade.enable(this.slowdown);
      this.slowdown.body.velocity.x = 1-(Math.random()*((this.powerUpsSpeed*2)-this.powerUpsSpeed+1)+this.powerUpsSpeed);
      this.slowdown.body.immovable = true;
      this.slowdown.scale.setTo(this.scaleRatio, this.scaleRatio);
    
     //chocos
     this.chocos =  this.game.add.group();
     for (var i = 0; i < 5; i++)
    {
       var choco = this.chocos.create( (Math.random() * 900) + 530, Math.floor(Math.random() * (this.height-this.chocosHeight)) + 1 , 'chocos',Math.floor(Math.random() * this.chocosTypes)); 
       this.game.physics.arcade.enable(choco);
       choco.anchor.setTo(0.5, 0.5);
       choco.body.velocity.x = 1-(Math.random()*((this.chocosBaseSpeed*2)-this.chocosBaseSpeed+1)+this.chocosBaseSpeed);
       choco.inputEnabled = true;
       choco.events.onInputDown.add(this.collectChoco, this);
       choco.input.useHandCursor = true;
       choco.scale.setTo(this.scaleRatio, this.scaleRatio);
    }

     //asteroids
     //this.asteroids = this.game.add.group();  
     this.asteroid = this.game.add.sprite((Math.random() * 900) + 530, -1000 , 'asteroid',1);
     this.game.physics.arcade.enable(this.asteroid);
     this.asteroid.anchor.setTo(0.5, 0.5);
     this.asteroid.body.velocity.x = 1-(Math.random()*((this.asteroidsSpead*2)-this.asteroidsSpead+1)+this.asteroidsSpead);
    
     this.asteroid.body.angularVelocity=-100;
     this.asteroid.inputEnabled = true;
     this.asteroid.input.useHandCursor = true;
     this.asteroid.events.onInputDown.add(this.shootAsteroid,this);
     this.asteroid.body.immovable = true;
     this.asteroid.scale.setTo(this.scaleRatio, this.scaleRatio); 

     //alien
     this.alien = this.game.add.sprite((Math.random() * 900) + 530,-1000,'alienufo');
     this.game.physics.arcade.enable(this.alien);
     this.alien.frame = 0; 
     this.alien.maxHealth = 1000;
     this.alien.health = this.alien.maxHealth;
     this.alien.anchor.setTo(-0.2, 0.5); 
     this.alien.alarms = this.alien.animations.add('alarms');
     this.alien.animations.play('alarms', 30, true);
     this.alien.body.velocity.setTo(this.alienSpeed,this.alienSpeed)
     this.alien.body.bounce.set(1,1);
     this.alien.inputEnabled = true;
     this.alien.input.useHandCursor = true;
     this.alien.events.onInputDown.add(this.shootAlien,this);
     this.alien.body.collideWorldBounds = true;
     this.alien.health=0;
     this.alien.scale.setTo(this.scaleRatio, this.scaleRatio);
     this.alien.kill();

   
   
   //Player
   this.player = this.game.add.sprite(80, 500, 'ufo');
   //  We need to enable physics on the player
   this.game.physics.arcade.enable(this.player);
   //  Player physics properties.
   //this.player.body.bounce.y = 0;
   this.player.body.gravity.y = 1000;
   this.player.body.collideWorldBounds = true;
 
  
   this.player.frame = 0; 
   this.player.maxHealth = 1000;
   this.player.health = this.player.maxHealth;
   this.player.anchor.setTo(-0.2, 0.5); 
   
   this.player.scale.setTo(this.scaleRatio, this.scaleRatio);
   
   //player 
   var player=this.player;
   
   //wall at bottom
   this.wall = this.add.tileSprite(0,this.world.height-10, this.world.width, this.world.height, 'transparent');
   this.wall.fixedToCamera = true; 
   this.game.physics.arcade.enable(this.wall);
   
   //logo
   this.gameTitle = this.game.add.sprite(10,10,"gametitlesmall");
   this.gameTitle.anchor.setTo(0,0);
   this.gameTitle.scale.setTo(this.scaleRatio, this.scaleRatio);
   
   //health bar
   this.health_bar_back=this.game.add.sprite(this.gameTitle.width+20,12,'health_back');
   this.health_bar_back.fixedToCamera = true;
   this.health_bar_back.anchor.setTo(0,0);
   this.health_bar_back.scale.setTo(this.scaleRatio, this.scaleRatio);
   this.health_bar = this.game.add.sprite(this.gameTitle.width+20,12,'health_bar');
   this.health_bar.cropEnabled = true;
   this.health_bar.fixedToCamera = true;
   this.health_bar.anchor.setTo(0,0);
   this.health_bar.scale.setTo(this.scaleRatio, this.scaleRatio);


   
   
   //The score
   this.distanceText = game.add.bitmapText(this.health_bar_back.x+this.health_bar_back.width+10, 8, 'introFonts',this.t['distance'] + this.pad(this.maxDistance,5)+this.t['ly'],26);
   this.distanceText.anchor.setTo(0,0);
   this.distanceText.fixedToCamera = true;
   this.distanceText.scale.setTo(this.scaleRatio, this.scaleRatio);
   
   //the colected chocos
   this.collectedChocosText = game.add.bitmapText(this.distanceText.x+this.distanceText.width+15, 2, 'introFonts',this.t['chocolates'] + this.pad(this.collectedChocos,this.padchocos),34);
   this.collectedChocosText.tint = 0xbd9677;
   this.collectedChocosText.anchor.setTo(0,0);
   this.collectedChocosText.fixedToCamera = true;
   this.collectedChocosText.scale.setTo(this.scaleRatio, this.scaleRatio);
   
   //highscore 
   if (!localStorage.getItem("highscore")) localStorage.setItem("highscore", 630);//beatme!
   this.highscore=localStorage.getItem("highscore");
   this.highscoreText=this.game.add.bitmapText(this.collectedChocosText.x+this.collectedChocosText.width+10, 8, 'introFonts',this.t['highscore'] +this.pad(this.highscore,this.padhighscore),26);
   this.highscoreText.tint = 0xff9040;
   this.highscoreText.anchor.setTo(0,0);
   this.highscoreText.fixedToCamera = true;
   this.highscoreText.scale.setTo(this.scaleRatio, this.scaleRatio);
   //hide if out of screen
   if ((this.highscoreText.x+this.highscoreText.width)>this.world.width) this.highscoreText.kill();
   


   //key mouse touch jump    
   this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   this.spaceKey.onDown.add(this.jump, this); 
   this.input.onDown.add(this.jump, this); //Gia touch se kinita kai mouse
   
      
   //enemies   
   this.enemies.planets=this.planets; 
   this.enemies.asteroids=this.asteroids;
   
   //collectables
   this.collectables.chocos=this.chocos;    
   
   
   //difficulty
   game.time.events.loop(Phaser.Timer.SECOND*5, this.updateSpeed, this);    
 
 
 
   //sounds

   
    this.alien_explosion = game.add.audio('alien_explosion',1,false);//TODO alien hit sound     
    this.blackhole_slurp = game.add.audio('blackhole_slurp',1,false);  
    this.shield_sound = game.add.audio('shield_sound',0.3,false);         
    this.ufo_shot = game.add.audio('ufo_shot',1,false);
    this.alien_shot = game.add.audio('alien_shot',1,false);
    this.blackhole_warning = game.add.audio('blackhole_warning',1,false);
    this.timewrapp_sound = game.add.audio('timewrapp_sound',0.3,false);
    this.whirlpool_sound = game.add.audio('whirlpool_sound',0.4,false);
    this.asteroid_explosion = game.add.audio('asteroid_explosion',1,false);
    this.gravity_sound = game.add.audio('gravity_sound',1,false);
    this.ufo_explosion = game.add.audio('ufo_explosion',1,false);
   


   //+cheats+// Place Cheats here for development tests.. Remove for production!
   this.cheatKeyHealth = this.game.input.keyboard.addKey(Phaser.KeyCode.H);
   this.cheatKeyHealth.onDown.add(function(){
   	 this.player.damage(-300);
     this.updateHealthBar();   
	   }, this); 
   this.cheatKeyDistance =  this.game.input.keyboard.addKey(Phaser.KeyCode.D);
   this.cheatKeyDistance.onDown.add(function(){
   	     if (this.player.health>0) this.distance += 1000;
         this.distanceText.text = this.t['distance'] + this.pad(this.maxDistance-this.distance,5)+this.t['ly'];
	   }, this); 
  //-cheats-//  
  
//REMOVE  
this.scoreButton = this.game.add.button(10,630,"FBlogin",this.game.globals.postFBscore,this);
this.scoreButton.anchor.setTo(0.5,0.5);
this.scoreButton.revive();
//--REMOVE
 },

 update: function() {
   
   /*
    if (this.letsplaymusic==false&&this.cache.isSoundDecoded('music')){
	 	this.letsplaymusic=true;
	   // this.game.globals.first_loop.fadeOut(2000);
	   this.game.globals.first_loop.loop=false;
	   
	    this.game.globals.first_loop.stop();
		this.game.globals.music.play();
	}
   */
   
    //TODO move background slowly (but image must change to support the effect)
   // this.nubulu.tilePosition.x-=2; 
    //TODO is realy needed? or can disable collides for speed
   // this.game.physics.arcade.collide(this.planets, this.chocos);
    //this.game.physics.arcade.collide(this.chocos, this.chocos);
   // this.game.physics.arcade.collide([this.chocos,this.planets], this.powerups);
    this.game.physics.arcade.collide(this.alien, [this.planets,this.asteroid,this.shield,this.slowdown,this.blackhole],this.allienColide);
    
   
	this.game.physics.arcade.overlap(this.blackhole,[this.chocos,this.planets,this.asteroid,this.shield,this.slowdown,this.player,this.bullets], this.blackholeEatSprite, null, this);   
   	this.game.physics.arcade.overlap(this.player, [this.planets,this.wall,this.alienbullet], this.damage, null, this);
   	this.game.physics.arcade.overlap(this.player, this.asteroid, this.hitasteroid, null, this);
   	this.game.physics.arcade.overlap(this.player, this.alien, this.hitalien, null, this);
	this.game.physics.arcade.overlap(this.player, this.shield, this.fixdamage, null, this);
	this.game.physics.arcade.overlap(this.player, this.slowdown, this.slowSpeed, null, this);                                
    this.game.physics.arcade.overlap(this.bullets, this.asteroid, this.destroyasteroid, null, this);
	this.game.physics.arcade.overlap(this.bullets, this.alien, this.destroyalien, null, this);
	
	
	//choose shield, dammage frame
	if (this.player.health>this.player.maxHealth) this.player.frame = 1; else 
	    if (this.ondamage-->0) this.player.frame = 2; else  
	         this.player.frame = 0;
	
	if (this.alienondamage-->0) this.alien.tint=0xFF0000; else this.alien.tint=0xFFFFFF;
	
	//TODO BOS
	/*To bos prepei na vgenei sto distance 19000 kai na einai arketa zoriko*/
	
   //backhole
	if (this.distance>6630&&((this.distance/1320) % 1 == 0)&&this.blackhole.x<-this.blackholeWidth) {
	  this.blackhole.y = Math.floor(Math.random() * (this.height-this.blackholeHeight)) + 1;
	  this.blackhole.x = (Math.random() * 900) + this.width+100; //Right out of screen
	  this.blackhole.body.velocity.x = 1-(Math.random()*((this.blackholeSpeed*2)-this.blackholeSpeed+1)+this.blackholeSpeed);
      this.blackHoleWarning();
     }

   //alien
   	if (this.distance>2630&&((this.distance/660) % 1 == 0)&&(this.alien.x<-this.alienWidth||this.alien.health<=0)) {
	  this.alien.revive(1000);	
	  this.alien.y = Math.floor(Math.random() * (this.height-this.alienHeight)) + 1;
	  this.alien.x = (Math.random() * 900) + this.width+100; //Right out of screen
      this.alien.body.velocity.setTo(200,200);
     }

    //asteroid
    if (this.distance>630&&((this.distance/330) % 1 == 0)&&(this.asteroid.x<-this.asteroidsWidth||this.asteroid.health<=0)) {
	  this.asteroid.revive(1);
	  this.asteroid.y = Math.floor(Math.random() * (this.height-this.asteroidsHeight)) + 1;
	  this.asteroid.x = (Math.random() * 900) + this.width+100; //Right out of screen
	  this.asteroid.body.velocity.x = 1-(Math.random()*((this.asteroidsSpead*2)-this.asteroidsSpead+1)+this.asteroidsSpead);
      this.asteroid.body.angularVelocity=-100;
     }

	//shield
	if (this.distance>220&&((this.distance/110) % 1 == 0)&&this.shield.x<-this.powerUpsWidth) {
	  this.shield.y = Math.floor(Math.random() * (this.height-this.powerUpsHeight)) + 1;
	  this.shield.x = (Math.random() * 900) + this.width+100; //Right out of screen
	  this.shield.body.velocity.x = 1-(Math.random()*((this.powerUpsSpeed*2)-this.powerUpsSpeed+1)+this.powerUpsSpeed);
     }
    
    //slowdown - based on updateSpeed...
	if (this.planetsBaseSpeed>=420&&this.slowdown.x<-this.powerUpsWidth) {
	  this.slowdown.y = Math.floor(Math.random() * (this.height-this.powerUpsHeight)) + 1;
	  this.slowdown.x = (Math.random() * 900) + this.width+100; //Right out of screen
	  this.slowdown.body.velocity.x = 1-(Math.random()*((this.powerUpsSpeed*2)-this.powerUpsSpeed+1)+this.powerUpsSpeed);
     }

    //planets 
	this.planets.forEach(function(planet) {		
	if (planet.x<-this.planetsWidth||planet.health<=0) 
	{
	   planet.revive(1);
       planet.frame = Math.floor((Math.random() * this.planetsTypes) + 1);//Random frame    
       planet.x = (Math.random() * 900) + this.width+100; //Right out of screen
       planet.y = planet.num * this.planetsPosheight;
       planet.body.velocity.x = 1-(Math.random()*((this.planetsBaseSpeed*2)-this.planetsBaseSpeed+1)+this.planetsBaseSpeed);//Random speed based on time
       
     //Add and update the score
      if (this.player.health>0) this.distance += 10;
         this.distanceText.text = this.t['distance'] + this.pad(this.maxDistance-this.distance,5)+this.t['ly'];    

    }
    },this);
	
	//bullets
	 this.bullets.forEachAlive(this.rotateBullets,this);
	//alien bullet
	this.alienshoot();
	
	//chocos
	this.chocos.forEach(function(choco){
	 if ((choco.x<-this.chocosWidth||choco.health<=0)){
	   choco.revive();
	   choco.frame = Math.floor((Math.random() * this.chocosTypes) + 1);//Random frame    
       choco.x = (Math.random() * 900) + this.width+100; //Right out of screen
       choco.y = Math.floor(Math.random() * (this.height-this.chocosHeight)) + 1;
       choco.body.velocity.x = 1-(Math.random()*((this.chocosBaseSpeed*2)-this.chocosBaseSpeed+1)+this.chocosBaseSpeed);
	   }	
	},this);
	
	
    //stars
    this.game.globals.updateStars();

    //Slowly rotate the ufo downward, up to a certain point.
        if (this.player.angle < 20)
            this.player.angle += 1;

    if (this.distance>=this.maxDistance) this.success();

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
hitalien:function(){
this.player.health=0;
this.damage();
},
damage: function(){

  this.ondamage=10;//for damage frame
  this.player.damage((this.planetsBaseSpeed/80));
  this.updateHealthBar();
  if (!this.gravity_sound.isPlaying)this.gravity_sound.play();
 if (this.player.health<=0)
 {
	this.ufo_explosion.play();
	this.playerExplosion = this.game.add.sprite(this.player.x, this.player.y, 'explosion');
    this.playerExplosion.anchor.setTo(0.5, 0.5);
    this.playerExplosion.scale.setTo(this.scaleRatio, this.scaleRatio);
    this.playerExplosion.rotation=this.asteroid.rotation;
    this.playerExplosion.animations.add('caboom');
    this.playerExplosion.play('caboom', 15, false, true);

	if (this.collectedChocos > localStorage.getItem("highscore")) {//save highscore
                localStorage.setItem("highscore", this.collectedChocos);
            }
    this.resetVars();     
	this.game.state.start('gameOver',false,false,this.game);
	} 
},
fixdamage:function(){
	if (!this.shield_sound.isPlaying)this.shield_sound.play();
	 this.player.damage(-3);
     this.updateHealthBar();
	},
slowSpeed:function(){
	if (!this.timewrapp_sound.isPlaying)this.timewrapp_sound.play();
	if (this.planetsBaseSpeed>200)
    this.planetsBaseSpeed-=20;
    if (this.chocosBaseSpeed>220) 
      this.chocosBaseSpeed-=20;
},
rotateBullets: function(bullet) { 
	bullet.rotation = this.game.physics.arcade.angleBetween(bullet, bullet.victim);
	this.game.physics.arcade.moveToObject(bullet, bullet.victim, this.bullet_speed);
	if (bullet.x<this.player.x) bullet.kill();
},
shootBullet:function(victim){
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
    this.ufo_shot.play();
    bullet.revive();
    bullet.victim=victim;
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;
    var bulletOffset = 20 * Math.sin(this.game.math.degToRad(this.player.angle));
        bullet.reset(this.player.x + bulletOffset+this.player.width, this.player.y);
        bullet.angle = this.player.angle;
        this.game.physics.arcade.velocityFromAngle(bullet.angle - 90, this.bullet_speed, bullet.body.velocity);
        bullet.body.velocity.x += this.player.body.velocity.x;
        this.game.physics.arcade.moveToObject(bullet, victim, this.bullet_speed);
},
shootAsteroid:function(){
	this.shootBullet(this.asteroid);
},
shootAlien:function(){
	
	this.shootBullet(this.alien);
},
destroyalien:function(alien,bullet){
	//TODO alien hit sound
	bullet.kill();
	alien.damage(300);//4 times, hit alien to destroy
	this.alienondamage=10;//for damage tint
	if (alien.health<=0){	
	alien.kill();
	this.alien_explosion.play();
	alienExplosion = this.game.add.sprite(this.alien.x, this.alien.y, 'explosion');
    alienExplosion.anchor.setTo(0.5, 0.5);
    alienExplosion.scale.setTo(this.scaleRatio, this.scaleRatio);
    alienExplosion.rotation=this.alien.rotation;
    alienExplosion.animations.add('boom');
    alienExplosion.play('boom', 15, false, true);
	alien.x=-this.alienWidth-1;//needed(?) for update function	
	}
},
destroyasteroid:function(asteroid,bullet){
	bullet.kill();
	asteroid.kill();
	this.asteroid_explosion.play();
	asteroidExplosion = this.game.add.sprite(this.asteroid.x, this.asteroid.y, 'explosion');
    asteroidExplosion.anchor.setTo(0.5, 0.5);
    asteroidExplosion.scale.setTo(this.scaleRatio, this.scaleRatio);
    asteroidExplosion.rotation=this.asteroid.rotation;
    asteroidExplosion.animations.add('boom');
    asteroidExplosion.play('boom', 15, false, true);
	asteroid.x=-this.asteroidsWidth-1;//needed for update function
},
alienshoot: function(){
    if (this.alien.health>0&&game.time.now > this.alienfiringTimer)
    {
		this.alien_shot.play();
        //fire the bullet from alien
        this.alienbullet.reset(this.alien.body.x, this.alien.body.y);
        game.physics.arcade.moveToObject(this.alienbullet,this.player,1200);
        this.alienfiringTimer = game.time.now + 2000;
    }
},
collectChoco:function(choco){
	choco.kill();
	this.collectedChocos++;
	
	this.whirlpool_sound.play();
	var chocowhirlpool = this.game.add.sprite(choco.x, choco.y, 'whirlpool');
    chocowhirlpool.anchor.setTo(0.5, 0.5);
    chocowhirlpool.scale.setTo(this.scaleRatio, this.scaleRatio);
    chocowhirlpool.animations.add('slurp');
    chocowhirlpool.play('slurp', 15, false, true);
 
	choco.x = -this.chocosWidth-1;
	this.collectedChocosText.text = this.t['chocolates'] + this.pad(this.collectedChocos,this.padchocos);
},
blackHoleWarning: function(){
this.blackhole_warning.play();	
var warning=this.game.add.bitmapText(this.game.world.centerX, this.game.height/2, 'introFonts', this.t['warning black hole'], 78);
warning.anchor.setTo(0.5, 0.5);
warning.tint = 0xff2020;

this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
warning.destroy();
}
, this).autoDestroy = true;

},
blackholeEatSprite: function(blackhole,victim){
 this.blackhole_slurp.play();
 this.game.physics.arcade.moveToObject(victim, blackhole, 500);
 var rotTween = game.add.tween(victim).to( { angle: 360 }, 400, Phaser.Easing.Linear.None, true);
 var shrinkTween = game.add.tween(victim.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Linear.None, true)
 .onComplete.add(function(){
     game.tweens.remove(rotTween);
     game.tweens.remove(shrinkTween);
	 
	 if (victim.key=="ufo") {
		 victim.kill();
		 victim.health=-100;
		 this.damage();
		 } else {
	 victim.x= -1000;//left out;
	 victim.scale = {x:1,y:1};
	 victim.revive(1);
	 victim.body.velocity.setTo(0, 0);
	 victim.body.angularVelocity=0;
     victim.rotation=0;
     victim.angle = 0;   
   
      }

	 },
 this);

 
},
jump: function() {  
    // Add a vertical velocity to the ufo
    this.player.body.velocity.y = -350;//TODO folow scale?
    // Jump animation
    this.game.add.tween(this.player).to({angle: -20}, 100).start();
},
allienColide: function(alien,planet){
alien.body.velocity.setTo(200,200); //do not bounce frenzy!
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
},
pad: function(num,size){
return ('00000000'+num).substr(-size);
},
success:function(){
    this.resetVars();
    this.player.kill();
    this.alien.kill();
    this.distanceText.text = this.t['distance'] + this.pad(0,5)+this.t['ly'];
	this.game.state.start('gameSuccess',false,false,this.game);
}

};
