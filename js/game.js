(function(window, $) {

    var game = Game = function() {

        const data = {
            experience_points : 0,
            warrior_level : 0,
            warrior_strength : 3,
            warrior_health : 3,
            warrior_magic : 1,
            warrior_mind : 2,
            warrior_speed : 1,
            warrior_luck : 2,
            caster_level : 0,
            caster_strength : 1,
            caster_health : 2,
            caster_magic : 3,
            caster_mind : 3,
            caster_speed : 2,
            caster_luck : 1,
            rogue_level : 0,
            rogue_strength : 2,
            rogue_health : 1,
            rogue_magic : 2,
            rogue_mind : 1,
            rogue_speed : 3,
            rogue_luck : 3,

            rat_den_active : false,
            rat_den_progress : 0,
            rat_den_level : 0
        }
        
        
        return {
            //data getters/setters
            getExperiencePoints: function() {
                return data.experience_points;
            },

            getWarriorHealth: function() {
                return data.warrior_health;
            },

            getWarriorLevel: function() {
                return data.warrior_level;
            },

            getWarriorLuck: function() {
                return data.warrior_luck;
            },

            getWarriorMagic: function() {
                return data.warrior_magic;
            },

            getWarriorMind: function() {
                return data.warrior_mind;
            },

            getWarriorSpeed: function() {
                return data.warrior_speed;
            },

            getWarriorStrength: function() {
                return data.warrior_strength;
            },

            getCasterHealth: function() {
                return data.caster_health;
            },

            getCasterLevel: function() {
                return data.caster_level;
            },

            getCasterLuck: function() {
                return data.caster_luck;
            },

            getCasterMagic: function() {
                return data.caster_magic;
            },

            getCasterMind: function() {
                return data.caster_mind;
            },

            getCasterSpeed: function() {
                return data.caster_speed;
            },

            getCasterStrength: function() {
                return data.caster_strength;
            },

            getRogueHealth: function() {
                return data.rogue_health;
            },

            getRogueLevel: function() {
                return data.rogue_level;
            },

            getRogueLuck: function() {
                return data.rogue_luck;
            },

            getRogueMagic: function() {
                return data.rogue_magic;
            },

            getRogueMind: function() {
                return data.rogue_mind;
            },

            getRogueSpeed: function() {
                return data.rogue_speed;
            },

            getRogueStrength: function() {
                return data.rogue_strength;
            },

            setExperiencePoints: function(points) {
                data.experience_points = points;
            },

            setWarriorHealth: function(health) {
                data.warrior_health = health;
            },

            setWarriorLevel: function(level) {
                data.warrior_level = level;
            },

            setWarriorLuck: function(luck) {
                data.warrior_luck = luck;
            },

            setWarriorMagic: function(magic) {
                data.warrior_magic = magic;
            },

            setWarriorMind: function(mind) {
                data.warrior_mind = mind;
            },

            setWarriorSpeed: function(speed) {
                data.warrior_speed = speed;
            },

            setWarriorStrength: function(strength) {
                data.warrior_strength = strength;
            },

            setCasterHealth: function(health) {
                data.caster_health = health;
            },

            setCasterLevel: function(level) {
                data.caster_level = level;
            },

            setCasterLuck: function(luck) {
                data.caster_luck = luck;
            },

            setCasterMagic: function(magic) {
                data.caster_magic = magic;
            },

            setCasterMind: function(mind) {
                data.caster_mind = mind;
            },

            setCasterSpeed: function(speed) {
                data.caster_speed = speed;
            },

            setCasterStrength: function(strength) {
                data.caster_strength = strength;
            },

            setRogueHealth: function(health) {
                data.rogue_health = health;
            },

            setRogueLevel: function(level) {
                data.rogue_level = level;
            },

            setRogueLuck: function(luck) {
                data.rogue_luck = luck;
            },

            setRogueMagic: function(magic) {
                data.rogue_magic = magic;
            },

            setRogueMind: function(mind) {
                data.rogue_mind = mind;
            },

            setRogueSpeed: function(speed) {
                data.rogue_speed = speed;
            },

            setRogueStrength: function(strength) {
                data.rogue_strength = strength;
            },

            //derived values
            getWarriorLevelUpCost: function() {
                return data.warrior_level + 3;
            },

            getCasterLevelUpCost: function() {
                return data.caster_level + 3;
            },

            getRogueLevelUpCost: function() {
                return data.rogue_level + 3;
            },

            getHighTierStatIncrease: function(level) {
                return Math.floor(Math.random() * 4) + 2;
            },

            getMidTierStatIncrease: function(level) {
                return Math.floor(Math.random() * 3) + 1;
            },

            getLowTierStatIncrease: function(level) {
                return Math.floor(Math.random() * 2) + 0;
            },

            getRatDenPerTickExp: function() {
                return 1;
            }
        };


    }();

})(window, jQuery);