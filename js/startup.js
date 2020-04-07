(function(window, $, utils, core) {

    var startup = Game.Startup = function() {

        var freshGame = function() {
            core.setExp(0);
            core.setWarriorLevel(0);
            core.setWarriorStrength(3);
            core.setWarriorHealth(3);
            core.setWarriorMagic(1);
            core.setWarriorMind(2);
            core.setWarriorSpeed(1);
            core.setWarriorLuck(2);
            core.setCasterLevel(0);
            core.setCasterStrength(1);
            core.setCasterHealth(2);
            core.setCasterMagic(3);
            core.setCasterMind(3);
            core.setCasterSpeed(2);
            core.setCasterLuck(1);
            core.setRogueLevel(0);
            core.setRogueStrength(2);
            core.setRogueHealth(1);
            core.setRogueMagic(2);
            core.setRogueMind(1);
            core.setRogueSpeed(3);
            core.setRogueLuck(3);
        }

        freshGame();

    }();

})(window, jQuery, Game.Utils, Game.Core);

