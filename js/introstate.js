var introState = {

	 init: function(thisgame){ //You can pass any number of init parameters
     this.game=thisgame;
     this.width=this.game.globals.width;
     this.height=this.game.globals.height;
  },
	create: function(){
    //Stars
    this.game.globals.createStars();

    this.background = this.add.sprite(0, 0, 'preloaderBackground');


		this.gameTitle = this.game.add.sprite(this.game.world.centerX,30,"gametitle");
		this.gameTitle.anchor.setTo(0.5,0);
		this.playButton = this.game.add.button(this.game.world.centerX,630,"taptoplay",this.playTheGame,this);
		this.playButton.anchor.setTo(0.5,0.5);

var text= "\
Παρέδωσε τα διαστημικά σοκολατάκια που θα μαζέψεις στην διαδρομή σου \n\
στον πλανήτη nubulu 20000 έτη φωτός μακριά απο την Γη.\n\
Στο δρόμο σου να αποφεύγης την βαριτηκή έλξη των πλανιτών \n\
γιατί σου χαλάει καύσιμα, μην ανησυχείς όμως,\n\
θα συναντάς συχνά στην διαδρομή σου σταθμούς ανεφοδιασμού.\n\
Μπορείς να επιβραδίνεις λίγο το ταξίδι σου αν περάσεις κοντά \n\
απο ενα διαστιμικό σαλιγκάρι.\n\
Κατέστρεψε τους μετεορίτες γιατί αν συγκρουστής μαζί τους \n\
θα καταστραφεί άμεσα το διαστιμόπλιο σου!\n\
Καλη επιτυχία στην αποστολή σου!\
";
var lines=text.split(/\n/).length;                
var fontSize=32;
console.log(lines,this.gameTitle.y,this.gameTitle.height);
var ypos=(this.gameTitle.y+this.gameTitle.height)+10;

this.introtextshadow= game.add.bitmapText(this.game.world.centerX+1, ypos+1,'introFontsShadow',text, fontSize);    
this.introtextshadow.anchor.set(0.5,0);
this.introtext = game.add.bitmapText(this.game.world.centerX, ypos,'introFonts',text, fontSize);
this.introtext.anchor.set(0.5,0);
 



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
