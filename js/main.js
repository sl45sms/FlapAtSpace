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

FBloginStatus:function(n){



/*
FB.getLoginStatus(function(response) {
	//TODO hide button on connected
  if (response.status === 'connected') {
    // the user is logged in and has authenticated your
    // app, and response.authResponse supplies
    // the user's ID, a valid access token, a signed
    // request, and the time the access token 
    // and signed request each expire
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    // but has not authenticated your app
  } else {
    // the user isn't logged in to Facebook.
  }
 });
*/



},
FBlogin:function(n){//n is button itself
facebookConnectPlugin.login(["publish_actions"], 
                  this.game.globals.sucessFBlogin, //sucess
                  function(e){console.log(e);});  //error
               
},
FBgetuser:function(response){

facebookConnectPlugin.api("/me",["name","email"], 
      function(t) {
        facebook = {
            appId: "--FBID--",
            id: response.authResponse.userID,
            accessToken: response.authResponse.accessToken,
            name: t.name,
            email: t.email
        };
        this.game.globals.email=facebook.email;
        this.game.globals.fbid=facebook.id;
        this.game.globals.fbname=facebook.name;
        this.game.globals.fbConnected = true;
        this.game.globals.showLoginButton=false;
        console.log(facebook);

    },
    function(e){console.log(e);}); //error
},
sucessFBlogin:function (response) {
console.log("on sucessFBlogin", response);
   if(response.status === "connected"){   
	    window.localStorage.setItem("fbtoken",response.authResponse.accessToken); //save token for later use
        this.game.globals.FBgetuser(response);
    } else this.game.globals.fbConnected = false;

},
postFBscore:function(n){ //TODO post score if user is connected

facebookConnectPlugin.getLoginStatus( function(response) {
                var url = '/me/scores?method=post&message=' + encodeURIComponent({score:1000}) + '&access_token=' + window.localStorage.getItem("fbtoken");
                facebookConnectPlugin.api(
                    url,
                    ['publish_actions'],
                function (response) { console.log(response); },
                function (error) { console.error(error); }
                );
            },
            function(e){console.log(e);});

},
getFBscore:function(n){ //TODO get highscore if user is connected

/*
	         FB.api("/--FBID--/scores", "get", function(r) {
             console.log(r);
            })
*/	



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


//FB
window.fbAsyncInit = function() {
        if (window.cordova.platformId === "browser") {
               facebookConnectPlugin.browserInit('--FBID--', 'v2.5');
               facebookConnectPlugin.getLoginStatus(
                     this.game.globals.sucessFBlogin,
                                 function(e){console.log(e);}); //Error
        }
    }



/*
//if(navigator.onLine) {


  window.fbAsyncInit = function() {
  //this must before call FB.init
  FB.Event.subscribe('auth.statusChange', function(response) {
    if(response.status == 'connected') {
        game.globals.FBgetuser(response);
    }
   });
  
  FB.init({
      appId                : '--FBID--',
      oauth                : true,
      status               : true,
      frictionlessRequests : true,
      xfbml                : false,
      version              : 'v2.5'
    });
    
    
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     var isoLng="en_EN"; //TODO beter?
     if(game.globals.lng==="el")isoLng="el_GR";
      
     js.src = '//connect.facebook.net/'+isoLng+'/sdk.js'; //TODO check language from above
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   
   
   
//}
*/




game.state.start('Boot',false,false,game);
}

//Detect if on browser or mobile app
var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
if ( app ) {
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
    onDeviceReady();
}
