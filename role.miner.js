/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 *
 */

var roleMiner = {
    run: function (creep) {

        /*
        SWITCH CASE
            STATE: FIND_AVIABLE_SOURCE
            STATE: AT_SOURCE
            STATE: MOVING_TO_CONTAINER
            STATE: MOVING_TO_CONSTRUCTIONSIDE
            STATE: BUILDING_SITE
            STATE: HARVESTING
         */

        if (creep.memory.harvestTime) {
            creep.harvest(Game.getObjectById(creep.memory.NodeToWork))
        }else{
            if (creep.memory.NodeToWork == undefined) {
                console.log(creep.name + " is wokring " + creep.memory.NodeToWork);
                var possibleSources = creep.room.find(FIND_SOURCES);
                console.log("creep have looked up sources : " + possibleSources);
                for (var sourceID in possibleSources) {
                    if(creep.memory.NodeToWork != undefined){
                        break;
                    }
                    console.log("lets check if souce: " + possibleSources[sourceID].id + " is free")
                    var isAviable = true;
                    for (var possibleWorker in Game.creeps) {
                        if(Game.creeps[possibleWorker].memory.role == 'miner'){
                            if (possibleSources[sourceID].id == Game.creeps[possibleWorker].memory.NodeToWork) {
                                console.log("it seems like miner:" + Game.creeps[possibleWorker].name + "is working this node");
                                isAviable = false;
                            }
                        }
                    }
                    if (isAviable) {
                        creep.memory.NodeToWork = possibleSources[sourceID].id;
                    }
                }
            }
            if (!creep.pos.isNearTo(Game.getObjectById(creep.memory.NodeToWork))) {
                creep.say("onMyWay");
                creep.moveTo(Game.getObjectById(creep.memory.NodeToWork));
            }else if (creep.pos.isNearTo(Game.getObjectById(creep.memory.NodeToWork))) {
                //Hvis han ER i nærheten av Noden::
                var nearestContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
                var nearestConstructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                var foundAContainer = false;
                var foundConstructionSite = false;

                if (creep.pos.getRangeTo(nearestContainer) < 1) {
                    foundAContainer = true;
                    creep.moveTo(nearestContainer);
                }else{
                    if (creep.pos.getRangeTo(nearestConstructionSite) < 1) {
                        creep.move(nearestConstructionSite);
                        foundConstructionSite = true;
                    }
                }
                if (!(foundAContainer || foundConstructionSite)) {
                    creep.room.createConstructionSite(creep.pos, STRUCTURE_CONTAINER);
                }
                if (creep.pos.getRangeTo(nearestConstructionSite) ==  0) {
                    if (creep.carry.energy < creep.carryCapacity) {
                        creep.say("CS - Harvest");
                        creep.harvest(Game.getObjectById(creep.memory.NodeToWork));
                        //console.log(creep.harvest(Game.getObjectById(creep.memory.NodeToWork)));
                    } else {
                        creep.build(creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES));
                        creep.say("CS - build");
                    }
                }
                if(creep.pos.getRangeTo(creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}})) == 0){
                    console.log("i am where im supposed to be!")
                    creep.say("HORRAY!")
                    creep.memory.harvestTime = true;
                }
            }
        }
    }
};


module.exports = roleMiner;