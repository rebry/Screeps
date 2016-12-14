/**
 * Created by Rebry on 24.11.2016.
 */

var buildDNA = {

    /** @param {Creep} creep **/
    build: function (creep) {
        console.log(creep.name);
        if (creep.memory.evolution.DNA == "") {
            console.log("building DNA");
            for (x in creep.body) {
                creep.memory.evolution.DNA.push(creep.body[x].type);
            }
        }

    }
};


module.exports = buildDNA;