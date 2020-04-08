(function(window, $, data, display) {

    var char = Char = function() {

        var getLevelUpCost = function() {
            return this.source.level + 3;
        }

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

        var handleLevelUpButton = function() {
            if (data.experience_points >= this.getLevelUpCost()) {
                $(this.selector + 'level-up').addClass('yes').removeClass('no');
            } else {
                $(this.selector + 'level-up').addClass('no').removeClass('yes');
            }
        }

        var levelUp = function() {
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

        var setExp = function(amount) {
            var original = data.experience_points;
            data.experience_points = amount;
            display.update('.exp-value', original, amount);
            handleAllLevelUpButtons();
        }

        var setHealth = function(health) {
            var original = this.source.health;
            this.source.health = health;
            display.update(this.selector + 'health-value', original, health);
        }

        var setLevel = function(level) {
            var original = this.source.level;
            this.source.level = level;
            handleAllLevelUpButtons();
            display.update(this.selector + 'level-value', original, level);
            display.update(this.selector + 'level-up-cost', 0, this.getLevelUpCost());
        }

        var setLuck = function(luck) {
            var original = this.source.luck;
            this.source.luck = luck;
            display.update(this.selector + 'luck-value', original, luck);
        }

        var setMagic = function(magic) {
            var original = this.source.magic;
            this.source.magic = magic;
            display.update(this.selector + 'magic-value', original, magic);
        }

        var setMind = function(mind) {
            var original = this.source.mind;
            this.source.mind = mind;
            display.update(this.selector + 'mind-value', original, mind);
        }

        var setSpeed = function(speed) {
            var original = this.source.speed;
            this.source.speed = speed;
            display.update(this.selector + 'speed-value', original, speed);
        }

        var setStrength = function(strength) {
            var original = this.source.strength
            this.source.strength = strength;
            display.update(this.selector + 'strength-value', original, strength);
        }

        var updateExp = function(changeBy) {
            var value = data.experience_points + changeBy;
            setExp(value);
        }

        var updateHealth = function(changeBy) {
            var value = this.source.health + changeBy;
            this.setHealth(value);
        }

        var updateLevel = function(changeBy) {
            var value = this.source.level + changeBy;
            this.setLevel(value);
        }

        var updateLuck = function(changeBy) {
            var value = this.source.luck + changeBy;
            this.setLuck(value);
        }

        var updateMagic = function(changeBy) {
            var value = this.source.magic + changeBy;
            this.setMagic(value);
        }

        var updateMind = function(changeBy) {
            var value = this.source.mind + changeBy;
            this.setMind(value);
        }

        var updateSpeed = function(changeBy) {
            var value = this.source.speed + changeBy;
            this.setSpeed(value);
        }

        var updateStrength = function(changeBy) {
            var value = this.source.strength + changeBy;
            this.setStrength(value);
        }

        var warrior = {
            statTier : {
                strength : 'high',
                health: 'high',
                magic : 'low',
                mind : 'mid',
                speed : 'low',
                luck : 'mid'
            },
            source : data.warrior,
            selector: '.warrior-',
            getLevelUpCost : getLevelUpCost,
            handleLevelUpButton : handleLevelUpButton,
            levelUp : levelUp,
            setHealth: setHealth,
            setLevel : setLevel,
            setLuck : setLuck,
            setMagic : setMagic,
            setMind : setMind,
            setSpeed : setSpeed,
            setStrength : setStrength,
            updateHealth: updateHealth,
            updateLevel : updateLevel,
            updateLuck : updateLuck,
            updateMagic : updateMagic,
            updateMind : updateMind,
            updateSpeed : updateSpeed,
            updateStrength : updateStrength
        }

        var caster = {
            statTier : {
                strength : 'low',
                health: 'mid',
                magic : 'high',
                mind : 'high',
                speed : 'mid',
                luck : 'low'
            },
            source : data.caster,
            selector: '.caster-',
            getLevelUpCost : getLevelUpCost,
            handleLevelUpButton : handleLevelUpButton,
            levelUp : levelUp,
            setHealth: setHealth,
            setLevel : setLevel,
            setLuck : setLuck,
            setMagic : setMagic,
            setMind : setMind,
            setSpeed : setSpeed,
            setStrength : setStrength,
            updateHealth: updateHealth,
            updateLevel : updateLevel,
            updateLuck : updateLuck,
            updateMagic : updateMagic,
            updateMind : updateMind,
            updateSpeed : updateSpeed,
            updateStrength : updateStrength
        }

        var rogue = {
            statTier : {
                strength : 'mid',
                health: 'low',
                magic : 'mid',
                mind : 'low',
                speed : 'high',
                luck : 'high'
            },
            source : data.rogue,
            selector: '.rogue-',
            getLevelUpCost : getLevelUpCost,
            levelUp : levelUp,
            handleLevelUpButton : handleLevelUpButton,
            setHealth: setHealth,
            setLevel : setLevel,
            setLuck : setLuck,
            setMagic : setMagic,
            setMind : setMind,
            setSpeed : setSpeed,
            setStrength : setStrength,
            updateHealth: updateHealth,
            updateLevel : updateLevel,
            updateLuck : updateLuck,
            updateMagic : updateMagic,
            updateMind : updateMind,
            updateSpeed : updateSpeed,
            updateStrength : updateStrength
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