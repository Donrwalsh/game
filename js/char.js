(function(window, $, data, display) {

    var char = Char = function() {

        class Character {
            constructor(source, statTier, selector) {
                this.source = source;
                this.statTier = statTier;
                this.selector = selector;
            }

            getLevelUpCost = function() {
                return this.source.level + 3;
            }

            getHealth = function() {
                return this.source.health;
            }

            getLuck = function() {
                return this.source.luck;
            }

            getMagic = function() {
                return this.source.magic;
            }

            getMind = function() {
                return this.source.mind;
            }

            getSpeed = function() {
                return this.source.speed;
            }

            getStrength = function() {
                return this.source.strength;
            }

            handleLevelUpButton = function() {
                if (data.experience_points >= this.getLevelUpCost()) {
                    $(this.selector + 'level-up').addClass('yes').removeClass('no');
                } else {
                    $(this.selector + 'level-up').addClass('no').removeClass('yes');
                }
            }

            levelUp = function() {
                if (data.experience_points >= this.getLevelUpCost()) {
                    updateExp(-1 * this.getLevelUpCost());
                    this.updateLevel(1);
                    this.updateHealth(getLevelUpStatIncrease(this.statTier.health, this.source.level))
                    this.updateStrength(getLevelUpStatIncrease(this.statTier.strength, this.source.level))
                    this.updateMagic(getLevelUpStatIncrease(this.statTier.magic, this.source.level))
                    this.updateMind(getLevelUpStatIncrease(this.statTier.mind, this.source.level))
                    this.updateSpeed(getLevelUpStatIncrease(this.statTier.speed, this.source.level))
                    this.updateLuck(getLevelUpStatIncrease(this.statTier.luck, this.source.level))
                }
            }

            setHealth = function(health) {
                var original = this.source.health;
                this.source.health = health;
                display.update(this.selector + 'health-value', original, health);
            }

            setLevel = function(level) {
                var original = this.source.level;
                this.source.level = level;
                handleAllLevelUpButtons();
                display.update(this.selector + 'level-value', original, level);
                display.update(this.selector + 'level-up-cost', 0, this.getLevelUpCost());
            }

            setLuck = function(luck) {
                var original = this.source.luck;
                this.source.luck = luck;
                display.update(this.selector + 'luck-value', original, luck);
            }
    
            setMagic = function(magic) {
                var original = this.source.magic;
                this.source.magic = magic;
                display.update(this.selector + 'magic-value', original, magic);
            }
    
            setMind = function(mind) {
                var original = this.source.mind;
                this.source.mind = mind;
                display.update(this.selector + 'mind-value', original, mind);
            }
    
            setSpeed = function(speed) {
                var original = this.source.speed;
                this.source.speed = speed;
                display.update(this.selector + 'speed-value', original, speed);
            }
    
            setStrength = function(strength) {
                var original = this.source.strength
                this.source.strength = strength;
                display.update(this.selector + 'strength-value', original, strength);
            }

            updateHealth = function(changeBy) {
                var value = this.source.health + changeBy;
                this.setHealth(value);
            }
    
            updateLevel = function(changeBy) {
                var value = this.source.level + changeBy;
                this.setLevel(value);
            }
    
            updateLuck = function(changeBy) {
                var value = this.source.luck + changeBy;
                this.setLuck(value);
            }
    
            updateMagic = function(changeBy) {
                var value = this.source.magic + changeBy;
                this.setMagic(value);
            }
    
            updateMind = function(changeBy) {
                var value = this.source.mind + changeBy;
                this.setMind(value);
            }
    
            updateSpeed = function(changeBy) {
                var value = this.source.speed + changeBy;
                this.setSpeed(value);
            }
    
            updateStrength = function(changeBy) {
                var value = this.source.strength + changeBy;
                this.setStrength(value);
            }
        }

        var warriorStatTier = {
            strength : 'high', health: 'high',
            magic : 'low', mind : 'mid',
            speed : 'low', luck : 'mid'
        }

        var casterStatTier = {
            strength : 'low', health: 'mid',
            magic : 'high', mind : 'high',
            speed : 'mid', luck : 'low'
        }

        var rogueStatTier = {
            strength : 'mid', health: 'low',
            magic : 'mid', mind : 'low',
            speed : 'high', luck : 'high'
        }

        var warrior = new Character(data.warrior, warriorStatTier, '.warrior-');
        var caster = new Character(data.caster, casterStatTier, '.caster-');
        var rogue = new Character(data.rogue, rogueStatTier, '.rogue-');

        var getLevelUpStatIncrease = function(tier, level) {
            var result = 0;
            if (tier === "high") {
                result = Math.floor(Math.random() * 4) + 2;
            }
            if (tier === "mid") {
                result = Math.floor(Math.random() * 3) + 1;
            }
            if (tier === "low") {
                result = Math.floor(Math.random() * 2) + 0;
            }
            return result;
        }

        var handleAllLevelUpButtons = function() {
            warrior.handleLevelUpButton();
            caster.handleLevelUpButton();
            rogue.handleLevelUpButton();
        }

        var setExp = function(amount) {
            var original = data.experience_points;
            data.experience_points = amount;
            display.update('.exp-value', original, amount);
            handleAllLevelUpButtons();
        }

        var updateExp = function(changeBy) {
            var value = data.experience_points + changeBy;
            setExp(value);
        }
    
        return {
            caster : caster,
            rogue : rogue,
            warrior : warrior,
            setExp : setExp,
            updateExp : updateExp
        }
    }();
})(window, jQuery, Data, Display);