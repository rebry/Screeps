/**
 * Created by Dadle on 21.11.2016.
 */
module.exports = function () {
    StructureSpawn.prototype.createCustomCreep =
        function (energy, roleName) {
            var bodyCost = {
                "move": 50,
                "carry": 50,
                "work": 100,
                "heal": 200,
                "tough": 10,
                "attack": 80,
                "ranged_attack": 150
            };
            var creepEnergyCost = 0;
            var body = [];
            //Set body parts
            if (roleName == 'miner') {
                if (energy < 200) {
                    return "-5"
                } else {
                    body.push(WORK);
                    body.push(CARRY);
                    body.push(MOVE);
                    creepEnergyCost += 200;
                    console.log(creepEnergyCost + " Is enough for th basic unit");
                    for (var i = 0; i < 6; i++) {
                        if (energy > creepEnergyCost + 100) {
                            console.log(creepEnergyCost + "/" + energy + "adding WORK")
                            body.push(WORK);
                            creepEnergyCost += 100;
                        }
                    }
                    if (energy > creepEnergyCost) {
                        for (var i = 0; i < 3; i++) {
                            if (energy > creepEnergyCost + 50) {
                                body.push(MOVE);
                                console.log(creepEnergyCost + "/" + energy + "adding MOVE")
                                creepEnergyCost += 50;
                            }
                        }
                    }
                    if (energy > creepEnergyCost) {
                        for (var i = 0; i < 11; i++) {
                            if (energy > creepEnergyCost + 70) {
                                console.log(creepEnergyCost + "/" + energy + "adding MOVE, TOUGH, TOUGH")
                                body.push(MOVE);
                                body.push(TOUGH);
                                body.push(TOUGH);
                                creepEnergyCost += 70;
                            }
                        }
                    }
                }
            }
            if (roleName == 'hauler') {
                if (energy < 200) {
                    return "-5"
                } else {
                    body.push(WORK);
                    body.push(CARRY);
                    body.push(MOVE);
                    creepEnergyCost += 200;
                    console.log(creepEnergyCost + " Is enough for th basic unit");
                    if (energy > creepEnergyCost) {
                        for (var i = 0; i < 22; i++) {
                            if (energy > creepEnergyCost + 100) {
                                body.push(MOVE);
                                body.push(CARRY);
                                console.log(creepEnergyCost + "/" + energy + "adding MOVE, CARRY")
                                creepEnergyCost += 100;
                            }
                        }
                    }
                }
            }
            if (roleName == 'upgrader') {
                if (energy < 200) {;
                    return "-5"
                } else {
                    body.push(WORK);
                    body.push(CARRY);
                    body.push(MOVE);
                    creepEnergyCost += 200;
                    console.log(creepEnergyCost + " Is enough for th basic unit");
                    if (energy > creepEnergyCost) {
                        for (var i = 0; i < 22; i++) {
                            if (energy > creepEnergyCost + 200) {
                                body.push(MOVE);
                                body.push(CARRY);
                                body.push(WORK);
                                console.log(creepEnergyCost + "/" + energy + "adding MOVE, CARRY, WORK")
                                creepEnergyCost += 200;
                            }
                        }
                    }
                }
            }
            var memory = '';
            if (roleName == 'waller') {
                memory = {role: roleName, wallPercentage: 0.0001};
            } else if (roleName == 'offshoreBuilder') {
                memory = {role: roleName, assignedRoom: 'E12N66'};
            }else if (roleName == 'hauler') {
                memory = {role: roleName, isFull: false};
            } else {
                memory = {role: roleName};
            }
            console.log("creating Creep with: " + body)
            return this.createCreep(body, undefined, memory);
        };
}
;