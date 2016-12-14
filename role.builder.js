var roleUpgrader = require('role.upgrader');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //console.log(creep.name + ": is trying to build")
        //console.log(creep.memory.building +" "+ creep.carry.energy)
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }
        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else{
                roleUpgrader.run(creep);
            }
        }
        else {
            var nearestContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
            if(nearestContainer != null){
                if(creep.withdraw(nearestContainer, "energy", creep.carryCapacity) == "-6"){
                    creep.moveTo(creep.room.controller)
                }
                if (creep.withdraw(nearestContainer, "energy", creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearestContainer);
                }
            }else{
                creep.say('mining instead')
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }

        }
    },

};

module.exports = roleBuilder;