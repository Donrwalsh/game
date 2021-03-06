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

        var storage = {
            count : 3,
            collect : [0, 0, 0],
            collectRarity : [0, 0, 0]
        }

        // Quests
        var active_quest = {
            id : 0,
            progress : 0,
            running : false,
            time : 0
        }

        var selected_quest = {
            id : 0
        }

        var selected_gear = {
            id : 0
        }

        var rat_den = {
            level : 0,
            map_pieces : [0, 0, 0, 0]
        }

        var spider_cave = {
            level : 0,
            map_pieces : [0, 0, 0, 0]
        }

        var items = {
            rat_tail : { amount : 0, seen : 0, max : 3 },
            den_shroom : { amount : 0, seen : 0, max : 3 },
            rat_poison : { amount : 0, seen : 0, max : 3 },
            survival_quartz : { amount : 0, seen : 0, max : 3 }
        }
    
        return {
            experience_points : experience_points,
            
            // Characters
            warrior : warrior,
            caster : caster,
            rogue : rogue,
            storage : storage,
            
            // Quests
            active_quest : active_quest,
            rat_den : rat_den,
            spider_cave : spider_cave,

            //Items
            items : items,

            //Display
            selected_gear : selected_gear,
            selected_quest : selected_quest
        }
    }();
})(window, jQuery);