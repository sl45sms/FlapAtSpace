var gameOver={
	init: function(thisgame){ //You can pass any number of init parameters
     this.game=thisgame;
      
  },


create: function(){
		this.gameTitle = this.game.add.sprite(this.game.world.centerX,120,"gametitle");
		this.gameTitle.anchor.setTo(0.5,0.5);
		this.playButton = this.game.add.button(this.game.world.centerX,630,"taptoplay",this.playTheGame,this);
		this.playButton.anchor.setTo(0.5,0.5);


	var style = { font: "25px Arial", fill: "#ffffff", align: "center" };

    this.introtext = game.add.text(this.game.world.centerX, this.game.world.centerY-60, "Εχασές! Πάμε παλί απο την αρχή!", style);

    this.introtext.anchor.set(0.5);

	
    //key mouse touch playTheGame    
   this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   this.spaceKey.onDown.add(this.playTheGame, this); 
   this.input.onDown.add(this.playTheGame, this); //Gia touch se kinita kai mouse

	},
	update:function(){
	    this.game.globals.updateStars();

	},
	playTheGame: function(){
       this.gameTitle.kill();
       this.introtext.kill();
       this.playButton.kill();
		game.state.start("flapState",true,false,this.game);
	}
	
	}
