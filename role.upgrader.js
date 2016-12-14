var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
    
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }else{
            var nearestContainer = creep.room.find(FIND_STRUCTURES, {
                    filter: (container) => container.structureType == STRUCTURE_CONTAINER && container.store[RESOURCE_ENERGY] > creep.carryCapacity});
            if(nearestContainer.length != 0){
                if (creep.withdraw(nearestContainer[0], "energy", creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearestContainer[0]);
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

module.exports = roleUpgrader;