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
            var output;
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

        var setNoSelectedQuest = function() {
            $('#selected-quest-panel').css('display', 'block');
            $('#no-selected-quest-panel').css('display', 'block');
            $('#selected-quest-title-zone').css('display', 'none');
            $('#init-selected-quest').removeClass("yes");
            $('#init-selected-quest').css('display', 'none');
            $('.selected-quest-stat').css('display', 'none');
            $('#selected-quest-image').attr("href", "");
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
            setNoSelectedQuest : setNoSelectedQuest,
            setSelectedQuest : setSelectedQuest,
            updateQuest : updateQuest,
            update : update
        }


    }();

})(window, jQuery, Data);

