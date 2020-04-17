(function(window, $, data, display, char, items) {

    var quests = Quests = function() {

        /**
         * Randomly shuffle an array
         * https://stackoverflow.com/a/2450976/1293256
         * @param  {Array} array The array to shuffle
         * @return {String}      The first item in the shuffled array
         */
        var shuffle = function (array) {

            var currentIndex = array.length;
            var temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;

        };

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
                }
            });
        }

        var obtainMapPiece = function(position) {
            this.source.map_pieces[position] = 1;
            setMapPieces(this.source.map_pieces);
        }

        var ratDenCollect = function(rarity) {
            console.log(data.selected_quest);
            var message = '<span class="split-message">Collected </span>' + display.getCollectIconByIdAndRarity(1, rarity);
            message += '<span class="split-message">: ';
            if (rarity == 1) { //common
                var levelUpDepleteModifier = this.source.level > 1000 ? 1 : (this.source.level + 1) / 1000;
                var roll = Math.random();
                console.log(roll);
                if (roll > .995) {
                    if (this.mapPiecesAvailable()) {
                        var array = shuffle([0, 1, 2, 3]);
                        for (var i = 0; i < array.length; i++) {
                            if (this.source.map_pieces[array[i]] === 0) {
                                this.obtainMapPiece(array[i]);
                                message += "It contained a map piece</span>" + display.getMapIconByPosition(array[i]) + '<span class="split-message">!</span>';
                                break;
                            }
                        }
                    } else {
                        this.epicItem.obtain();
                        message += "It contained 1 " + this.epicItem.name + " </span>" + this.epicItem.getMessageIcon() + '<span class="split-message">!</span>';
                    }
                } else if (roll > .99) {
                    this.epicItem.obtain();
                    message += "It contained 1 " + this.epicItem.name + " </span>" + this.epicItem.getMessageIcon() + '<span class="split-message">!</span>';
                } else if (roll > .96) {
                    this.rareItem.obtain();
                    message += "It contained 1 " + this.rareItem.name + " </span>" + this.rareItem.getMessageIcon() + '<span class="split-message">!</span>';
                } else if (roll > .91) {
                    this.uncommonItem.obtain();
                    message += "It contained 1 " + this.uncommonItem.name + " </span>" + this.uncommonItem.getMessageIcon() + '<span class="split-message">!</span>';
                } else if (roll > .45 + (.4 * levelUpDepleteModifier)) {
                    this.levelUp(1);
                    message += 'Rat Den level increased by 1!</span>'
                } else {
                    var exp = Math.ceil(Math.random() * 9) + 1;
                    char.updateExp(exp);
                    message += 'It contained ' + exp + ' experience points!</span>';
                }
            }
            display.addMessage(message);
        }

        var levelUp = function(amount) {
            this.source.level += amount;
            if (data.selected_quest.id === this.id) {
                console.log("hello there");
                display.setSelectedQuest(this);
            }
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
            var challengeValue = ((stat - challengeStat) / (1 + Math.abs(stat - challengeStat)) + .99) / 2;
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
            var tickExp = 1;
            if (this.getLevel() >= 20) tickExp++;
            if (this.getLevel() >= 40) tickExp++;
            if (this.getLevel() >= 60) tickExp++;
            if (this.getLevel() >= 80) tickExp++;
            if (this.getLevel() >= 100) tickExp++;
            return tickExp;
        }

        var getSpiderCaveTickExp = function() {
            return 5;
        }

        var getRatDenTime = function() {
            var time = 60;
            if (this.getLevel() >= 10) time--;
            if (this.getLevel() >= 30) time--;
            if (this.getLevel() >= 50) time--;
            if (this.getLevel() >= 70) time--;
            if (this.getLevel() >= 90) time--;
            return time;
        }

        var getSpiderCaveTime = function() {
            return 600;
        }

        var initSelectedQuest = function() {
            var quest = getQuestById(data.selected_quest.id);
            quest.beginQuest(0, quest.getTime());
        }

        var mapPiecesAvailable = function() {
            var result = false;
            for (var i = 0; i < this.source.map_pieces.length; i++) {
                if (this.source.map_pieces[i] === 0) {
                    result = true;
                }
            }
            return result;
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
            if (roll > .99) {
                rarity = 5;
            } else if (roll > .9) {
                rarity = 4;
            } else if (roll > .75) {
                rarity = 3;
            } else if (roll > .5) {
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

        //Currently only cares about rat-den map pieces
        var setMapPieces = function(pieces) {
            data.rat_den.map_pieces = pieces;
            for (var i = 0; i < pieces.length; i++) {
                var position = ['top-left', 'top-right', 'bottom-left', 'bottom-right'][i]
                if (pieces[i] === 1) {
                    $('image', '.map-spider-cave.' + position).attr("href", "img/spider-cave.svg")
                }
            }
            if (data.rat_den.map_pieces === [1,1,1,1]) {
                console.log("make spider-cave clickable");
            }
        }

        var setSelected = function(id) {
            if (id === null) {
                id = data.selected_quest.id;
            } else {
                data.selected_quest.id = id;
            }
            if (id === 0) {
                display.setNoSelectedQuest();
            } else {
                quest = getQuestById(id);
                display.setSelectedQuest(quest);
            }
        }

        var ratDen = {
            name : 'Rat Den',
            img : 'img/rat.svg',
            risk : 'None',
            challenge : '<i class="fas fa-fist-raised"></i>, <i class="fas fa-heartbeat"></i>, <i class="fas fa-scroll"></i>, <i class="fas fa-hat-wizard"></i>, <i class="fas fa-bolt"></i> or <i class="fas fa-dice-d20"></i>',
            id : 1,
            perks : [
                { level : 10,  html : '<div class="perks-level">Level 10</div><div class="perks-description time-perk"><i class="far fa-clock"></i> -1 second</div>'},
                { level : 20,  html : '<div class="perks-level">Level 20</div><div class="perks-description exp-perk">+1 Exp/second</div>'},
                { level : 30,  html : '<div class="perks-level">Level 30</div><div class="perks-description time-perk"><i class="far fa-clock"></i> -1 second</div>'},
                { level : 40,  html : '<div class="perks-level">Level 40</div><div class="perks-description exp-perk">+1 Exp/second</div>'},
                { level : 50,  html : '<div class="perks-level">Level 50</div><div class="perks-description time-perk"><i class="far fa-clock"></i> -1 second</div>'},
                { level : 60,  html : '<div class="perks-level">Level 60</div><div class="perks-description exp-perk">+1 Exp/second</div>'},
                { level : 70,  html : '<div class="perks-level">Level 70</div><div class="perks-description time-perk"><i class="far fa-clock"></i> -1 second</div>'},
                { level : 80,  html : '<div class="perks-level">Level 80</div><div class="perks-description exp-perk">+1 Exp/second</div>'},
                { level : 90,  html : '<div class="perks-level">Level 90</div><div class="perks-description time-perk"><i class="far fa-clock"></i> -1 second</div>'},
                { level : 100,  html : '<div class="perks-level">Level 100</div><div class="perks-description exp-perk">+1 Exp/second</div>'},
            ],
            source : data.rat_den,
            beginQuest : beginQuest,
            uncommonItem : items.ratTail,
            rareItem : items.denShroom,
            epicItem : items.ratPoison,
            legendaryItem : items.survivalQuartz,
            collect: ratDenCollect,
            completeQuest : completeRatDenQuest,
            getExpPerTick : getRatDenTickExp,
            getLevel : getLevel,
            getTime : getRatDenTime,
            levelUp : levelUp,
            questReward : ratDenQuestReward,
            rollRarity : ratDenRollRarity,
            mapPiecesAvailable : mapPiecesAvailable,
            obtainMapPiece : obtainMapPiece
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
            setMapPieces : setMapPieces,
            setSelected : setSelected
        }

    }();

})(window, jQuery, Data, Display, Char, Items);