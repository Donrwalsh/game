(function(window, $, char, quests) {

    var buttons = Buttons = function() {

        $('.warrior-level-up').click(function() {
            char.warrior.levelUp();
        });

        $('.caster-level-up').click(function() {
            char.caster.levelUp();
        });

        $('.rogue-level-up').click(function() {
            char.rogue.levelUp();
        });

        $('.rat-den-quest').click(function() {
            quests.ratDen.beginQuest();            
        });

        $('.spider-cave-quest').click(function() {
            quests.spiderCave.beginQuest();            
        });

        $('.questing.rat-den').click(function() {
            if ($(this).hasClass('yes')) {
                console.log("collect");
            }
        })
    }();


})(window, jQuery, Char, Quests);