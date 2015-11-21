(function () {




game = new Phaser.Game(1024, 768, Phaser.CANVAS, 'phaserCanvas');



game.state.add('Boot', Boot);
game.state.add('preLoad', preLoad);
game.state.add('introState', introState);
game.state.add('flapState', flapState);
game.state.add('gameOver', gameOver);

game.globals={
    //score: 0,
    orientated: false
	}

game.state.start('Boot',true,false,game);

})();


