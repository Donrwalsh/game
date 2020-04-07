(function(window, $) {

    var game = Game = function() {

        const data = {
            experience_points : 0,
            warrior_level : 0,
            warrior_strength : 3,
            warrior_health : 3
        }
        
        
        return {
            getExperiencePoints: function() {
                return data.experience_points;
            },

            getWarriorLevel: function() {
                return data.warrior_level;
            },

            getWarriorHealth: function() {
                return data.warrior_health;
            },

            getWarriorStrength: function() {
                return data.warrior_strength;
            },

            updateWarriorLevel: function(changeBy) {
                data.warrior_level += changeBy;
                return data.warrior_level;
            },

            updateWarriorHealth: function(changeBy) {
                data.warrior_health += changeBy;
                return data.warrior_health;
            },

            updateWarriorStrength: function(changeBy) {
                data.warrior_strength += changeBy;
                return data.warrior_strength;
            },

            updateExperiencePoints: function(changeBy) {
                data.experience_points += changeBy;
                return data.experience_points;
            }
        };


    }();

})(window, jQuery);