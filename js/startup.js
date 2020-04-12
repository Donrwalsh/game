(function(window, $, data, char, quests, items) {

    var startup = Startup = function() {

        var freshGame = function() {
            char.setExp(0);
            char.warrior.setLevel(0);
            char.warrior.setStrength(3);
            char.warrior.setHealth(3);
            char.warrior.setMagic(1);
            char.warrior.setMind(2);
            char.warrior.setSpeed(1);
            char.warrior.setLuck(2);
            char.caster.setLevel(0);
            char.caster.setStrength(1);
            char.caster.setHealth(2);
            char.caster.setMagic(3);
            char.caster.setMind(3);
            char.caster.setSpeed(2);
            char.caster.setLuck(1);
            char.rogue.setLevel(0);
            char.rogue.setStrength(2);
            char.rogue.setHealth(1);
            char.rogue.setMagic(2);
            char.rogue.setMind(1);
            char.rogue.setSpeed(3);
            char.rogue.setLuck(3);

            quests.setSelected(1);

            items.setCollectStorageCount(3, [0, 0, 0], [0, 0, 0]);
        }

        freshGame();


    }();

})(window, jQuery, Data, Char, Quests, Items);

