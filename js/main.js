$( document ).ready(function() {

function startGame(StateName,width, height){
game.state.add(StateName, eval(StateName));
game.state.start(StateName,true,false,game,width,height);
}
var height = $(window).height();
var width = $(window).width();

game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaserCanvas');

startGame("introState",width, height);



});


