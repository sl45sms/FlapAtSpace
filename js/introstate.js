var introState = {

	 init: function(thisgame){ //You can pass any number of init parameters
     this.game=thisgame;
     this.width=this.game.globals.width;
     this.height=this.game.globals.height;
  },
	create: function(){
		this.gameTitle = this.game.add.sprite(this.game.world.centerX,120,"gametitle");
		this.gameTitle.anchor.setTo(0.5,0.5);
		this.playButton = this.game.add.button(this.game.world.centerX,630,"taptoplay",this.playTheGame,this);
		this.playButton.anchor.setTo(0.5,0.5);

		var style = { font: "25px Arial", fill: "#ffffff", align: "center" };

        this.introtext = game.add.text(this.game.world.centerX, this.game.world.centerY-60, "Παρέδωσε τα διαστημικά σοκολατάκια που θα μαζέψεις στην διαδρομή σου\n\
     στον πλανήτη nubulu 20000 έτη φωτός μακριά απο την Γη,\n\
Στο δρόμο σου να αποφεύγης την βαριτηκή έλξη των πλανιτών\n γιατί σου χαλάει καύσιμα, μην ανησυχείς όμως,\n\
θα συναντάς συχνά στην διαδρομή σου σταθμούς ανεφοδιασμού.\n\
Μπορείς να επιβραδίνεις λίγο το ταξίδι σου\n αν περάσεις κοντά απο ενα διαστιμικό σαλιγκάρι.\n\
Κατέστρεψε τους μετεορίτες γιατί αν συγκρουστής μαζί τους\n θα καταστραφεί άμεσα το διαστιμόπλιο σου!\n\
Καλη επιτυχία στην αποστολή σου!\n\
", style);

    this.introtext.anchor.set(0.5);

    this.game.globals.createStars();

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
