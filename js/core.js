(function(window, $, utils) {

    var core = Game.Core = function() {

        var updateExpDisplay = function(start, end) {
            var range = end - start;
            var current = start;
            var increment = (range / 100);
            var timer = setInterval(function() {
                current += increment;
                $('.exp-value').html(utils.formatNumber(current));
                if (current == end) {
                    clearInterval(timer);
                }
            }, 1);
        };

        return {
            doSomething: function() {
                console.log(Game.getExperiencePoints());
            },

            updateExp: function(changeBy) {
                updateExpDisplay(Game.getExperiencePoints(), Game.updateExperiencePoints(changeBy));
                
            }
        };

    }();

})(window, jQuery, Game.Utils);