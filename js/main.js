function onDeviceReady() {
console.log("Ready to FlapAtSpace!");

game = new Phaser.Game(1024, 768, Phaser.CANVAS, 'phaserCanvas');

game.state.add('Boot', Boot);
game.state.add('preLoad', preLoad);
game.state.add('introState', introState);
game.state.add('flapState', flapState);
game.state.add('gameOver', gameOver);
game.state.add('gameSuccess', gameSuccess);

game.globals={
    //score: 0,
    orientated: false,
  	stars:[],
  	star:{},
  	starfield1:{},
  	starfield2:{},
  	starfield3:{},  	
	width:1024,
	height:768,
	first_loop:null,
	basic_loop:null,
	refrain:null,
	music:null,

createStars:function(){
	this.stars=[];
		
	//Star field
	

   	this.star = game.make.sprite(0, 0, 'star');
	this.starfield1 = game.add.renderTexture(this.width, this.height, 'starfield1');
	this.starfield2 = game.add.renderTexture(this.width, this.height, 'starfield2');
	this.starfield3 = game.add.renderTexture(this.width, this.height, 'starfield3');



   game.add.sprite(0, 0, this.starfield1);
   game.add.sprite(0, 0, this.starfield2);
   game.add.sprite(0, 0, this.starfield3);
  

  
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

		this.stars.push( { x: game.world.randomX, y: game.world.randomY, speed: s, texture: t });
	}

	},
updateStars:function(){
		
  for (var i = 0; i < 300; i++)
	{
		

		//	Update the stars y position based on its speed
		this.stars[i].x -= this.stars[i].speed;

		if (this.stars[i].x < 1)
		{
			//	Off the left of the screen? Then wrap around to the right
			this.stars[i].y = game.world.randomY;
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
	}
	
}

//Detect language
var lng = window.navigator.userLanguage || window.navigator.language;
if (lng.indexOf('-') !== -1)  lng = lng.split('-')[0];
if (lng.indexOf('_') !== -1)  lng = lng.split('_')[0];
game.globals.lng = lng;
if (!localStorage.getItem("lng")) localStorage.setItem("lng", game.globals.lng)
else game.globals.lng = localStorage.getItem("lng");

game.state.start('Boot',false,false,game);

}

var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
if ( app ) {
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
    onDeviceReady();
}
