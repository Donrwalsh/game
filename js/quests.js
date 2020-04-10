(function(window, $, data, display, char) {

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

        var completeRatDenQuest = function() {
            console.log("complete rat den quest");
            var stat;
            switch(Math.floor(Math.random() * 6) + 1) {
                case 1:
                    stat = char.warrior.getStrength() + char.caster.getStrength() + char.rogue.getStrength();
                    break;
                case 2:
                    stat = char.warrior.getHealth() + char.caster.getHealth() + char.rogue.getHealth();
                    break;
                case 3:
                    stat = char.warrior.getMagic() + char.caster.getMagic() + char.rogue.getMagic();
                    break;
                case 4:
                    stat = char.warrior.getMind() + char.caster.getMind() + char.rogue.getMind();
                    break;
                case 5:
                    stat = char.warrior.getSpeed() + char.caster.getSpeed() + char.rogue.getSpeed();
                    break;
                case 6:
                    stat = char.warrior.getLuck() + char.caster.getLuck() + char.rogue.getLuck();
                    break;
            }
            var challengeStat = 5;
            var challengeValue = ((stat - challengeStat) / (1 + Math.abs(stat - challengeStat)) + .9) / 2;
            var roll = Math.random();
            if (roll < challengeValue) {
                console.log("win!");
            } else {
                console.log("lose :(");
            }
            display.completeQuest();
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
            return 5;
        }

        var getSpiderCaveTime = function() {
            return 600;
        }

        var setActiveQuest = function(id, progress, time) {
            quest = getQuestById(id);
            quest.beginQuest(progress, time);
        }

        var ratDen = {
            name : 'Rat Den',
            id : 1,
            source : data.rat_den,
            beginQuest : beginQuest,
            completeQuest : completeRatDenQuest,
            getExpPerTick : getRatDenTickExp,
            getLevel : getLevel,
            getTime : getRatDenTime,
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
            setActiveQuest : setActiveQuest
        }

    }();

})(window, jQuery, Data, Display, Char);