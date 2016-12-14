var utilitySources = {

    init: function (Game) {
        for (currentroom in Game.rooms)
            for (location in Game.rooms[currentroom].find(FIND_SOURCES)) {
                console.log(Game.rooms[currentroom].find(FIND_SOURCES)[location]);
            }
    }
};
module.exports = utilitySources;