(function () { //önmagát meghívó függvény: mivel nincs blokkszintû láthatóság, így tudunk egy scope-ot létrehozni, hogy ne a globális névtérbe szemeteljünk
    var fw = {};

    fw.image = function (src) {
        var img = document.createElement('img');
        img.src = src;
        return img;
    };

    fw.load = function (images, onLoad, onProgress) {
        var loaded = 0;
        //console.log("Load Start:   loaded:  " + loaded);
        function checkLoaded() {
            //console.log("checkLoaded:   loaded:  " + loaded);
            //console.log("Max images:    " + images.length);
            if (onProgress) {
                onProgress(loaded / images.length * 100);
            }
            if (loaded === images.length) { //ha minden kép be volt töltve, akkor rögtön meghívjuk
                onLoad();
            }
        }

        for (var i = 0; i < images.length; i++) {
            if (images[i].width > 0) { //a kép be van töltve
                loaded++;
            } else { //eseménykezelõt rakunk a képre, ha nincs betöltve
                images[i].addEventListener('load', function () {
                    loaded++;
                    checkLoaded();
                });
            }
        }
        checkLoaded();
    };

    var pressedKeys = {}; //asszociatív tömbben tároljuk, hogy egy gomb le van-e nyomva, egyszerûbb, mint 4 külön változóban.
    document.onkeydown = function (e) {
        pressedKeys[e.which] = true;
    };

    document.onkeyup = function (e) {
        pressedKeys[e.which] = false;
    };

    fw.isDown = function (key) {
        return pressedKeys[key];
    };

    fw.entity = function (methods) { // "osztály" készítése
        function Entity(x, y) {
            this.x = x;
            this.y = y;
            if (this.init) {
                this.init();
            }
        }

        Entity.prototype = methods;

        return Entity;
    };

    function createMask(img) { //közvetlenül az img objektumból nem kérhetõ le a pixel, ezért egy láthatatlan canvasra rajzoljuk, és azt használjuk erre.
        var canvas = document.createElement('canvas'); //off-screen canvas!
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0); //canvasra rajzoljuk a képet

        var data = ctx.getImageData(0, 0, img.width, img.height).data; //nem mûködik file:// protokollal!

        //a data egy sima tömb, sorban jönnek a pixelek adatai
        //egy pixel adata 4 elemet foglal el: R,G,B,A

        img.isTransparent = function (x, y) {
            return data[(y * img.width + x) * 4 + 3] === 0; //a pixelhez tartozó áttetszõségi érték == 0?
        };
    }

    fw.rectIntersect = function (x1, y1, w1, h1, x2, y2, w2, h2) { //egyszerû metszés vizsgálat
        return x2 < x1 + w1 && x2 + w2 > x1 && y2 < y1 + h1 && y2 + h2 > y1;
    };

    function ensureHasMask(img) {
        if (!img.isTransparent) { //nincs isTransparent metódusa - még nem tartozik hozzá maszk!
            createMask(img);
        }
    }

    fw.maskIntersect = function (mask1, x1, y1, mask2, x2, y2) { //két maszk közti metszés vizsgálat
        if (fw.rectIntersect(x1, y1, mask1.width, mask1.height, x2, y2, mask2.width, mask2.height)) {
            ensureHasMask(mask1);
            ensureHasMask(mask2);

            var left = Math.max(x1, x2);
            var top = Math.max(y1, y2);
            var right = Math.min(x1 + mask1.width, x2 + mask2.width);
            var bottom = Math.min(y1 + mask1.height, y2 + mask2.height);
            for (var i = left; i < right; i++) {
                for (var j = top; j < bottom; j++) {
                    if (!mask1.isTransparent(i - x1, j - y1) && !mask2.isTransparent(i - x2, j - y2)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    function key(x, y) {
        return x + ',' + y;
    }

    fw.createIndex = function (entities, size) { //bin index készítés
        if (!size) {
            size = 50/*64*/;
        }
        var grid = {};
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (!entity.getLeft) { //ha nincs mérete, nem rakjuk bele az indexbe.
                continue;
            }
            //entitás szélének meghatározása (cella szélek)
            var left = entity.getLeft();
            var top = entity.getTop();
            var cellLeft = Math.floor(left / size);
            var cellTop = Math.floor(top / size);
            var cellRight = Math.floor((left + entity.getWidth()) / size);
            var cellBottom = Math.floor((top + entity.getHeight()) / size);

            //végig megyünk az összes cellán, amit érint az entitás
            for (var x = cellLeft; x <= cellRight; x++) {
                for (var y = cellTop; y <= cellBottom; y++) {
                    var cellKey = key(x, y);
                    var cellData = grid[cellKey]; //az adott koordinátához tartozó cella infó lekérése
                    if (!cellData) { //a cella üres volt
                        grid[cellKey] = [entity]; //a cella mostantól egy elemet tartalmaz: az entitást
                    } else {
                        cellData.push(entity); //a cellához hozzáadunk még egy elemet
                    }
                }
            }

        }

        return {
            query: function (left, top, width, height) {
                var cellLeft = Math.floor(left / size);
                var cellTop = Math.floor(top / size);
                var cellRight = Math.floor((left + width) / size);
                var cellBottom = Math.floor((top + height) / size);

                var result = [];
                for (var x = cellLeft; x <= cellRight; x++) {
                    for (var y = cellTop; y <= cellBottom; y++) {
                        var cellKey = key(x, y);
                        var cellData = grid[cellKey]; //az adott koordinátához tartozó cella infó lekérése
                        if (!cellData) { //a cellában nincs elem
                            continue;
                        }
                        for (var j = 0; j < cellData.length; j++) { //a cella minden elemét belerakjuk, ha még nem volt benne
                            var entity = cellData[j];
                            if (result.indexOf(entity) !== -1) { //már benne van az eredmény tömbben
                                continue;
                            }
                            if (!fw.rectIntersect(  left, top, width, height, 
                                                    entity.getLeft(), entity.getTop(), 
                                                    entity.getWidth(), entity.getHeight())) {
                                continue; //ha ugyan a cella stimmel, de mégsem metszik egymást
                            }
                            result.push(entity);
                        }
                    }
                }
                return result;
            }
        };
    };

    window.fw = fw; //egyetlen elemet rakunk a globális névtérbe
})();