var Man = fw.entity(
{
    init: function () 
            {
                this.i = 0;
                this.j = 0;
                this.dir = 1;
                this.moving = false;
                this.depth = 1;
            },

    draw: function (ctx) 
            {
                ctx.drawImage(man, this.getSpritesheetX(), this.getSpritesheetY(), 32, 48, this.x, this.y, 32, 48);
            },

    frame: function () 
            {
                this.depth = this.y + 100;
                this.moving = false;
                if (pressedKeys[KEYS.LEFT]) 
                {
                    this.j = 1;
                    this.move(-1, 0, 'l');
                }
                if (pressedKeys[KEYS.RIGHT]) 
                {
                    this.j = 2;
                    this.move(1, 0, 'r');
                }

                if (pressedKeys[KEYS.UP]) 
                {
                    this.j = 3;
                    this.move(0, -1, 'u');
                }
                if (pressedKeys[KEYS.DOWN]) 
                {
                    this.j = 0;
                    this.move(0, 1, 'd');
                }

                if (!this.moving) 
                {
                    this.i = 0;
                }
            },

    move: function (x, y, actDirChar) {
        if (vanEntitas(this.getLeft() + x, this.getTop() + y, this.getWidth(), this.getHeight(), Man, actDirChar, this)) {
            return;
        }

        this.x += x;
        this.y += y;


        this.i += 0.25;
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
        return this.y;
    },

    getWidth: function () {
        return 32;
    },

    getHeight: function () {
        return 48;
    }
});
