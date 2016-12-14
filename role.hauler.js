/**
 * Created by Rebry on 26.11.2016.
 */
var roleBuilder = require('role.builder');
var roleHauler = {


    /** @param {Creep} creep **/
    run: function (creep) {
        //console.log("Hauler Energy: " + creep.carry.energy + " isFull: " + creep.memory.isFull );

        if(creep.memory.isFull){
            if(creep.carry.energy == 0){
                creep.memory.isFull = false;
            }
            //
            //put in spawn or extentions
            //  put in towers
            //      put in container with least energyAmmount
            //          if everything is full, go to upgrader, drop tings on floor.

            var spawnAndExtentions = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity});
            if (spawnAndExtentions != undefined) {
                if (creep.transfer(spawnAndExtentions, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawnAndExtentions);
                }
            }else{
                var towers = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_TOWER  && s.energy < s.energyCapacity)});
                if (creep.transfer(towers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers);
                }else if(towers == null){
                    // No Towers need Refill


                }

            }
        }else {

            //console.log("looking for source")
                var DroppedEnergytarget = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
                var amount = 0;
            if(DroppedEnergytarget != null){
                //console.log("i did find some energy lying around")
                amount = DroppedEnergytarget.amount;
            }
            if(DroppedEnergytarget != undefined && amount > 100) {
                //console.log("but is it worth picking up " + amount)
                if(amount > 100){
                    //console.log("Found: "+amount+" - gonna pick up something form the floor")
                    if(creep.pickup(DroppedEnergytarget) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(DroppedEnergytarget);
                    }
                }
            }else{
                //console.log("gonna pick up something from the fullest Container")
                //found no dropped Energy, start looking for the fullest container;
                var nonEmptyContainers = creep.room.find(FIND_STRUCTURES, {
                        filter: (container) => container.structureType == STRUCTURE_CONTAINER && container.store[RESOURCE_ENERGY] > 0});
                //console.log("i found " + nonEmptyContainers.length + " to pick from")
                if(nonEmptyContainers.length != 0){
                    var fullestContainer = {
                        id:"",
                        energy: 0
                    };
                    for (var container in nonEmptyContainers) {
                        if(nonEmptyContainers[container].store[RESOURCE_ENERGY] > fullestContainer.energy){
                            fullestContainer.id = nonEmptyContainers[container].id;
                            fullestContainer.energy = nonEmptyContainers[container].store[RESOURCE_ENERGY];
                        }
                    }
                    //console.log(fullestContainer.id + " " + fullestContainer.energy )
                    //console.log(creep.withdraw(Game.getObjectById(fullestContainer.id), "energy", creep.carryCapacity));
                    if (creep.withdraw(Game.getObjectById(fullestContainer.id), "energy", creep.carryCapacity - creep.carry.energy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(fullestContainer.id));
                    }

                }else{
                    //found only empty containers and nothing on the floor.
                    creep.say("trying to roleuilder")
                    roleBuilder.run(creep)
                    //life sucks.
                }
            }
            if(creep.carry.energy == creep.carryCapacity){
                console.log("im Full!")
                creep.memory.isFull = true;
            }
        }
    }
};

module.exports = roleHauler;