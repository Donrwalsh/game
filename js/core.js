(function(window, $, utils) {

    var core = Game.Core = function() {

        const selector = {
            exp : '.exp-value',
            warriorLevel : '.warrior-level-value',
            warriorLevelUpCost : '.warrior-level-up-cost',
            warriorStrength : '.warrior-strength-value',
            warriorHealth : '.warrior-health-value',
            warriorMagic : '.warrior-magic-value',
            warriorMind : '.warrior-mind-value',
            warriorSpeed : '.warrior-speed-value',
            warriorLuck : '.warrior-luck-value',
            casterLevel : '.caster-level-value',
            casterLevelUpCost : '.caster-level-up-cost',
            casterStrength : '.caster-strength-value',
            casterHealth : '.caster-health-value',
            casterMagic : '.caster-magic-value',
            casterMind : '.caster-mind-value',
            casterSpeed : '.caster-speed-value',
            casterLuck : '.caster-luck-value',
            rogueLevel : '.rogue-level-value',
            rogueLevelUpCost : '.rogue-level-up-cost',
            rogueStrength : '.rogue-strength-value',
            rogueHealth : '.rogue-health-value',
            rogueMagic : '.rogue-magic-value',
            rogueMind : '.rogue-mind-value',
            rogueSpeed : '.rogue-speed-value',
            rogueLuck : '.rogue-luck-value',
        }

        var setExp = function(amount) {
            var original = Game.getExperiencePoints();
            Game.setExperiencePoints(amount);
            updateDisplay(selector.exp, original, amount);
            handleLevelUpButtons();
        }

        var setWarriorHealth = function(amount) {
            var original = Game.getWarriorHealth();
            Game.setWarriorHealth(amount);
            updateDisplay(selector.warriorHealth, original, amount);
        }

        var setWarriorLevel = function(amount) {
            var original = Game.getWarriorLevel();
            Game.setWarriorLevel(amount);
            updateDisplay(selector.warriorLevel, original, amount);
            handleLevelUpButtons();
            updateDisplay(selector.warriorLevelUpCost, 0, Game.getWarriorLevelUpCost());
        }

        var setWarriorLuck = function(amount) {
            var original = Game.getWarriorLuck();
            Game.setWarriorLuck(amount);
            updateDisplay(selector.warriorLuck, original, amount);
        }

        var setWarriorMagic = function(amount) {
            var original = Game.getWarriorMagic();
            Game.setWarriorMagic(amount);
            updateDisplay(selector.warriorMagic, original, amount);
        }

        var setWarriorMind = function(amount) {
            var original = Game.getWarriorMind();
            Game.setWarriorMind(amount);
            updateDisplay(selector.warriorMind, original, amount);
        }

        var setWarriorSpeed = function(amount) {
            var original = Game.getWarriorSpeed();
            Game.setWarriorSpeed(amount);
            updateDisplay(selector.warriorSpeed, original, amount);
        }

        var setWarriorStrength = function(amount) {
            var original = Game.getWarriorStrength();
            Game.setWarriorStrength(amount);
            updateDisplay(selector.warriorStrength, original, amount);
        }

        var setCasterHealth = function(amount) {
            var original = Game.getCasterHealth();
            Game.setCasterHealth(amount);
            updateDisplay(selector.casterHealth, original, amount);
        }

        var setCasterLevel = function(amount) {
            var original = Game.getCasterLevel();
            Game.setCasterLevel(amount);
            updateDisplay(selector.casterLevel, original, amount);
            handleLevelUpButtons();
            updateDisplay(selector.casterLevelUpCost, 0, Game.getCasterLevelUpCost());
        }

        var setCasterLuck = function(amount) {
            var original = Game.getCasterLuck();
            Game.setCasterLuck(amount);
            updateDisplay(selector.casterLuck, original, amount);
        }

        var setCasterMagic = function(amount) {
            var original = Game.getCasterMagic();
            Game.setCasterMagic(amount);
            updateDisplay(selector.casterMagic, original, amount);
        }

        var setCasterMind = function(amount) {
            var original = Game.getCasterMind();
            Game.setCasterMind(amount);
            updateDisplay(selector.casterMind, original, amount);
        }

        var setCasterSpeed = function(amount) {
            var original = Game.getCasterSpeed();
            Game.setCasterSpeed(amount);
            updateDisplay(selector.casterSpeed, original, amount);
        }

        var setCasterStrength = function(amount) {
            var original = Game.getCasterStrength();
            Game.setCasterStrength(amount);
            updateDisplay(selector.casterStrength, original, amount);
        }

        var setRogueHealth = function(amount) {
            var original = Game.getRogueHealth();
            Game.setRogueHealth(amount);
            updateDisplay(selector.rogueHealth, original, amount);
        }

        var setRogueLevel = function(amount) {
            var original = Game.getRogueLevel();
            Game.setRogueLevel(amount);
            updateDisplay(selector.rogueLevel, original, amount);
            handleLevelUpButtons();
            updateDisplay(selector.rogueLevelUpCost, 0, Game.getRogueLevelUpCost());
        }

        var setRogueLuck = function(amount) {
            var original = Game.getRogueLuck();
            Game.setRogueLuck(amount);
            updateDisplay(selector.rogueLuck, original, amount);
        }

        var setRogueMagic = function(amount) {
            var original = Game.getRogueMagic();
            Game.setRogueMagic(amount);
            updateDisplay(selector.rogueMagic, original, amount);
        }

        var setRogueMind = function(amount) {
            var original = Game.getRogueMind();
            Game.setRogueMind(amount);
            updateDisplay(selector.rogueMind, original, amount);
        }

        var setRogueSpeed = function(amount) {
            var original = Game.getRogueSpeed();
            Game.setRogueSpeed(amount);
            updateDisplay(selector.rogueSpeed, original, amount);
        }

        var setRogueStrength = function(amount) {
            var original = Game.getRogueStrength();
            Game.setRogueStrength(amount);
            updateDisplay(selector.rogueStrength, original, amount);
        }

        var updateExp = function(changeBy) {
            var value = Game.getExperiencePoints() + changeBy;
            setExp(value);
        }

        var updateWarriorHealth = function(changeBy) {
            var value = Game.getWarriorHealth() + changeBy;
            setWarriorHealth(value);
        }

        var updateWarriorStrength = function(changeBy) {
            var value = Game.getWarriorStrength() + changeBy;
            setWarriorStrength(value);
        }

        var updateWarriorLevel = function(changeBy) {
            var value = Game.getWarriorLevel() + changeBy;
            setWarriorLevel(value);
        }

        var updateWarriorLuck = function(changeBy) {
            var value = Game.getWarriorLuck() + changeBy;
            setWarriorLuck(value);
        }

        var updateWarriorMagic = function(changeBy) {
            var value = Game.getWarriorMagic() + changeBy;
            setWarriorMagic(value);
        }

        var updateWarriorMind = function(changeBy) {
            var value = Game.getWarriorMind() + changeBy;
            setWarriorMind(value);
        }

        var updateWarriorSpeed = function(changeBy) {
            var value = Game.getWarriorSpeed() + changeBy;
            setWarriorSpeed(value);
        }

        var updateCasterHealth = function(changeBy) {
            var value = Game.getCasterHealth() + changeBy;
            setCasterHealth(value);
        }

        var updateCasterStrength = function(changeBy) {
            var value = Game.getCasterStrength() + changeBy;
            setCasterStrength(value);
        }

        var updateCasterLevel = function(changeBy) {
            var value = Game.getCasterLevel() + changeBy;
            setCasterLevel(value);
        }

        var updateCasterLuck = function(changeBy) {
            var value = Game.getCasterLuck() + changeBy;
            setCasterLuck(value);
        }

        var updateCasterMagic = function(changeBy) {
            var value = Game.getCasterMagic() + changeBy;
            setCasterMagic(value);
        }

        var updateCasterMind = function(changeBy) {
            var value = Game.getCasterMind() + changeBy;
            setCasterMind(value);
        }

        var updateCasterSpeed = function(changeBy) {
            var value = Game.getCasterSpeed() + changeBy;
            setCasterSpeed(value);
        }

        var updateRogueHealth = function(changeBy) {
            var value = Game.getRogueHealth() + changeBy;
            setRogueHealth(value);
        }

        var updateRogueStrength = function(changeBy) {
            var value = Game.getRogueStrength() + changeBy;
            setRogueStrength(value);
        }

        var updateRogueLevel = function(changeBy) {
            var value = Game.getRogueLevel() + changeBy;
            setRogueLevel(value);
        }

        var updateRogueLuck = function(changeBy) {
            var value = Game.getRogueLuck() + changeBy;
            setRogueLuck(value);
        }

        var updateRogueMagic = function(changeBy) {
            var value = Game.getRogueMagic() + changeBy;
            setRogueMagic(value);
        }

        var updateRogueMind = function(changeBy) {
            var value = Game.getRogueMind() + changeBy;
            setRogueMind(value);
        }

        var updateRogueSpeed = function(changeBy) {
            var value = Game.getRogueSpeed() + changeBy;
            setRogueSpeed(value);
        }

        //private methods:

        var handleLevelUpButtons = function() {
            if (Game.getExperiencePoints() >= Game.getWarriorLevelUpCost()) {
                $('.warrior-level-up').addClass('yes').removeClass('no');
            } else {
                $('.warrior-level-up').addClass('no').removeClass('yes');
            }
            if (Game.getExperiencePoints() >= Game.getCasterLevelUpCost()) {
                $('.caster-level-up').addClass('yes').removeClass('no');
            } else {
                $('.caster-level-up').addClass('no').removeClass('yes');
            }
            if (Game.getExperiencePoints() >= Game.getRogueLevelUpCost()) {
                $('.rogue-level-up').addClass('yes').removeClass('no');
            } else {
                $('.rogue-level-up').addClass('no').removeClass('yes');
            }
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
            setExp: setExp,
            updateExp: updateExp,
            setWarriorLevel: setWarriorLevel,
            setWarriorHealth : setWarriorHealth,
            setWarriorStrength : setWarriorStrength,
            setWarriorMagic : setWarriorMagic,
            setWarriorMind : setWarriorMind,
            setWarriorSpeed : setWarriorSpeed,
            setWarriorLuck : setWarriorLuck,
            setCasterMind : setCasterMind,
            setCasterSpeed : setCasterSpeed,
            setCasterLuck : setCasterLuck,
            setRogueMind : setRogueMind,
            setRogueSpeed : setRogueSpeed,
            setRogueLuck : setRogueLuck,
            updateWarriorLevel: updateWarriorLevel,
            updateWarriorHealth : updateWarriorHealth,
            updateWarriorStrength : updateWarriorStrength,
            updateWarriorMagic : updateWarriorMagic,
            updateWarriorMind : updateWarriorMind,
            updateWarriorSpeed : updateWarriorSpeed,
            updateWarriorLuck : updateWarriorLuck,
            setCasterLevel: setCasterLevel,
            setCasterHealth : setCasterHealth,
            setCasterStrength : setCasterStrength,
            setCasterMagic : setCasterMagic,
            updateCasterLevel: updateCasterLevel,
            updateCasterHealth : updateCasterHealth,
            updateCasterStrength : updateCasterStrength,
            updateCasterMagic : updateCasterMagic,
            updateCasterMind : updateCasterMind,
            updateCasterSpeed : updateCasterSpeed,
            updateCasterLuck : updateCasterLuck,
            setRogueLevel: setRogueLevel,
            setRogueHealth : setRogueHealth,
            setRogueStrength : setRogueStrength,
            setRogueMagic : setRogueMagic,
            updateRogueLevel: updateRogueLevel,
            updateRogueHealth : updateRogueHealth,
            updateRogueStrength : updateRogueStrength,
            updateRogueMagic : updateRogueMagic,
            updateRogueMind : updateRogueMind,
            updateRogueSpeed : updateRogueSpeed,
            updateRogueLuck : updateRogueLuck,

            levelUpWarrior: function() {
                if (Game.getExperiencePoints() >= Game.getWarriorLevelUpCost()) {
                    updateExp(-1 * Game.getWarriorLevelUpCost());
                    updateWarriorLevel(1);
                    updateWarriorHealth(Game.getHighTierStatIncrease(Game.getWarriorLevel()));
                    updateWarriorStrength(Game.getHighTierStatIncrease(Game.getWarriorLevel()));
                    updateWarriorMagic(Game.getLowTierStatIncrease(Game.getWarriorLevel));
                    updateWarriorMind(Game.getMidTierStatIncrease(Game.getWarriorLevel));
                    updateWarriorSpeed(Game.getLowTierStatIncrease(Game.getWarriorLevel));
                    updateWarriorLuck(Game.getMidTierStatIncrease(Game.getWarriorLevel));
                }
            },

            levelUpCaster: function() {
                if (Game.getExperiencePoints() >= Game.getCasterLevelUpCost()) {
                    updateExp(-1 * Game.getCasterLevelUpCost());
                    updateCasterLevel(1);
                    updateCasterHealth(Game.getHighTierStatIncrease(Game.getCasterLevel()));
                    updateCasterStrength(Game.getHighTierStatIncrease(Game.getCasterLevel()));
                    updateCasterMagic(Game.getLowTierStatIncrease(Game.getCasterLevel));
                    updateCasterMind(Game.getMidTierStatIncrease(Game.getCasterLevel));
                    updateCasterSpeed(Game.getLowTierStatIncrease(Game.getCasterLevel));
                    updateCasterLuck(Game.getMidTierStatIncrease(Game.getCasterLevel));
                }
            },

            levelUpRogue: function() {
                if (Game.getExperiencePoints() >= Game.getRogueLevelUpCost()) {
                    updateExp(-1 * Game.getRogueLevelUpCost());
                    updateRogueLevel(1);
                    updateRogueHealth(Game.getHighTierStatIncrease(Game.getRogueLevel()));
                    updateRogueStrength(Game.getHighTierStatIncrease(Game.getRogueLevel()));
                    updateRogueMagic(Game.getLowTierStatIncrease(Game.getRogueLevel));
                    updateRogueMind(Game.getMidTierStatIncrease(Game.getRogueLevel));
                    updateRogueSpeed(Game.getLowTierStatIncrease(Game.getRogueLevel));
                    updateRogueLuck(Game.getMidTierStatIncrease(Game.getRogueLevel));
                }
            }
        };

    }();

})(window, jQuery, Game.Utils);