(function(window, $, utils, core) {

    var buttons = Game.Buttons = function() {

        $('.button-plus').click(function() {
            core.updateExp(30);
        });

        $('.button-minus').click(function() {
            core.updateExp(-1);
        });

        $('.warrior-level-up').click(function() {
            core.levelUpWarrior();
        });

        $('.caster-level-up').click(function() {
            core.levelUpCaster();
        });

        $('.rogue-level-up').click(function() {
            core.levelUpRogue();
        });

    }();


})(window, jQuery, Game.Utils, Game.Core);