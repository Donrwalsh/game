(function(window, $, utils, core) {

    var buttons = Game.Buttons = function() {

        $('.button-plus').click(function() {
            core.updateExp(99999);
        });

        $('.button-minus').click(function() {
            core.updateExp(-1);
        });

        $('.warrior-level-up').click(function() {
            core.levelUpWarrior();
        });

    }();


})(window, jQuery, Game.Utils, Game.Core);