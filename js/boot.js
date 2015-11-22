var Boot={

	    init: function (thisgame) {
         this.game=thisgame;
        
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
           // this.scale.startFullScreen(true);
        }
        else
        {
			this.scale.windowConstraints.bottom = "visual"; 
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
           // this.scale.startFullScreen(true);
            
            
        }

    },
	 preload: function() {
       this.game.load.image('preloaderBackground', 'assets/preloader/background.png');
       this.game.load.image('preloaderBar', 'assets/preloader/bar.png');
	},
	
	create: function () {

    this.state.start('preLoad',false,false,this.game);

    },

	update:function(){
		


	},


    enterIncorrectOrientation: function () {

        this.game.globals.orientated = false;

        document.getElementById('orientationMsg').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        this.game.globals.orientated = true;

        document.getElementById('orientationMsg').style.display = 'none';

    }
    
 }