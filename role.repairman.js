var roleBuilder = require('role.builder');
var roleRepairman = {

    /** @param {Creep} creep **/
    run: function (creep) {

        function canRepair() {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.needsRefill = false;
                creep.say("im full")
                return true;
            } else if (creep.carry.energy == 0) {
                creep.memory.needsRefill = true;
                creep.say("im Out")
                //console.log(creep.name + " is empty and will need refilling");
                return false;
            } else if (creep.memory.needsRefill) {
                //console.log(creep.name + " is refilling " + creep.carry.energy + "/" + creep.carryCapacity );
                return false;
            } else {
                return true;
            }
        }
        if (canRepair()) {
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax});
            if (closestDamagedStructure) {
                //console.log(creep.name +" " +creep.carry.energy + "/" + creep.carryCapacity + " will start repairing: " + closestDamagedStructure );
                creep.moveTo(closestDamagedStructure);
                creep.repair(closestDamagedStructure);
            }else {
                roleBuilder.run(creep);
            }
        }else{
            var nearestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (container) => container.structureType == STRUCTURE_CONTAINER && container.store[RESOURCE_ENERGY] > 0});
            if(nearestContainer != null){
                if(creep.withdraw(nearestContainer, "energy", creep.carryCapacity) == "-6"){
                    creep.moveTo(creep.room.controller)
                }
                if (creep.withdraw(nearestContainer, "energy", creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearestContainer);
                }
            }else{
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }

        }
    }
};
module.exports = roleRepairman;