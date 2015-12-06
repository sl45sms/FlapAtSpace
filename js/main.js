(function () {

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

game.state.start('Boot',false,false,game);

})();


