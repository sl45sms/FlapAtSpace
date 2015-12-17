var preLoad={
	 ready:false,
	  planetsWidth:135,
      planetsHeight:135,
      planetsTypes:8,
   init: function(thisgame){ //You can pass any number of init parameters

     this.game=thisgame;
     this.game.stage.disableVisibilityChange = true; //run without focus  
  },
  preload: function() {
         
            
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);
            
            this.game.load.image("gametitle","assets/intro/gametitle.png");
            this.game.load.image("taptoplay","assets/intro/taptoplay.png");

            this.game.load.image('nubulu', 'assets/flap/background.png');
            this.game.load.image('gametitlesmall', 'assets/flap/gametitleSmall.png');
            this.game.load.image('star', 'assets/flap/star.png');
            this.game.load.image('health_back', 'assets/flap/health_back.png');
            this.game.load.image('health_bar', 'assets/flap/health_bar.png');
            this.game.load.image('shield', 'assets/flap/shield.png');
            this.game.load.image('slowdown', 'assets/flap/slowdown.png');            
            this.game.load.image('asteroid', 'assets/flap/asteroid.png'); 
            this.game.load.image('bullet', 'assets/flap/bullets.png');
            this.game.load.image('alienbullet', 'assets/flap/alienbullet.png');            
            this.game.load.image('transparent', 'assets/flap/transparent.png');             
            
            
            this.game.load.spritesheet('blackhole', 'assets/flap/blackhole.png', 230, 260);
            this.game.load.spritesheet('chocos', 'assets/flap/chocos.png', 160, 180);
            this.game.load.spritesheet('whirlpool', 'assets/flap/whirlpool.png', 140, 130);
            this.game.load.spritesheet('explosion', 'assets/flap/explosion.png', 128, 128);   
            this.game.load.spritesheet('ufo', 'assets/flap/ufo_sprite.png', 120, 80,3); 
            this.game.load.spritesheet('alienufo', 'assets/flap/alienufo_sprite.png', 120, 80, 4);      
            this.game.load.spritesheet('planets', 'assets/flap/hjm-planet-sheet_3.png', this.planetsWidth, this.planetsHeight,this.planetsTypes,5,15);


           this.game.load.bitmapFont('introFonts', 'assets/intro/introFonts.png', 'assets/intro/introFonts.fnt');
           this.game.load.bitmapFont('introFontsShadow', 'assets/intro/introFontsShadow.png', 'assets/intro/introFonts.fnt');

           this.game.load.audio('alien_explosion','assets/flap/alien_explosion.ogg');     
           this.game.load.audio('blackhole_slurp','assets/flap/blackhole_slurp.ogg');    
           this.game.load.audio('shield_sound','assets/flap/shield.ogg');         
           this.game.load.audio('ufo_shot','assets/flap/ufo_shot.ogg');
           this.game.load.audio('alien_shot','assets/flap/alien_shot.ogg');
           this.game.load.audio('blackhole_warning','assets/flap/blackhole_warning.ogg');
           this.game.load.audio('timewrapp_sound','assets/flap/timewrapp.ogg');
           this.game.load.audio('whirlpool_sound','assets/flap/whirlpool.ogg');
           this.game.load.audio('asteroid_explosion','assets/flap/asteroid_explosion.ogg');
           this.game.load.audio('gravity_sound','assets/flap/gravity.ogg');
           this.game.load.audio('ufo_explosion','assets/flap/ufo_explosion.ogg');

           this.game.load.audio('basic_loop','assets/common/music/basic_loop.ogg');
           this.game.load.audio('music','assets/common/music/Jahzzar_-_03_-_Montmartre.ogg');
           
},

create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
		this.game.globals.first_loop = game.add.audio('first_loop',0.6,true);
        this.game.globals.first_loop.play('',0,1,true);

	},

update: function () {

		if (this.cache.isSoundDecoded('first_loop') && this.ready == false)
		{
			this.ready = true;
			this.preloadBar.kill();
			this.game.state.start('introState',true,false,this.game);
		}

	}
	
	}
