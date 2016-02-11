/**
* @author       Panagiotis Skarvelis
* @copyright    2016
* @license      {@link https://github.com/sl45sms/FlapAtSpace/blob/master/license.txt|MIT License}
*/

function onDeviceReady() {

// get dimensions of the window considering retina displays
var w = window.innerWidth * window.devicePixelRatio,
    h = window.innerHeight * window.devicePixelRatio;

if (w>1024){ //TODO smaller ie 1024/2?
	        w=1024;
	        h=768;
		    }
var rw=(h > w) ? h : w; //use this on globals
var rh=	(h > w) ? w : h;	      
game = new Phaser.Game(rw,rh, Phaser.CANVAS, '');

game.state.add('Boot', Boot);
game.state.add('preLoad', preLoad);
game.state.add('introState', introState);
game.state.add('flapState', flapState);
game.state.add('gameOver', gameOver);
game.state.add('gameSuccess', gameSuccess);

game.globals={
    //score: 0,
    scaleRatio: (1/window.devicePixelRatio)*window.devicePixelRatio,
    orientated: false,
  	stars:[],
  	star:{},
  	starfield1:{},
  	starfield2:{},
  	starfield3:{},  	
	width:rw,
	height:rh,
	first_loop:null,
	basic_loop:null,
	refrain:null,
	music:null,
	email:null,
	fbid:null,
	fbname:null,
	fbConnected:false,


FBlogin:function(n){//n is button itself

//TODO mono gia to login mporo na xrisimopoiiso to plugin phonegap-facebook-plugin ... 
//kai gia ola ta alla to openFB logo tou oti to plugin den kanei post!
//opote an epistrecei token to sozo sto fbAccessToken tou openfb


if (!window.cordova || (window.cordova && window.cordova.platformId === 'browser')){


openFB.login(
                function(response) {
                    if(response.status === 'connected') {
                        console.log('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);
                        game.globals.FBgetuser();
                    } else {
                        console.log('Facebook login failed: ' + response.error);
                        			        game.globals.fbConnected = false;
                                            game.globals.showLoginButton=true;
                    }
                }, {scope: 'publish_actions'});

} else {	
facebookConnectPlugin.login(["publish_actions"],   
                   function (response) {
                      if(response.status === "connected"){//sucess
		               console.log('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);   
 	                    window.localStorage.setItem("fbAccessToken",response.authResponse.accessToken); //save token for openFB
                       this.game.globals.FBgetuser(response);
                      } else this.game.globals.fbConnected = false;,
                    function(e){console.log(e);});  //error
}
},
FBgetuser:function(){

openFB.api({
            path: '/me',
            success: function(data) {
                    console.log(JSON.stringify(data));
                    game.globals.fbConnected = true;
                    game.globals.showLoginButton = false;
                                
            },
            error: function(e) {
				    console.log(e);	
			        game.globals.fbConnected = false;
                    game.globals.showLoginButton = true;	
		         
			  }
            });

},
postFBscore:function(n){ //TODO post score if user is connected

 openFB.api({
            method: 'POST',
            path: '/me/scores',
            params: {
                score: n 
            },
            success: function(data) {
                console.log(data);
            },
            error: function(e){
				console.log(e);
			    }
            });   
},
getFBscore:function(n){ //TODO get highscore if user is connected

 openFB.api({
            method: 'GET',
            path: '/me/scores',
            params: {
                score: n 
            },
            success: function(data) {
                console.log(data);
            },
            error: function(e){
				console.log(e);
			    }
            });
 
},

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


 
  
//get login status
if(navigator.onLine) {
	game.globals.FBgetuser();	  
    }
  
game.state.start('Boot',false,false,game);
}



console.log(window.cordova);

//Detect if on browser or mobile app
var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;




if ( app ) {
	
    openFB.init({appId: '--FBID--', tokenStore: window.localStorage});
    document.addEventListener("deviceready", onDeviceReady, false);

} else {
    console.log("on browser");
    openFB.init({appId: '--FBID--', tokenStore: window.localStorage});
    onDeviceReady();
}
