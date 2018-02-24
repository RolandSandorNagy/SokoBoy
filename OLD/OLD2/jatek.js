var man = fw.image('man1.png');
var box = fw.image('box222.png');
var box2 = fw.image('box11.png');
var wall = fw.image('wall111.png');
var wall2 = fw.image('wall2.png');
var m = fw.image('MENU/menu1.png');
var m2 = fw.image('MENU/menu2.png');
var m3 = fw.image('MENU/menu3.png');
var m4 = fw.image('MENU/menu4.png');
var bg = fw.image('bg.jpg');
var checkpoint = fw.image('checkpoint.png');
var lepes = 1;
var interval;

//fw.load([man, box], startGame);

var KEYS = {
    UP: 38,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var Man = fw.entity({
    init: function () {
        this.i = 0;
        this.j = 1;
        this.dir = 1;
        this.moving = false;
        this.depth = 1;
    },

    draw: function (ctx) {
        ctx.drawImage(man, this.getSpritesheetX(), this.getSpritesheetY(), 32, 48, this.x, this.y, 32, 48);
    },

    frame: function () {
        this.depth = this.y + 48;

        this.moving = false;
        if (pressedKeys[KEYS.LEFT]) {
            this.j = 1;
            this.move(-lepes, 0, 'l');
        }
        if (pressedKeys[KEYS.RIGHT]) {
            this.j = 2;
            this.move(lepes, 0, 'r');
        }

        if (pressedKeys[KEYS.UP]) {
            this.j = 3;
            this.move(0, -lepes, 'u');
        }
        if (pressedKeys[KEYS.DOWN]) {
            this.j = 0;
            this.move(0, lepes, 'd');
        }

        if (!this.moving) {
            this.i = 0;
        }
    },

    move: function (x, y, actDirChar) {
        if (vanEntitas(this.getLeft() + x + 10, this.getTop() + y, this.getWidth() - 20, this.getHeight(), Box, actDirChar, this)) {
            return;
        }
        if (vanFal(this.getLeft() + x + 8, this.getTop() + y, this.getWidth() - 16, this.getHeight(), Wall, actDirChar, this)) {
            return;
        }
        if (vanFal(this.getLeft() + x + 8, this.getTop() + y, this.getWidth() - 16, this.getHeight(), Wall2, actDirChar, this)) {
            return;
        }

        this.x += x;
        this.y += y;


        this.i += 0.1;
        if (this.i >= 4) {
            this.i = 0;
        }
        this.moving = true;
    },

    getSpritesheetX: function () {
        return (Math.floor(this.i) % 4) * 32;
    },

    getSpritesheetY: function () {
        return Math.floor(this.j) * 48;
    },

    getLeft: function () {
        return this.x;
    },

    getTop: function () {
        return this.y + 40;
    },

    getWidth: function () {
        return 32;
    },

    getHeight: function () {
        return 48 - 40;
    }
});

var Box = fw.entity({
    init: function () {
        this.width = 40; //Math.floor(box.width / 6);
        this.height = 60; //Math.floor(box.height / 6);
        this.image = box;
    },
    frame: function () {
        this.depth = this.y + this.height;
    },
    draw: function (ctx) {
        ctx.drawImage(this.image, 0, 0, 256, 256, this.x, this.y, this.getWidth(), this.getHeight() + 28);
        //ctx.drawImage(box, this.x, this.y);
    },

    getImage: function () {
        return this.image;
    },

    getLeft: function () {
        return this.x/* + 20*/;
    },

    getTop: function () {
        return this.y + 28;
    },

    getWidth: function () {
        return this.width/* - 30*/;
    },

    getHeight: function () {
        return this.height - 28;
    },

    move: function (actDirChar) {
        var xd;
        var yd;
        switch(actDirChar) {
            case 'l': xd = -lepes; yd =  0; break;
            case 'r': xd =  lepes; yd =  0; break;
            case 'u': xd =  0; yd = -lepes; break;
            case 'd': xd =  0; yd =  lepes; break;
        }
        if (vanCheckpoint(this.getLeft() + xd + 5, this.getTop() + yd + 5, this.getWidth() - 10, this.getHeight() - 10, Checkpoint, actDirChar, this)) {
            this.image = box2;
        } else {
            this.image = box;            
        }
        if (vanDoboz(this.getLeft() + xd, this.getTop() + yd, this.getWidth(), this.getHeight(), Box, actDirChar, this)) {
            return true;
        }
        if (vanFal(this.getLeft() + xd, this.getTop() + yd, this.getWidth(), this.getHeight(), Wall, actDirChar, this)) {
            return true;
        }
        if (vanFal(this.getLeft() + xd, this.getTop() + yd, this.getWidth(), this.getHeight(), Wall2, actDirChar, this)) {
            return true;
        }
        this.x += xd;
        this.y += yd;
        return false;
    }
});

var Wall = fw.entity({
    init: function () {
        this.image = wall;
        this.width = 40; //Math.floor(box.width / 6);
        this.height = 40; //Math.floor(box.height / 6);
        this.depth = this.y + this.height;
    },
    draw: function (ctx) {
        ctx.drawImage(wall, 0, 0, 256, 256, this.x, this.y, this.getWidth(), this.getHeight() /*+ 28*/);
    },
    getLeft: function () {
        return this.x/* + 20*/;
    },

    getTop: function () {
        return this.y + 10/* + 28*/;
    },

    getWidth: function () {
        return this.width/* - 30*/;
    },

    getHeight: function () {
        return this.height/* - 28*/;
    }
});

var Wall2 = fw.entity({
    init: function () {
        this.image = wall;
        this.width = 40; //Math.floor(box.width / 6);
        this.height = 40; //Math.floor(box.height / 6);
        this.depth = this.y + this.height;
    },
    draw: function (ctx) {
        ctx.drawImage(wall, 0, 0, 256, 256, this.x, this.y, this.getWidth(), this.getHeight());
    },
    getLeft: function () {
        return this.x/* + 20*/;
    },

    getTop: function () {
        return this.y + 10;
    },

    getWidth: function () {
        return this.width/* - 30*/;
    },

    getHeight: function () {
        return this.height;
    }
});

var Checkpoint = fw.entity({
    init: function () {
        this.image = checkpoint;
        this.width = 40; //Math.floor(box.width / 6);
        this.height = 40; //Math.floor(box.height / 6);
        this.depth = 0;
    },
    draw: function (ctx) {
        ctx.drawImage(checkpoint, 0, 0, 40, 40, this.x, this.y, this.getWidth(), this.getHeight());
    },
    getLeft: function () {
        return this.x/* + 20*/;
    },

    getTop: function () {
        return this.y;
    },

    getWidth: function () {
        return this.width/* - 30*/;
    },

    getHeight: function () {
        return this.height;
    }
});

var entitasok = [   //new Box(420,280), new Box(480,280), 
                    
                    new Man(600,300), 
                    
                    new Wall2(40,200), new Wall2(40,240), new Wall2(40,280), 
                    new Wall2(40,320), new Wall2(40,360), //new Wall(240,90), 

                    new Wall2(80,200), new Wall2(80,360), 
                    new Wall2(120,200), new Wall2(120,360),
                    new Wall2(160,200), new Wall2(160,360), 
                    new Wall2(200,200), new Wall2(200,360),
                    new Wall2(240,200), new Wall2(240,360), 
                    new Wall2(280,200), new Wall2(280,360),

                    new Wall2(320,200), new Wall2(320,240), 
                    new Wall2(320,320), new Wall2(320,360),

                    new Wall2(360,40), new Wall2(360,80), 
                    new Wall2(360,120), new Wall2(360,160),
                    new Wall2(360,200), new Wall2(360,240), 
                    new Wall2(360,320), new Wall2(360,360),
                    new Wall2(360,400), new Wall2(360,440), 

                    new Wall2(400,40), new Wall2(400,440), 
                    new Wall2(440,40), new Wall2(440,120),
                    new Wall2(440,200), new Wall2(440,440), 
                    new Wall2(440,480), new Wall2(440,520),
                    new Wall2(480,40), new Wall2(480,200),
                    new Wall2(480,520), //new Wall2(360,440), 

                    new Wall2(520,40), new Wall2(520,80),
                    new Wall2(520,120), new Wall2(520,200), 
                    new Wall2(520,440), new Wall2(520,520),

                    new Wall2(560,80), new Wall2(560,120), 
                    new Wall2(560,440), new Wall2(560,520),

                    new Wall2(600,80), new Wall2(600,240),
                    new Wall2(600,280), new Wall2(600,360), 
                    new Wall2(600,520),// new Wall2(520,520)

                    new Wall2(640,80), new Wall2(640,240),
                    new Wall2(640,280), new Wall2(640,320),
                    new Wall2(640,360), new Wall2(640,400), 
                    new Wall2(640,440), new Wall2(640,480), 
                    new Wall2(640,520),// new Wall2(520,520)

                    new Wall2(680,80), new Wall2(680,120), 
                    new Wall2(680,160), new Wall2(680,200), 
                    new Wall2(680,240),// new Wall2(520,520)

                    new Box(480,120), new Box(600,160),
                    new Box(400,280), new Box(400,320),

                    new Box(440,240), new Box(440,400),
                    new Box(480,280), new Box(480,360),

                    new Box(520,280), new Box(520,320),
                    new Box(520,400), new Box(560,240),

                    new Checkpoint(80,240), new Checkpoint(80,280),
                    new Checkpoint(80,320), new Checkpoint(120,240),
                    new Checkpoint(120,280), new Checkpoint(120,320),
                    new Checkpoint(160,240), new Checkpoint(160,280),
                    new Checkpoint(160,320), new Checkpoint(200,240),
                    new Checkpoint(200,280), new Checkpoint(200,320),

                    ];


var pressedKeys = {};

document.body.addEventListener('keydown', function (event) {
    var key = event.which;
    pressedKeys[key] = true;
});

document.body.addEventListener('keyup', function (event) {
    var key = event.which;
    delete pressedKeys[key];
});

function startGame() {
    setCanvasBgImg("bg2.jpg");
    loadMap();
    //loadMap();
    interval = setInterval(frame, 8);
}

function frame() {
    index = fw.createIndex(entitasok, 64);
    ctx.clearRect(0, 0, 800, 600);   
    ctx.drawImage(bg, 0, 0);

    var i;
    for (i = 0; i < entitasok.length; i++) {
        if (entitasok[i].frame) {
            entitasok[i].frame();
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    var sortedByDepth = entitasok.slice();
    sortedByDepth.sort(function (entity1, entity2) {
        return entity1.depth - entity2.depth;
    });
    for (i = 0; i < sortedByDepth.length; i++) {
        if (sortedByDepth[i].draw /*&& !(sortedByDepth[i] instanceof Wall)*/ ) {
            sortedByDepth[i].draw(ctx);
        }
    }
    if(sikerult()) {
        endGame();
    }
}

function sikerult() {
    for (var i = 0; i < entitasok.length; i++) {
        if(entitasok[i] instanceof Box) {
            if(entitasok[i].getImage() === box) {
                return false;
            }
        }
    }
    console.log("itt vagyok");
    return true;
}

function endGame() {    
    setCanvasBgImg("MANU/menu1.png");
    interval = clearInterval(frame, 8);
}

function vanEntitas(left, top, width, height, tipus, actDirChar, ent) {
    var utkozesesEntitasok = index.query(left, top, width, height);
    var l = false
    for (var i = 0; i < utkozesesEntitasok.length; i++) {
        if (    utkozesesEntitasok[i] instanceof tipus
            &&  utkozesesEntitasok[i] !== ent) {
                if(!l) l = utkozesesEntitasok[i].move( actDirChar );            
        }
    }
    return l;
}

function vanDoboz(left, top, width, height, tipus, actDirChar, ent) {
    var utkozesesEntitasok = index.query(left, top, width, height);
    for (var i = 0; i < utkozesesEntitasok.length; i++) {
        if (    utkozesesEntitasok[i] instanceof tipus
            &&  utkozesesEntitasok[i] !== ent) {
                return true;            
        }
    }
    return false;
}

function vanFal(left, top, width, height, tipus, actDirChar, ent) {
    var utkozesesEntitasok = index.query(left, top, width, height);
    for (var i = 0; i < utkozesesEntitasok.length; i++) {
        if (    utkozesesEntitasok[i] instanceof tipus
            &&  utkozesesEntitasok[i] !== ent) {
                return true;            
        }
    }
    return false;
}

function vanCheckpoint(left, top, width, height, tipus, actDirChar, ent) {
    var utkozesesEntitasok = index.query(left, top, width, height);
    for (var i = 0; i < utkozesesEntitasok.length; i++) {
        if (    utkozesesEntitasok[i] instanceof tipus
            &&  utkozesesEntitasok[i] !== ent) {
                return true;            
        }
    }
    return false;
}

function loadMap() {
    for (var i = 0; i < entitasok.length; i++) {
        if(entitasok[i] instanceof Wall) {
            ctx.drawImage(wall, 0, 0, 256, 256, entitasok[i].getLeft(), entitasok[i].getTop(), entitasok[i].getWidth(), entitasok[i].getHeight() + 28);
        }
    };
}

function menu() {
    ctx.drawImage(m, 0, 0);
    setMouseMoveListenerOnCanvas();
    setOnClickListenerOnCanvas();
}

function setMouseMoveListenerOnCanvas() {
    document.getElementById('canvas').addEventListener('mousemove', canvasMouseMoveListener,false);
}

function setOnClickListenerOnCanvas() {
    document.getElementById('canvas').addEventListener('click', canvasClickListener,false);
}

var canvasMouseMoveListener = function (e) {
        //console.log(e);
        var eX = e.layerX;
        var eY = e.layerY;
        if(230 < eX && eX < 585 && 290 < eY && eY < 330) {
            ctx.drawImage(m2, 0, 0);
        } else if(315 < eX && eX < 465 && 355 < eY && eY < 410) {
            ctx.drawImage(m3, 0, 0);
        } else if(315 < eX && eX < 470 && 435 < eY && eY < 480) {
            ctx.drawImage(m4, 0, 0);
        } else {
            ctx.drawImage(m, 0, 0);
        }
    };

var canvasClickListener = function (e) {
        //console.log(e);
        var eX = e.layerX;
        var eY = e.layerY;
        if(230 < eX && eX < 585 && 290 < eY && eY < 330) {
            document.getElementById('canvas').removeEventListener('click', canvasClickListener, false);
            document.getElementById('canvas').removeEventListener('mousemove', canvasMouseMoveListener, false);
            setTimeout(function () {
                fw.load([man, box, wall], function () {
                    startGame()
                });                
            }, 1000);
        } else if(315 < eX && eX < 465 && 355 < eY && eY < 410) {

        } else if(315 < eX && eX < 470 && 435 < eY && eY < 480) {

        } else {

        }
    };

function setCanvasBgImg(fName) {
    canvas.style.background = 'url("' + fName + '")';
    canvas.style.backgroundSize = 'cover';
}

menu();

//canvas.style.background = 'url("bg2.jpg")';
//canvas.style.backgroundSize = 'cover';

//fw.load([man, box, wall], startGame);
