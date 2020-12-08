(function(window, $, data) {

    var display = Display = function() {

        $questing = $('.questing');

        var addCollectionBox = function(num, collect, rarity) {
            var inner = getCollectIconByIdAndRarity(collect, rarity);
            var yes = inner === "" ? "" : "yes";
            $('#collection-zone').append('<div class="collection-box ' + yes + '" data-id="' + num + '">' + inner + '</div>');
        }

        var addCollectionReward = function(position, quest, rarity) {
            $('.collection-box[data-id="' + position + '"]').addClass("yes").append(getCollectIconByIdAndRarity(quest, rarity));
        }

        var formatNumber = function(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        //Only cares about spider-cave map icons
        var getMapIconByPosition = function(position) {
            var quadrant;
            var viewBox;
            switch(position) {
                case 0:
                    quadrant = "top-left";
                    viewBox = "0 0"
                    break;
                case 1:
                    quadrant = "top-right";
                    viewBox = "32 0"
                    break;
                case 2:
                    quadrant = "bottom-left";
                    viewBox = "0 32"
                    break;
                case 3:
                    quadrant = "top-right";
                    viewBox = "32 32"
                    break;
            }
            var output = "";
            output = '<svg class="map-spider-cave ' + quadrant + '" viewBox="' + viewBox + ' 32 32" height="32px" width="32px"' +
                     'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                     '<image class="map-piece-image" href ="img/spider-cave.svg"/>' +
                     '</svg>';
            return output;
        }

        var getCollectIconByIdAndRarity = function(id, rarity) {
            var output = "";
            var rarityString = getRarityString(rarity);
            if (id === 1) {
                output = '<svg class= "smol-svg" height="32px" width="32px"' +
                        'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                        '<image class="smol-img" href="img/rat-' + rarityString + '.svg"/>' +
                        '</svg>';
            }
            return output;
        }

        var getRarityString = function(rarity) {
            var rarityString = "";
            switch(rarity) {
                case 1:
                    rarityString = "common";
                    break;
                case 2:
                    rarityString = "uncommon";
                    break;
                case 3:
                    rarityString = "rare";
                    break;
                case 4:
                    rarityString = "epic";
                    break;
                case 5:
                    rarityString = "legendary";
            }
            return rarityString;
        }

        var secondsToTime = function(secs)
        {
            secs = Math.round(secs);
            var hours = Math.floor(secs / (60 * 60));
        
            var divisor_for_minutes = secs % (60 * 60);
            var minutes = Math.floor(divisor_for_minutes / 60);
        
            var divisor_for_seconds = divisor_for_minutes % 60;
            var seconds = Math.ceil(divisor_for_seconds);
            if (seconds.toString().length == 1) {
                seconds = "0" + seconds;
            }
        
            var output = minutes + ":" + seconds;
            return output;
        };
        
        var addMessage = function(message) {
            $('#messages').append('<div class="message">' + message + '</div>');
        }

        var addNotEnoughRoomMessage = function(id, rarity) {
            var message = '<span class="split-message-left">All backpacks are full, </span>';
            message += getCollectIconByIdAndRarity(id, rarity);
            message += '<span class="split-message-right"> was lost :(</span>'
            addMessage(message);
        }

        var awaitingQuestCompletion = function() {
            $(".fa-clock", $questing).removeClass("fa-spin");
            $(".name", $questing).append(" Complete ");
            $questing.addClass("blinking");
            $questing.addClass("yes");
            $questing.removeClass("no");
        }

        var completeQuest = function(message) {
            addMessage(message);
            $(".quest-progress", $questing).animate({
                width: "0px",
            }, 1000);
        }

        var initCollectionZone = function() {
            console.log("init collection-zone")
        }

        var initQuest = function(progress, time, name) {
            $('.time', $questing).html(secondsToTime(time-progress));
            $('.name', $questing).html(name);
            $questing.css('visibility', 'visible');
            $questing.addClass('no');
            $questing.removeClass('yes');
            $(".quest-progress", $questing).css("width", (progress / time) * parseFloat($questing.css("width"),10) );
            $(".fa-clock", $questing).addClass("fa-spin");
            addMessage("Now questing in the " + name + ".");
        };

        var setNoSelectedGear = function() {
            $('#selected-gear-panel').css('display', 'none');
            $('#selected-gear-selected-upgrade').css('display', 'none');
            $('#selected-gear-upgrade-tree').css('display', 'none');
            $('#no-selected-gear-panel').css('display', 'block');
        }

        var setNoSelectedQuest = function() {
            $('#selected-quest-panel').css('display', 'block');
            $('#no-selected-quest-panel').css('display', 'block');
            $('#selected-quest-title-zone').css('display', 'none');
            $('#init-selected-quest').removeClass("yes");
            $('#init-selected-quest').css('display', 'none');
            $('.selected-quest-stat').css('display', 'none');
            $('#selected-quest-image').attr("href", "");
            $('#selected-quest-perks').css('display', 'none');
            $('#perks-list').empty();
        }

        var setSelectedQuestLoot = function(item) {
            var name = item.source.seen === 1 ? item.name : "??????";
            var path = item.source.seen === 1 ? item.path : item.getUnknownPath();
            $(item.getLootSelectorStub(), '.selected-quest-stat')
                .attr('src', path)
                .attr('alt', name);
            $(item.getLootSelectorStub() + '-tooltip-text').html(name);
        }

        var setNoSelectedUpgrade = function() {
            $('#deselect-upgrade').css('display', 'none');
            $('#selected-gear-upgrade-icon').empty();
            $('#selected-gear-upgrade-text').empty();
            $("#selected-gear-upgrade-cost").empty();
        }

        var setSelectedGear = function(gear) {
            $('#map-panel').css('display', 'none');
            $('#selected-quest-panel').css('display', 'none');
            $('#upgrade-panel').css('display', 'block');
            $('#selected-gear-selected-upgrade').css('display', 'block');
            setNoSelectedUpgrade();
            $('#selected-gear-upgrade-tree').css('display', 'block');
            $('.left-panel-select-option.map').removeClass('selected');
            $('.left-panel-select-option.quest').removeClass('selected');
            $('.left-panel-select-option.upgrade').addClass('selected');

            $('#selected-gear-panel').css('display', 'block');
            $('#selected-gear-panel').css('border', '3px solid ' + gear.color);
            $('#selected-gear-upgrade-tree').empty();
            $.each(gear.upgrades, function(i, node) {
                var id = 'tree-upgrade-' + node.id;
                //need to programatically determine the correct margin-left value.
                $('#selected-gear-upgrade-tree').append('<div class="container"><img id="' + id +'" src="' + node.image + '" class="tree-node" style="background-color:' + (node.unlocked ? gear.color : 'lightgrey') 
                   // Working here
                   + ';margin-left:262.5px;margin-top:"><div class="icon-text">' + node.imageText + '</div></div>')
                $('#' + id).click(function() {
                    setNoSelectedUpgrade();
                    $('#deselect-upgrade').css('display', 'block').click(function() { setNoSelectedUpgrade();});
                    $('#selected-gear-upgrade-icon').append('<div class="container"><img src="' + node.image + '" style="background-color:' + (node.unlocked ? gear.color : 'lightgrey') + ';"><div class="icon-text">' + node.imageText + '</div></div>');
                    $('#selected-gear-upgrade-text').append('<strong>' + node.title + '</strong><br><span class="upgrade-description">' + node.description + '</span>');
                    if (node.unlocked) {
                        $("#selected-gear-upgrade-cost").append('<strong>Already unlocked</strong>');    
                    } else {
                        $("#selected-gear-upgrade-cost").append('<strong>Cost: </strong>');
                        for (item in node.cost) {
                            $("#selected-gear-upgrade-cost").append('<img class="loot-icon ' + node.cost[item][0].getRarityString() + '-loot" src="' + node.cost[item][0].path + '" alt="something"><span>x' + node.cost[item][1] + '</span>');
                        }
                    }
                });
            });
            $('#selected-gear-upgrade-tree').css('border', '2px solid ' + gear.color);
            $('#no-selected-gear-panel').css('display', 'none');

            $('#selected-gear-image').attr("src", gear.img);
            $('#selected-gear-image').attr("alt", gear.name);
            $('#selected-gear-title').html(gear.name);
            $('#selected-gear-attributes').html(gear.getAttributeText());

        }

        var setSelectedQuest = function(quest) {
            $('#map-panel').css('display', 'none');
            $('.left-panel-select-option.map').removeClass('selected');
            $('.left-panel-select-option.quest').addClass('selected');

            $('#selected-quest-panel').css('display', 'block');
            $('#no-selected-quest-panel').css('display', 'none');
            $('#selected-quest-title-zone').css('display', 'block');
            $('#init-selected-quest').addClass("yes");
            $('#init-selected-quest').css('display', 'block');
            $('.selected-quest-stat').css('display', 'block');

            $('#selected-quest-image').attr("href", quest.img);
            $('#selected-quest-title').html(quest.name);
            $('.selected-quest-level').html(quest.getLevel());
            $('.selected-quest-time').html(secondsToTime(quest.getTime()));
            $('.selected-quest-exp-per-tick').html(quest.getExpPerTick());
            $('.selected-quest-risk').html(quest.risk);
            $('.selected-quest-challenge').html(quest.challenge);

            setSelectedQuestLoot(quest.uncommonItem);
            setSelectedQuestLoot(quest.rareItem);
            setSelectedQuestLoot(quest.epicItem);
            setSelectedQuestLoot(quest.legendaryItem);

            if (quest.getLevel() >= 10) {
                $('#selected-quest-perks').css('display', 'block');
                $('#perks-list').empty();
                var perks = quest.perks.slice().reverse();
                for (perk in perks) {
                    if (quest.getLevel() >= perks[perk].level) {
                        $('#perks-list').append(perks[perk].html);
                    }
                }
                $('#perks-title').css('display', 'inline-block');
            }
        }

        var updateItemsDisplay = function(item) {
            if (data.selected_quest.id === item.getZoneId()) {
                setSelectedQuestLoot(item);
            }
            if (data.items.rat_tail.seen) {
                $('#rat-tail-inventory').css('display', 'inline-block');
                $('.item-amount', '#rat-tail-inventory').html(data.items.rat_tail.amount);
                $('.item-max', '#rat-tail-inventory').html("/ " + data.items.rat_tail.max);
            }
            if (data.items.den_shroom.seen) {
                $('#den-shroom-inventory').css('display', 'inline-block');
                $('.item-amount', '#den-shroom-inventory').html(data.items.den_shroom.amount);
                $('.item-max', '#den-shroom-inventory').html("/ " + data.items.den_shroom.max);
            }
            if (data.items.rat_poison.seen) {
                $('#rat-poison-inventory').css('display', 'inline-block');
                $('.item-amount', '#rat-poison-inventory').html(data.items.rat_poison.amount);
                $('.item-max', '#rat-poison-inventory').html("/ " + data.items.rat_poison.max);
            }
            if (data.items.survival_quartz.seen) {
                $('#survival-quartz-inventory').css('display', 'inline-block');
                $('.item-amount', '#survival-quartz-inventory').html(data.items.survival_quartz.amount);
                $('.item-max', '#survival-quartz-inventory').html("/ " + data.items.survival_quartz.max);
            }
        }

        var updateQuest = function(progress, time) {
            $('.time', $questing).html(secondsToTime(time-progress));
            $(".quest-progress", $questing).css("width", (progress / time) * parseFloat($questing.css("width"),10) );
        }

        var update = function(selector, start, end) {
            var range = end - start;
            var current = start;
            var increment = range / 50;
            var counter = 0;
            var timer = setInterval(function() {
                counter++;
                current += increment;
                cleanCurrent = Math.ceil(current);
                $(selector).html(formatNumber(cleanCurrent));
                if (cleanCurrent == end || counter == 50) {
                    clearInterval(timer);
                    $(selector).html(formatNumber(end));
                }
            }, 1);
        };

        var obtainItemMessage = function(item, obtain) {
            var message = "It contained 1 " + item.name + " </span>" + item.getMessageIcon() + '<span class="split-message">';
            message += obtain ? " which was added to inventory!</span>" : ", but there wasn't enough inventory space.</span>";
            return message;
        }

        return {
            addCollectionBox : addCollectionBox,
            addCollectionReward : addCollectionReward,
            addMessage : addMessage,
            addNotEnoughRoomMessage : addNotEnoughRoomMessage,
            awaitingQuestCompletion : awaitingQuestCompletion,
            completeQuest : completeQuest,
            formatNumber : formatNumber,
            getCollectIconByIdAndRarity : getCollectIconByIdAndRarity,
            getMapIconByPosition : getMapIconByPosition,
            initCollectionZone : initCollectionZone,
            initQuest : initQuest,
            setNoSelectedGear : setNoSelectedGear,
            setSelectedGear : setSelectedGear,
            setNoSelectedQuest : setNoSelectedQuest,
            setSelectedQuest : setSelectedQuest,
            updateQuest : updateQuest,
            update : update,
            updateItemsDisplay : updateItemsDisplay,
            obtainItemMessage : obtainItemMessage
        }


    }();

})(window, jQuery, Data);

