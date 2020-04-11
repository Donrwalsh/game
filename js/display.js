(function(window, $, data) {

    var display = Display = function() {

        $questing = $('.questing');

        var addCollectionBox = function(num, collect) {
            var inner = getCollectIconById(collect);
            var yes = inner === "" ? "" : "yes";
            $('#collection-zone').append('<div class="collection-box ' + yes + '" data-id="' + num + '">' + inner + '</div>');
        }

        var addCollectionReward = function(position, quest) {
            $('.collection-box[data-id="' + position + '"]').addClass("yes").append(getCollectIconById(quest));
        }

        var formatNumber = function(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        var getCollectIconById = function(id) {
            var output = "";
            if (id === 1) {
                output = '<svg height="32px" width="32px"' +
                        'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                        '<image class="smol-img" href="img/rat.svg"/>' +
                        '</svg>';
            }
            return output;
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

        var addNotEnoughRoomMessage = function(id) {
            var message = '<span style="float:left;line-height:30px;padding-right:.5rem;">All backpacks are full, </span>';
            message += getCollectIconById(id);
            message += '<span style="padding-left:.5rem;line-height:30px;"> was lost :(</span>'
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

        var setSelectedQuest = function(quest) {
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
            initCollectionZone : initCollectionZone,
            initQuest : initQuest,
            setSelectedQuest : setSelectedQuest,
            updateQuest : updateQuest,
            update : update
        }


    }();

})(window, jQuery, Data);

