var man = fw.image('man1.png');

fw.load([man], function () {
    startGame();
});

var KEYS = {
    UP: 38,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
