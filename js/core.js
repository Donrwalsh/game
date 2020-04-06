(function(window, $) {

    var core = Game.Core = function() {
        return {
            doSomething: function() {
                console.log(Game.getExperiencePoints());
            }
        };

    }();

})(window, jQuery);