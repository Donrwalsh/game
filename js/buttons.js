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

        $('.init-selected-quest').click(function() {
            quests.initSelectedQuest();
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
        });

        $('.left-bar-select-option.quest').click(function() {
            $('.left-bar-select-option.quest').addClass('selected');
            $('.selected-quest-panel').css("visibility", "visible");
            $('.left-bar-select-option.map').removeClass('selected');
            $('.map-panel').css("visibility", "hidden");
            $('.left-bar-select-option.skills').removeClass('selected');
            $('.skills-panel').css("visibility", "hidden");
            $('.left-bar-select-option.items').removeClass('selected');
            $('.items-panel').css("visibility", "hidden");
        });

        $('.left-bar-select-option.map').click(function() {
            $('.left-bar-select-option.quest').removeClass('selected');
            $('.selected-quest-panel').css("visibility", "hidden");
            $('.left-bar-select-option.map').addClass('selected');
            $('.map-panel').css("visibility", "visible");
            $('.left-bar-select-option.skills').removeClass('selected');
            $('.skills-panel').css("visibility", "hidden");
            $('.left-bar-select-option.items').removeClass('selected');
            $('.items-panel').css("visibility", "hidden");
        });

        $('.left-bar-select-option.skills').click(function() {
            $('.left-bar-select-option.quest').removeClass('selected');
            $('.selected-quest-panel').css("visibility", "hidden");
            $('.left-bar-select-option.map').removeClass('selected');
            $('.map-panel').css("visibility", "hidden");
            $('.left-bar-select-option.skills').addClass('selected');
            $('.skills-panel').css("visibility", "visible");
            $('.left-bar-select-option.items').removeClass('selected');
            $('.items-panel').css("visibility", "hidden");
        });

        $('.left-bar-select-option.items').click(function() {
            $('.left-bar-select-option.quest').removeClass('selected');
            $('.selected-quest-panel').css("visibility", "hidden");
            $('.left-bar-select-option.map').removeClass('selected');
            $('.map-panel').css("visibility", "hidden");
            $('.left-bar-select-option.skills').removeClass('selected');
            $('.skills-panel').css("visibility", "hidden");
            $('.left-bar-select-option.items').addClass('selected');
            $('.items-panel').css("visibility", "visible");
        });

    }();


})(window, jQuery, Char, Quests);