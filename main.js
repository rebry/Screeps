var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleUpgrader = require('role.upgrader');
var roleRepairman = require('role.repairman');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var sources = require('utility.sources');
var memorySetup = require('utility.memorySetup');
var buildDNA = require('utility.buildDNA');
var tower = require('tower');
require('prototype.spawn')();
require('prototype.roomAutoBuild')();
if (Memory.initialRun) {
    memorySetup.setup(Memory);
}

const profiler = require('screeps-profiler');
profiler.enable();

module.exports.loop = function () {
    profiler.wrap(function () {
        // Main.js logic should go here.

        if (Game.spawns['Yokumi'].room.controller.level > Memory.controllerLevel) {
            Game.spawns['Yokumi'].room.roomAutoBuild(Game.spawns['Yokumi'].room, 20);
            Memory.controllerLevel++;
        }

        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Creep died. removing from memory:', name);
            }
        }
        var MaxenergyAviable = Game.spawns.Yokumi.room.energyCapacityAvailable;

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairman');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

        if (harvesters.length < Memory.worker.harvesters) {
            var newName = Game.spawns['Yokumi'].createCreep([WORK, CARRY, MOVE], undefined, {
                role: 'harvester',
                evolution: Memory.harvesterEvolution
            });
            if (newName != "-6" && newName != "-4") {
                newName = newName += " harvester";
                console.log("Spawning harvetster : " + newName);
            }

        } else if (builders.length < Memory.worker.builders) {
            if (!Memory.notified) {
                console.log("need more builders " + builders.length + "/" + Memory.worker.builders);
                Memory.notified = true;
            }
            var newName = Game.spawns['Yokumi'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder'});
            if (newName != "-6" && newName != "-4") {
                newName = newName += " builder";
                console.log("Spawning builder: " + newName)
                Memory.notified = false;
            }

        } else if (repairers.length < Memory.worker.repairers) {
            if (!Memory.notified) {
                console.log("need more repairmens " + repairers.length + "/" + Memory.worker.repairers);
                Memory.notified = true;
            }
            var newName = Game.spawns['Yokumi'].createCreep([WORK, CARRY, MOVE], undefined, {
                role: 'repairman',
                needsRefill: true
            });
            if (newName != "-6" && newName != "-4") {
                newName = newName += " repairer";
                Memory.notified = false;
                console.log("Spawning repairer: " + newName)
            }

        } else if (haulers.length < Memory.worker.haulers) {
            if (!Memory.notified) {
                console.log("need more hauler " + haulers.length + "/" + Memory.worker.haulers);
                Memory.notified = true;
            }
            var newName = Game.spawns['Yokumi'].createCustomCreep(Game.spawns.Yokumi.room.energyAvailable, 'hauler');
            if (newName != "-6" && newName != "-4" && newName != "-5") {
                console.log("Spawning hauler: " + newName);
                Memory.notified = false;
            }
        } else if (miner.length < Memory.worker.miners) {
            if (!Memory.notified) {
                console.log("need more miners " + miner.length + "/" + Memory.worker.miners);
                Memory.notified = true;
            }
            if (Game.spawns.Yokumi.room.energyAvailable > 200) {
                var newName = Game.spawns['Yokumi'].createCustomCreep(Game.spawns.Yokumi.room.energyAvailable, 'miner');
                if (newName != "-6" && newName != "-4" && newName != "-5") {
                    console.log("Spawning miner: " + newName)
                    Memory.notified = false;
                }
            }
        } else {
            if (MaxenergyAviable == Game.spawns.Yokumi.room.energyAvailable && Memory.isTowesFull && Game.spawns.Yokumi.room.energyAvailable > 500) {
                var newName = Game.spawns['Yokumi'].createCustomCreep(MaxenergyAviable, 'upgrader');
                if (newName != "-6" && newName != "-4") {
                    console.log("Spawning upgrader: " + newName)
                }
            }
        }

        Memory.ticks++;
        if (Memory.ticks % 100 == 0) {
            console.log(Memory.ticks);
            console.log(Memory.MapUsage.join("\n"));
        }
        tower.defend();
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            Memory.MapUsage[creep.pos.y][creep.pos.x]++;
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'repairman') {
                roleRepairman.run(creep);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if (creep.memory.role == 'miner') {
                roleMiner.run(creep);
            }
            if (creep.memory.role == 'hauler') {
                roleHauler.run(creep);
            }
        }

    });
}

