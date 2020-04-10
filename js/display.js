(function(window, $, data) {

    var display = Display = function() {

        $questing = $('.questing');

        var formatNumber = function(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

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
        
        var awaitingQuestCompletion = function() {
            $(".fa-clock", $questing).removeClass("fa-spin");
            $(".name", $questing).append(" Complete ");
            $questing.addClass("blinking");
            $questing.addClass("yes");
            $questing.removeClass("no");
        }

        var completeQuest = function() {
            $(".quest-progress", $questing).animate({
                width: "0px",
            }, 1000);
        }

        var initQuest = function(progress, time, name) {
            $('.time', $questing).html(secondsToTime(time-progress));
            $('.name', $questing).html(name);
            $questing.css('visibility', 'visible');
            $questing.addClass('no');
            $questing.removeClass('yes');
            $(".quest-progress", $questing).css("width", (progress / time) * parseFloat($questing.css("width"),10) );
            $(".fa-clock", $questing).addClass("fa-spin");
        };

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
            awaitingQuestCompletion : awaitingQuestCompletion,
            completeQuest : completeQuest,
            initQuest : initQuest,
            updateQuest : updateQuest,
            update : update
        }


    }();

})(window, jQuery, Data);

