(function(window, $, data, display, char, items) {

    var quests = Quests = function() {

        beginQuest = function(progress, time) {
            if (data.active_quest.id != this.id 
                && (data.active_quest.id == 0 || data.active_quest.progress != data.active_quest.time)) {
                progress = progress == null ? 0 : progress;
                time = time == null ? this.getTime() : time;
                var expPerTick = this.getExpPerTick();
                var idCheck = this.id;
                data.active_quest.id = this.id;
                data.active_quest.running = true;
                data.active_quest.progress = progress;
                data.active_quest.time = time;

                display.initQuest(progress, time, this.name);

                var counter = 0;
                var questing = setInterval(function() {
                    if (data.active_quest.id != idCheck) {
                        clearInterval(questing);
                    }
                    counter++;
                    if ( counter % 100 == 0) {
                        progress++;
                        data.active_quest.progress++;
                        char.updateExp(expPerTick);
                    }
                    display.updateQuest(progress + (counter % 100)/100, time);
                    if (time == progress) {
                        clearInterval(questing);
                        finishQuest();
                    }
                }, 10);
            }
        }

        var bindCollectBoxClicks = function() {
            $('.collection-box').unbind();
            $('.collection-box').click(function() {
                if (items.isCollectBoxFullById($(this).data('id'))) {
                    var id = data.storage.collect[$(this).data('id')];
                    var rarity = data.storage.collectRarity[$(this).data('id')];
                    getQuestById(id).collect(rarity);
                    items.depleteCollectBox($(this).data('id'));
                } else {
                    console.log("do not collect");
                }
            })
        }

        var ratDenCollect = function(rarity) {
            var message = '<span class="split-message-left">Collected </span>' + display.getCollectIconByIdAndRarity(1, rarity);
            message += '<span class="split-message-right">: ';
            if (rarity == 1) { //common
                var exp = Math.ceil(Math.random() * 9) + 1;
                char.updateExp(exp);
                message += 'It contained ' + exp + ' experience points!';
                display.addMessage(message);
            }
            console.log("rat den collect rarity " + rarity);
        }

        var completeRatDenQuest = function() {
            //TODO: encountering things other than just a normal rat
            var message = "While questing in the Rat Den, our heroes encountered a rat! Faced a "
            var stat;
            switch(Math.floor(Math.random() * 6) + 1) {
                case 1:
                    stat = char.warrior.getStrength() + char.caster.getStrength() + char.rogue.getStrength();
                    message += '<i class="fas fa-fist-raised"></i>';
                    break;
                case 2:
                    stat = char.warrior.getHealth() + char.caster.getHealth() + char.rogue.getHealth();
                    message += '<i class="fas fa-heartbeat"></i>';
                    break;
                case 3:
                    stat = char.warrior.getMagic() + char.caster.getMagic() + char.rogue.getMagic();
                    message += '<i class="fas fa-scroll"></i>';
                    break;
                case 4:
                    stat = char.warrior.getMind() + char.caster.getMind() + char.rogue.getMind();
                    message += '<i class="fas fa-hat-wizard"></i>';
                    break;
                case 5:
                    stat = char.warrior.getSpeed() + char.caster.getSpeed() + char.rogue.getSpeed();
                    message += '<i class="fas fa-bolt"></i>';
                    break;
                case 6:
                    stat = char.warrior.getLuck() + char.caster.getLuck() + char.rogue.getLuck();
                    message += '<i class="fas fa-dice-d20"></i>';
                    break;
            }
            var challengeStat = 5;
            var challengeValue = ((stat - challengeStat) / (1 + Math.abs(stat - challengeStat)) + .9) / 2;
            var roll = Math.random();
            message += " challenge and ";
            if (roll < challengeValue) {
                message += "won!";
                this.questReward();
            } else {
                message += "lost.";
            }
            display.completeQuest(message);
            data.active_quest.id = 0;
            setTimeout( () => this.beginQuest(0, this.getTime()), 1000);
        }

        var completeSpiderCaveQuest = function() {
            console.log("complete spider cave quest");
        }

        var finishQuest = function() {
            //Case when there is no auto-collect:
            display.awaitingQuestCompletion();
            $('.questing').click(function() {
                getQuestById(data.active_quest.id).completeQuest();
                $('.questing').unbind();
            })
        }

        var getLevel = function() {
            return this.source.level;
        }

        var getQuestById = function(id) {
            var quest;
            if (id == 1) {quest = ratDen};
            if (id == 2) {quest = spiderCave};
            return quest;
        }

        var getRatDenTickExp = function() {
            return 1;
        }

        var getSpiderCaveTickExp = function() {
            return 5;
        }

        var getRatDenTime = function() {
            return 60;
        }

        var getSpiderCaveTime = function() {
            return 600;
        }

        var initSelectedQuest = function() {
            var quest = getQuestById(data.selected_quest.id);
            quest.beginQuest(0, quest.getTime());
        }

        //TODO: consider generalizing this method
        var ratDenQuestReward = function() {
            for (var i = 0; i < data.storage.collect.length+1; i++) {
                var rarity = this.rollRarity();
                if (i === data.storage.collect.length) {
                    display.addNotEnoughRoomMessage(1, rarity);
                } else if (data.storage.collect[i] == 0) {
                    data.storage.collect[i] = 1;
                    data.storage.collectRarity[i] = rarity;
                    display.addCollectionReward(i, 1, rarity);
                    break;
                }
            }
        }

        var ratDenRollRarity = function() {
            var roll = Math.random();
            var rarity = 0;
            if (roll >= .99) {
                rarity = 5;
            } else if (roll >= .9) {
                rarity = 4;
            } else if (roll >= .75) {
                rarity = 3;
            } else if (roll >= .5) {
                rarity = 2;
            } else {
                rarity = 1;
            }
            return rarity;
        }

        var setActiveQuest = function(id, progress, time) {
            quest = getQuestById(id);
            quest.beginQuest(progress, time);
        }

        var setSelected = function(id) {
            data.selected_quest.id = id;
            quest = getQuestById(id);
            display.setSelectedQuest(quest);
        }

        var ratDen = {
            name : 'Rat Den',
            img : 'img/rat.svg',
            risk : 'None',
            challenge : '<i class="fas fa-fist-raised"></i>, <i class="fas fa-heartbeat"></i>, <i class="fas fa-scroll"></i>, <i class="fas fa-hat-wizard"></i>, <i class="fas fa-bolt"></i> or <i class="fas fa-dice-d20"></i>',
            id : 1,
            source : data.rat_den,
            beginQuest : beginQuest,
            collect: ratDenCollect,
            completeQuest : completeRatDenQuest,
            getExpPerTick : getRatDenTickExp,
            getLevel : getLevel,
            getTime : getRatDenTime,
            questReward : ratDenQuestReward,
            rollRarity : ratDenRollRarity
        }

        var spiderCave = {
            name : 'Spider Cave',
            id : 2,
            source : data.spider_cave,
            beginQuest : beginQuest,
            completeQuest : completeSpiderCaveQuest,
            getExpPerTick : getSpiderCaveTickExp,
            getLevel : getLevel,
            getTime : getSpiderCaveTime
        }

        return {
            ratDen : ratDen,
            spiderCave : spiderCave,
            bindCollectBoxClicks : bindCollectBoxClicks,
            initSelectedQuest : initSelectedQuest,
            setActiveQuest : setActiveQuest,
            setSelected : setSelected
        }

    }();

})(window, jQuery, Data, Display, Char, Items);