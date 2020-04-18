(function(window, $, char, quests) {

    var buttons = Buttons = function() {

        $('#warrior-level-up').click(function() {
            char.warrior.levelUp();
        });

        $('#caster-level-up').click(function() {
            char.caster.levelUp();
        });

        $('#rogue-level-up').click(function() {
            char.rogue.levelUp();
        });

        $('#init-selected-quest').click(function() {
            quests.initSelectedQuest();
        });

        $('.questing.rat-den').click(function() {
            if ($(this).hasClass('yes')) {
                console.log("collect");
            }
        });

        $('#deselect-quest').click(function() {
            quests.setSelected(0);
        })

        $('#map-rat-den').click(function() {
            quests.setSelected(1);
        })

        $('.left-panel-select-option.quest').click(function() {
            $('.left-panel-select-option.quest').addClass('selected');
            $('.left-panel-select-option.map').removeClass('selected');
            $('.left-panel-select-option.upgrade').removeClass('selected');

            $('#selected-quest-panel').css("display", "block");
            $('#selected-quest-perks').css("display", "block");
            $('#map-panel').css("display", "none");
            $('#upgrade-panel').css("display", "none");
        });

        $('.left-panel-select-option.map').click(function() {
            $('.left-panel-select-option.quest').removeClass('selected');
            $('.left-panel-select-option.map').addClass('selected');
            $('.left-panel-select-option.upgrade').removeClass('selected');

            $('#selected-quest-panel').css("display", "none");
            $('#selected-quest-perks').css("display", "none");
            $('#map-panel').css("display", "block");
            $('#upgrade-panel').css("display", "none");
        });

        $('.left-panel-select-option.upgrade').click(function() {
            $('.left-panel-select-option.quest').removeClass('selected');
            $('.left-panel-select-option.map').removeClass('selected');
            $('.left-panel-select-option.upgrade').addClass('selected');
            
            $('#selected-quest-panel').css("display", "none");
            $('#selected-quest-perks').css("display", "none");
            $('#map-panel').css("display", "none");
            $('#upgrade-panel').css("display", "block");
        });

        $('.right-panel-select-option.heroes').click(function() {
            $('.right-panel-select-option.heroes').addClass('selected');
            $('.right-panel-select-option.gear').removeClass('selected');
            $('.right-panel-select-option.items').removeClass('selected');

            $('#heroes-panel').css("display", "block");
            $('#gear-panel').css("display", "none");
            $('#items-panel').css("display", "none");
        })

        $('.right-panel-select-option.gear').click(function() {
            $('.right-panel-select-option.heroes').removeClass('selected');
            $('.right-panel-select-option.gear').addClass('selected');
            $('.right-panel-select-option.items').removeClass('selected');

            $('#heroes-panel').css("display", "none");
            $('#gear-panel').css("display", "block");
            $('#items-panel').css("display", "none");
        })

        $('.right-panel-select-option.items').click(function() {
            $('.right-panel-select-option.heroes').removeClass('selected');
            $('.right-panel-select-option.gear').removeClass('selected');
            $('.right-panel-select-option.items').addClass('selected');

            $('#heroes-panel').css("display", "none");
            $('#gear-panel').css("display", "none");
            $('#items-panel').css("display", "block");
        });

    }();


})(window, jQuery, Char, Quests);