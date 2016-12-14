/**
 * Created by Rebry on 27.11.2016.
 */
var tower = {

defend: function () {
    var room = Game.spawns['Yokumi'].room;
    var towers = room.find(
        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    var hostiles = Game.spawns['Yokumi'].room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        towers.forEach(tower => tower.attack(hostiles[0])
    )
    }else{
        for(var tower_index in towers) {
                var tower = towers[tower_index];
            if(tower.energy  == 0){
                Memory.isTowesFull = false;
            }
            if(tower.energy  == tower.energyCapacity){
                Memory.isTowesFull = true;
            }
            if (tower.energy > tower.energyCapacity/2){
                var closestDamagedStructure = room.find(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
            });
                //console.log("repairing: " + closestDamagedStructure[0]);
            if (closestDamagedStructure[0]) {
                tower.repair(closestDamagedStructure[0]);
            }}

        }
    }
}
}


module.exports = tower;