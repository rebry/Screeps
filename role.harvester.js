

var roleHarvester = {
    run: function(creep) {


        if (creep.carry.energy == 0) {
            creep.memory.isEmpty = true
        }else if(creep.carry.energy == creep.carryCapacity) {
            creep.memory.isEmpty = false
        }


        if (creep.memory.isEmpty == true) {
            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

            if(target != undefined && target.amount > 50) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }

            //Evnt hvis miners == antall energy spawns, convert to hauler()
        } else {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                || s.structureType == STRUCTURE_EXTENSION)
                && s.energy < s.energyCapacity});

            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }else if(creep.carry.energy == creep.carryCapacity){
                creep.say("IDLE-Full")
            }else{

            }

        }
    }
};

module.exports = roleHarvester;