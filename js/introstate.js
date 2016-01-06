/**
* @author       Panagiotis Skarvelis
* @copyright    2016
* @license      {@link https://github.com/sl45sms/FlapAtSpace/blob/master/license.txt|MIT License}
*/

var introState = {
line :[],
wordIndex:0,
lineIndex:0,
wordDelay:120,
lineDelay:400,
fontsize:32,
letsstart:false,
init: function(thisgame){ //You can pass any number of init parameters
     this.game=thisgame;
     this.width=this.game.globals.width;
     this.height=this.game.globals.height;
     },
	create: function(){
    this.intromsg =this.game.t['intro text'];
    //Stars
    this.game.globals.createStars();
    this.background = this.add.sprite(0, 0, 'preloaderBackground');
    this.background.width=this.width;
    this.background.height=this.height;

	this.gameTitle = this.game.add.sprite(this.game.world.centerX,30,"gametitle");
	this.gameTitle.anchor.setTo(0.5,0);
	this.playButton = this.game.add.button(this.game.world.centerX,this.game.world.height-100,"taptoplay",this.playTheGame,this);
	this.playButton.anchor.setTo(0.5,0.5);
    this.playButton.kill();	


var ypos=(this.gameTitle.y+this.gameTitle.height)+30;
this.introtextshadow = game.add.bitmapText(21, ypos+1,'introFontsShadow','', this.fontSize);    
this.introtextshadow.anchor.set(0,0);
this.introtext = game.add.bitmapText(20, ypos,'introFonts','', this.fontSize);
this.introtext.anchor.set(0,0);

   //key mouse touch playTheGame    
   this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   this.spaceKey.onDown.add(this.playTheGame, this); 
   this.input.onDown.add(this.playTheGame, this); //Gia touch se kinita kai mouse

//lets music play
this.game.globals.basic_loop = game.add.audio('basic_loop',0.6,true);



this.nextLine();



	},
	update:function(){
		
	this.game.globals.updateStars();
	
	if (this.cache.isSoundDecoded('first_loop')&&this.letsstart==false){
	    //this.game.globals.first_loop.fadeOut(2000);
        //this.game.globals.basic_loop.play('',0,1,true);
		this.letsstart=true;
		this.playButton.revive();
	}
	
	
	},
	playTheGame: function(){
     if (this.letsstart==true){	
	   this.gameTitle.kill();
       this.introtext.kill();
       this.playButton.kill();
	   game.state.start("flapState",true,false,this.game);
      }
	},
	nextLine:function() {
    if (this.lineIndex === this.intromsg.length)
    {
        //  We're finished
        return;
    }
    //  Split the current line on spaces, so one word per array element
    this.line = this.intromsg[this.lineIndex].split(' ');
    //  Reset the word index to zero (the first word in the line)
    this.wordIndex = 0;
    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);
    //  Advance to the next line
    this.lineIndex++;
},
nextWord:function() {
    //  Add the next word onto the text string, followed by a space
    this.introtext.text = this.introtext.text.concat(this.line[this.wordIndex] + " ");
    this.introtextshadow.text = this.introtextshadow.text.concat(this.line[this.wordIndex] + " ");
    //  Advance the word index to the next word in the line
    this.wordIndex++;
    //  Last word?
    if (this.wordIndex === this.line.length)
    {
        //  Add a carriage return
        this.introtextshadow.text = this.introtextshadow.text.concat("\n");
        this.introtext.text = this.introtext.text.concat("\n");
        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(this.lineDelay, this.nextLine, this);
    }
}


}
