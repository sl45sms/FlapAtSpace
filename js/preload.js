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
            
            this.game.load.spritesheet('chocos', 'assets/flap/chocos.png', 160, 180);
            this.game.load.spritesheet('whirlpool', 'assets/flap/whirlpool.png', 140, 130);
            this.game.load.spritesheet('explosion', 'assets/flap/explosion.png', 128, 128);   
            this.game.load.spritesheet('ufo', 'assets/flap/ufo_sprite.png', 120, 80,3);      
            this.game.load.spritesheet('planets', 'assets/flap/hjm-planet-sheet_3.png', this.planetsWidth, this.planetsHeight,this.planetsTypes,5,15);

           this.game.load.bitmapFont('introFonts', 'assets/intro/introFonts.png', 'assets/intro/introFonts.fnt');
           this.game.load.bitmapFont('introFontsShadow', 'assets/intro/introFontsShadow.png', 'assets/intro/introFonts.fnt');
},

create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		//if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
	//	{
			this.ready = true;
			this.preloadBar.kill();
			this.game.state.start('introState',true,false,this.game);
	//	}

	}
	
	}
