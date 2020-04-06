(function(window, $, utils) {

    var core = Game.Core = function() {

        var updateExpDisplay = function(start, end) {
            var range = end - start;
            var current = start;
            var increment = range / 100;
            var counter = 0;
            var timer = setInterval(function() {
                counter++;
                current += increment;
                cleanCurrent = Math.floor(current);
                $('.exp-value').html(utils.formatNumber(cleanCurrent));
                if (cleanCurrent == end || counter == 100) {
                    clearInterval(timer);
                    $('.exp-value').html(utils.formatNumber(Game.getExperiencePoints()));
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