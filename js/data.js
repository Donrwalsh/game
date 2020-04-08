(function(window, $) {
    var data = Data = function() {
        var experience_points = 0;

        // Characters
        var warrior = {
            level : 0,
            strength : 3, health: 3, magic : 1,
            mind : 2, speed : 1, luck : 2
        }
        var caster = {
            level : 0,
            strength : 1, health: 2, magic : 3,
            mind : 3, speed : 2, luck : 1
        }
        var rogue = {
            level : 0,
            strength : 2, health: 1, magic : 2,
            mind : 1, speed : 3, luck : 3
        }

        // Quests
        var rat_den = {
            active : false, progress : 0, level : 0
        }
    
        return {
            experience_points : experience_points,
            
            // Characters
            warrior : warrior,
            caster : caster,
            rogue : rogue,
            
            // Quests
            rat_den : rat_den
        }
    }();
})(window, jQuery);