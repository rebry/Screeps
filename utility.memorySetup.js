var utilityMemorySetUp = {
    setup: function (Memory) {
        console.log("Setting Memory");
        Memory.worker = {
            upgraders: 2,
            haulers: 4,
            repairers: 2,
            harvesters: 2,
            builders: 2,
            miners: 2
        };
        var cords = [ ];
        for(var i = 0; i < 50; ++i) {
            cords[i] = [ ];
            for(var j = 0; j < 50; ++j) {
                cords[i][j] = 0;
            }
        }
        Memory.isTowesFull = false;
        Memory.MapUsage = cords;
        Memory.ticks = 0;
        Memory.harvesterEvolution = {
            AmountMined: 0,
            cost: 0,
            DNA: [],
            worked: 0,
            idle: 0
        };
        Memory.evlolutionTree = [];
        Memory.notified = false;
        Memory.controllerLevel = 0;

    }
};
module.exports = utilityMemorySetUp;