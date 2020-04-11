(function(window, $, data, display) {

    var char = Char = function() {

        class Character {
            constructor(name, source, statTier, selector, idSelector) {
                this.name = name;
                this.source = source;
                this.statTier = statTier;
                this.selector = selector;
                this.idSelector = idSelector;
            }

            getLevel = function() {
                return this.source.level;
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
                    $(this.idSelector + 'level-up').addClass('yes').removeClass('no');
                } else {
                    $(this.idSelector + 'level-up').addClass('no').removeClass('yes');
                }
            }

            levelUp = function() {
                if (data.experience_points >= this.getLevelUpCost()) {
                    var message = "[-" + display.formatNumber(this.getLevelUpCost()) + " exp] " +  this.name;
                    updateExp(-1 * this.getLevelUpCost());
                    this.updateLevel(1);
                    message += " has reached level " + this.getLevel() + ": ";
                    var strengthIncrease = getLevelUpStatIncrease(this.statTier.strength, this.source.level);
                    var healthIncrease = getLevelUpStatIncrease(this.statTier.health, this.source.level);
                    var magicIncrease = getLevelUpStatIncrease(this.statTier.magic, this.source.level);
                    var mindIncrease = getLevelUpStatIncrease(this.statTier.mind, this.source.level);
                    var speedIncrease = getLevelUpStatIncrease(this.statTier.speed, this.source.level);
                    var luckIncrease =  getLevelUpStatIncrease(this.statTier.luck, this.source.level);
                    message += '<i class="fas fa-fist-raised"></i>+' + strengthIncrease  + 
                               ' <i class="fas fa-heartbeat"></i>+' +  healthIncrease + 
                               ' <i class="fas fa-scroll"></i>+' + magicIncrease +
                               ' <i class="fas fa-hat-wizard"></i>+' + mindIncrease +
                               ' <i class="fas fa-bolt"></i>+' + speedIncrease +
                               ' <i class="fas fa-dice-d20"></i>+' + luckIncrease; 
                    this.updateStrength(strengthIncrease);
                    this.updateHealth(healthIncrease);
                    this.updateMagic(magicIncrease);
                    this.updateMind(mindIncrease);
                    this.updateSpeed(speedIncrease);
                    this.updateLuck(luckIncrease);
                    display.addMessage(message);
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

        var warrior = new Character("Warrior", data.warrior, warriorStatTier, '.warrior-', '#warrior-');
        var caster = new Character("Caster", data.caster, casterStatTier, '.caster-', '#caster-');
        var rogue = new Character("Rogue", data.rogue, rogueStatTier, '.rogue-', '#rogue-');

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
            display.update('#exp-value', original, amount);
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