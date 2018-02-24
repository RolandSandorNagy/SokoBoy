var man = fw.image('ManSprite.png');
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
var palya = 1;
var k = 0;

//fw.load([man, box], startGame);

var KEYS = {
    UP: 38,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    ESC: 27
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
        ctx.drawImage(man, this.getSpritesheetX(), this.getSpritesheetY(), 21, 44, this.x, this.y, 21, 40);
    },

    frame: function () {
        this.depth = this.y + 40;

        this.moving = false;
        if (pressedKeys[KEYS.LEFT]) {
            this.j = 1 + (k * 4);
            this.move(-lepes, 0, 'l');
        }
        if (pressedKeys[KEYS.RIGHT]) {
            this.j = 2 + (k * 4);
            this.move(lepes, 0, 'r');
        }

        if (pressedKeys[KEYS.UP]) {
            this.j = 3 + (k * 4);
            this.move(0, -lepes, 'u');
        }
        if (pressedKeys[KEYS.DOWN]) {
            this.j = 0 + (k * 4);
            this.move(0, lepes, 'd');
        }

        if (!this.moving) {
            k = 0;
            this.i = 0;
        }
    },

    move: function (x, y, actDirChar) {
        if (vanEntitas( this.getLeft() + x + 6, this.getTop() + y + 30, 15, 0, Box, actDirChar, this)) {
            return;
        }
        if (vanFal(     this.getLeft() + x + 6, this.getTop() + y + 30, 15, 0, Wall, actDirChar, this)) {
            return;
        }
        if (vanFal(     this.getLeft() + x + 6, this.getTop() + y + 30, 15, 0, Wall2, actDirChar, this)) {
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
        return (Math.floor(this.i) % 4) * 21;
    },

    getSpritesheetY: function () {
        return Math.floor(this.j) * 44;
    },

    getLeft: function () {
        return this.x;
    },

    getTop: function () {
        return this.y;
    },

    getWidth: function () {
        return 32;
    },

    getHeight: function () {
        return 48;
    }
});

var Box = fw.entity({
    init: function () {
        this.width = 40; //Math.floor(box.width / 6);
        this.height = 40; //Math.floor(box.height / 6);
        this.image = box;
    },
    frame: function () {
        this.depth = this.y + this.height;
    },
    draw: function (ctx) {
        ctx.drawImage(this.image, 0, 0, 256, 256, this.x, this.y, this.getWidth(), this.getHeight());
        //ctx.drawImage(box, this.x, this.y);
    },

    getImage: function () {
        return this.image;
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
        if (vanDoboz(this.getLeft() + xd + 5, this.getTop() + yd + 5, this.getWidth() - 10, this.getHeight() - 10, Box, actDirChar, this)) {
            return true;
        }
        if (vanFal(this.getLeft() + xd + 5, this.getTop() + yd + 5, this.getWidth() - 10, this.getHeight() - 10, Wall, actDirChar, this)) {
            return true;
        }
        if (vanFal(this.getLeft() + xd + 5, this.getTop() + yd + 5, this.getWidth() - 10, this.getHeight() - 10, Wall2, actDirChar, this)) {
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
        return this.y/* + 28*/;
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
        return this.y;
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

var entitasok = setPalya(palya);
        
var pressedKeys = {};

document.body.addEventListener('keydown', function (event) {
    var key = event.which;
    console.log(key);
    pressedKeys[key] = true;
});

document.body.addEventListener('keyup', function (event) {
    var key = event.which;
    delete pressedKeys[key];
});

function startGame() {
    setCanvasBgImg("bg22.jpg");
    entitasok = setPalya(palya);
    loadMap();
    interval = setInterval(frame, 16);
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
        //endPalya();
    }
    if(pressedKeys[KEYS.ESC]) {
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
    return true;
}

function endPalya() {
    if(palya === 2) {
        endGame();
        return;
    }
    clearInterval(interval);
    setTimeout(function () {
        //deletePalya();    
    },500)
    palya += 1;
}

function deletePalya() {
    for (var i = 0; i < entitasok.length; i++) {
        delete entitasok[i];
    };
}

function endGame() {    
    clearInterval(interval);
    setTimeout(function () {
        deletePalya();    
        menu();
    },500)
}

function vanEntitas(left, top, width, height, tipus, actDirChar, ent) {
    var utkozesesEntitasok = index.query(left, top, width, height);
    var l = false
    for (var i = 0; i < utkozesesEntitasok.length; i++) {
        if (    utkozesesEntitasok[i] instanceof tipus
            &&  utkozesesEntitasok[i] !== ent) {
                k = 1; 
                if(!l) l = utkozesesEntitasok[i].move( actDirChar );            
        } else k = 0;
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
        if(178 < eX && eX < 545 && 300 < eY && eY < 355) {
            ctx.drawImage(m2, 0, 0);
        } else if(178 < eX && eX < 342 && 398 < eY && eY < 456) {
            ctx.drawImage(m3, 0, 0);
        } else if(178 < eX && eX < 342 && 498 < eY && eY < 548) {
            ctx.drawImage(m4, 0, 0);
        } else {
            ctx.drawImage(m, 0, 0);
        }
    };

var canvasClickListener = function (e) {
        //console.log(e);
        var eX = e.layerX;
        var eY = e.layerY;
        if(178 < eX && eX < 545 && 300 < eY && eY < 355) {
            document.getElementById('canvas').removeEventListener('click', canvasClickListener, false);
            document.getElementById('canvas').removeEventListener('mousemove', canvasMouseMoveListener, false);
            setTimeout(function () {
                fw.load([man, box, wall], function () {
                    startGame()
                });                
            }, 1000);
        } 
        //else if(315 < eX && eX < 465 && 355 < eY && eY < 410) {

        //} else if(315 < eX && eX < 470 && 435 < eY && eY < 480) {

        //} else {

        //}
    };

function setCanvasBgImg(fName) {
    canvas.style.background = 'url("' + fName + '")';
    canvas.style.backgroundSize = 'cover';
}

menu();

//canvas.style.background = 'url("bg2.jpg")';
//canvas.style.backgroundSize = 'cover';

//fw.load([man, box, wall], startGame);
