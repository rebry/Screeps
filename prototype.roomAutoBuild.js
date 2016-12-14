module.exports = function () {
    Room.prototype.roomAutoBuild =
        function (room, numOfBuildingsAviable) {

            var movementX = 0;
            var movementY = 0.5;
            var moveOptionX = -1;
            var moveOptionY = +1;
            var spawn = room.find(FIND_MY_SPAWNS)[0];
            var nextLocation = {x: spawn.pos.x, y: spawn.pos.y};

            function turn() {
                if (movementX % 1 != 0) {
                    movementX += 0.5;
                } else {
                    movementX += 0.5;
                    if (moveOptionX == -1) {
                        moveOptionX = 1;
                    } else {
                        moveOptionX = -1
                    }
                }
                if (movementY % 1 != 0) {
                    movementY += 0.5;
                } else {
                    movementY += 0.5;
                    if (moveOptionY == -1) {
                        moveOptionY = 1;
                    } else {
                        moveOptionY = -1
                    }
                }
            }

            function buidOnLocation(x, y) {
                //console.log("Building on:  X: " + nextLocation.x + " Y: " + nextLocation.y);
                if(room.createConstructionSite(x,y, STRUCTURE_EXTENSION) != 0 && room.createConstructionSite(x,y, STRUCTURE_EXTENSION) != -14){
                    buldingsBuildt = buldingsBuildt - 2;
                }
                buldingsBuildt++;
            }

            var moveBeforeTurn = 0;
            for (var buldingsBuildt = 0; buldingsBuildt < numOfBuildingsAviable; buldingsBuildt++) {
                for (var i = 0; i < Math.floor(moveBeforeTurn); i++) {
                    nextLocation.x = nextLocation.x + moveOptionX;
                    nextLocation.y = nextLocation.y + moveOptionY;
                    buidOnLocation(nextLocation.x, nextLocation.y);
                }
                moveBeforeTurn+=0.5;
                turn();
            }
        }
};
