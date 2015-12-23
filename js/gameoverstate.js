var gameOver={
	init: function(thisgame){ //You can pass any number of init parameters
     this.game=thisgame;
     this.t =thisgame.t;
     this.now = this.game.time.now;  
     this.clickdelay=2000;
  },
create: function(){
	
		this.gameTitle = this.game.add.sprite(this.game.world.centerX,120,"gametitle");
		this.gameTitle.anchor.setTo(0.5,0.5);
		this.playButton = this.game.add.button(this.game.world.centerX,630,"taptoplay",this.playTheGame,this);
		this.playButton.anchor.setTo(0.5,0.5);


        var ypos=(this.gameTitle.y+this.gameTitle.height)+90;
        this.gameOverText = game.add.bitmapText(this.game.world.centerX, ypos+1,'introFonts',this.t['game over'], 64);    
        this.gameOverText.anchor.set(0.5,0.5);
        this.gameOverText.tint = 0xFF9677;
        this.gameOverAgain = game.add.bitmapText(this.game.world.centerX, ypos+1+this.gameOverText.height+10,'introFonts',this.t['start again'], 32);    
        this.gameOverAgain.anchor.set(0.5,0.5);


	
    //key mouse touch playTheGame    
   this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   this.spaceKey.onDown.add(this.playTheGame, this); 
   this.input.onDown.add(this.playTheGame, this); //Gia touch se kinita kai mouse

	},
	update:function(){
	    this.game.globals.updateStars();

	},
	playTheGame: function(){
       if (this.game.time.now>this.now+this.clickdelay){
       this.gameTitle.kill();
       this.gameOverText.kill();
       this.gameOverAgain.kill();
       this.playButton.kill();
	   game.state.start("flapState",true,false,this.game);
	 }
	}
	
	}
