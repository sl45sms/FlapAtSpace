/**
* @author       Panagiotis Skarvelis
* @copyright    2016
* @license      {@link https://github.com/sl45sms/FlapAtSpace/blob/master/license.txt|MIT License}
*/

var gameSuccess={
	init: function(thisgame){ //You can pass any number of init parameters
     this.game=thisgame;
     this.t =thisgame.t;
     this.now = this.game.time.now;  
     this.clickdelay=2000;
     this.ufo={};
  },
create: function(){

	    this.background = this.add.sprite(0, 0, 'preloaderBackground');
	  	    
		this.gameTitle = this.game.add.sprite(this.game.world.centerX,120,"gametitle");
		this.gameTitle.anchor.setTo(0.5,0.5);
		this.playButton = this.game.add.button(this.game.world.centerX,630,"taptoplay",this.playTheGame,this);
		this.playButton.anchor.setTo(0.5,0.5);
  

        var ypos=(this.gameTitle.y+this.gameTitle.height)+90;
        this.successText = game.add.bitmapText(this.game.world.centerX, ypos+1,'introFonts',this.t['win'], 64);    
        this.successText.anchor.set(0.5,0.5);
        this.successText.tint = 0xFF9677;
        this.successAgain = game.add.bitmapText(this.game.world.centerX, ypos+1+this.successText.height+10,'introFonts',this.t['start again'], 32);    
        this.successAgain.anchor.set(0.5,0.5);
	
	 this.player = this.game.add.sprite(80, 500, 'ufo');
     this.game.physics.arcade.enable(this.player);
     this.player.body.gravity.y = 1000;
     this.player.body.collideWorldBounds = true;
     this.player.body.bounce.set(1,1);
     this.player.body.velocity.setTo(400,400);      

	
	
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
       this.successText.kill();
       this.successAgain.kill();
       this.playButton.kill();
       this.player.kill();
	   game.state.start("flapState",true,false,this.game);
   }
	
	}
	
	}
