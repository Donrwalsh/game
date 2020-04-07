(function(window, $, utils) {

    var core = Game.Core = function() {

        var updateExp = function(changeBy) {
            updateDisplay('.exp-value', Game.getExperiencePoints(), Game.updateExperiencePoints(changeBy));
        }

        var updateDisplay = function(selector, start, end) {
            var range = end - start;
            var current = start;
            var increment = range / 50;
            var counter = 0;
            var timer = setInterval(function() {
                counter++;
                current += increment;
                cleanCurrent = Math.ceil(current);
                $(selector).html(utils.formatNumber(cleanCurrent));
                if (cleanCurrent == end || counter == 50) {
                    clearInterval(timer);
                    $(selector).html(utils.formatNumber(end));
                }
            }, 1);
        };

        return {
            doSomething: function() {
                console.log(Game.getExperiencePoints());
            },

            updateExp: updateExp,

            levelUpWarrior: function() {
                updateExp(-10);
                updateDisplay('.warrior-level-value', Game.getWarriorLevel(), Game.updateWarriorLevel(1));
                updateDisplay('.warrior-strength-value', Game.getWarriorStrength(), Game.updateWarriorStrength(100));
                updateDisplay('.warrior-health-value', Game.getWarriorHealth(), Game.updateWarriorHealth(100));
            }
        };

    }();

})(window, jQuery, Game.Utils);