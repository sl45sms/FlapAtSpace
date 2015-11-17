var introState = {
	stars:[],

	init: function(thisgame,width,height){ //You can pass any number of init parameters
     this.game=thisgame;
     this.width=width;
     this.height=height;
  },
	 preload: function() {
            this.game.stage.disableVisibilityChange = true; //run without focus
            this.game.load.image("gametitle","assets/flap/gametitle.png");
            this.game.load.image("taptoplay","assets/flap/taptoplay.png");
            this.game.load.image('star', 'assets/flap/star.png');
         },


	create: function(){
		var gameTitle = this.game.add.sprite(this.game.world.centerX,120,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(this.game.world.centerX,630,"taptoplay",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);


			var style = { font: "25px Arial", fill: "#ffffff", align: "center" };

    var text = game.add.text(this.game.world.centerX, this.game.world.centerY-60, "Παρέδωσε τα διαστημικά σοκολατάκια που θα μαζέψεις στην διαδρομή σου\n\
     στον πλανήτη nubulu 20000 έτη φωτός μακριά απο την Γη,\n\
Στο δρόμο σου να αποφεύγης την βαριτηκή έλξη των πλανιτών\n γιατί σου χαλάει καύσιμα, μην ανησυχείς όμως,\n\
θα συναντάς συχνά στην διαδρομή σου σταθμούς ανεφοδιασμού.\n\
Μπορείς να επιβραδίνεις λίγο το ταξίδι σου\n αν περάσεις κοντά απο ενα διαστιμικό σαλιγκάρι.\n\
Κατέστρεψε τους μετεορίτες γιατί αν συγκρουστής μαζί τους\n θα καταστραφεί άμεσα το διαστιμόπλιο σου!\n\
Καλη επιτυχία στην αποστολή σου!\n\
", style);

    text.anchor.set(0.5);




		    //Star field
   	this.star = this.game.make.sprite(0, 0, 'star');
	this.starfield1 = this.game.add.renderTexture(this.width, this.height, 'starfield1');
	this.starfield2 = this.game.add.renderTexture(this.width, this.height, 'starfield2');
	this.starfield3 = this.game.add.renderTexture(this.width, this.height, 'starfield3');


		this.game.add.sprite(0, 0, this.starfield1);
	this.game.add.sprite(0, 0, this.starfield2);
	this.game.add.sprite(0, 0, this.starfield3);

    var t = this.starfield1;
	var s = 4;

    //TODO anti na elenxo to speed mipos apla na vazo velocity -x -xx -xxx
    //Ara anti na exo textures na einai sprite?? ti epiptosh tha exei sthn taxitita?
	//	100 stars per layer
	for (var i = 0; i < 300; i++) //TODO random scale...
	{
		if (i == 100)
		{
			//	With each 100 stars we ramp up the speed a little and swap to the next texture
			s = s+2;
			t = this.starfield2;
		}
		else if (i == 200)
		{
			s = s+1;
			t = this.starfield3;
		}

		this.stars.push( { x: this.game.world.randomX, y: this.game.world.randomY, speed: s, texture: t });
	}

	},
	update:function(){
			for (var i = 0; i < 300; i++)
	{
		//	Update the stars y position based on its speed
		this.stars[i].x -= this.stars[i].speed;

		if (this.stars[i].x < 1)
		{
			//	Off the left of the screen? Then wrap around to the right
			this.stars[i].y = this.game.world.randomY;
			this.stars[i].x = this.width;
		}

		if (i == 0 || i == 100 || i == 200)
		{
			//	If it's the first star of the layer then we clear the texture
			this.stars[i].texture.renderXY(this.star, this.stars[i].x, this.stars[i].y, true);
		}
		else
		{
			//	Otherwise just draw the star sprite where we need it
			this.stars[i].texture.renderXY(this.star, this.stars[i].x, this.stars[i].y, false);
		}
	}

	},
	playTheGame: function(){
		game.state.add("flapState", eval("flapState"))
		game.state.start("flapState",true,false,this.game,this.width,this.height);
	}



}
