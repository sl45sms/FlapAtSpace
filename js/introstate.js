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
Παράδωσε τα διαστημικά σοκολατάκια που θα μαζέψεις στη διαδρομή σου\n\
στον πλανήτη nubulu, 20000 έτη φωτός μακριά από την Γη.\n\
Στο δρόμο σου να αποφεύγεις τη βαρυτική έλξη των πλανητών \n\
γιατί σου χαλάει καύσιμα, μην ανησυχείς όμως,θα συναντάς συχνά \n\
στην διαδρομή σου σταθμούς ανεφοδιασμού.\n\
Μπορείς να επιβραδύνεις λίγο το ταξίδι σου\n αν περάσεις πάνω απο χρονοτούνελ.\n\
Κατάστρεψε τους μετεωρίτες γιατί αν συγκρουστείς μαζί τους θα καταστραφεί\n\
άμεσα το διαστημόπλοιό  σου!\n\\n\
Καλή επιτυχία στην αποστολή σου!\n\
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
