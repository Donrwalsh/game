(function(window, $, utils, core) {



    Game.HorizontalProgressBars = (function() {

        $('.button-plus').click(function() {
            core.updateExp(10000);
        });

        $('.button-minus').click(function() {
            core.updateExp(-10000);
        });

        var warriorTrainTime = 1;
        var rogueTrainTime = 6;
        var casterTrainTime = 6;
        $('.time', '.warrior-train').html(utils.secondsToTime(warriorTrainTime));
        $('.time', '.rogue-train').html(utils.secondsToTime(rogueTrainTime));
        $('.time', '.caster-train').html(utils.secondsToTime(casterTrainTime));

        $(".training").click(function() {
            var $training = $(this);
            var startTime;
            if ($training.hasClass("warrior-train")) {
                startTime = warriorTrainTime;
            } else if ($training.hasClass("rogue-train")) {
                startTime = rogueTrainTime;
            } else if ($training.hasClass("caster-train")) {
                startTime = casterTrainTime;
            }
            if ($(".train-progress", $training).css("width") == "240px") {
                // $(".train-progress", $training).css("width", 0);
                $training.removeClass("blinking");
                $(".name", $training).html("Train ");
                $(".train-progress", $training).addClass("progressReduce");
                $('.time', $training).html(utils.secondsToTime(startTime));
            } else if ($(".train-progress", $training).css("width") == "0px") {
                $(".train-progress", $training).removeClass("progressReduce");
                $(".train-progress", $training).css("width", "0px");
                $training.css("cursor", "default");
                $(".name", $training).html("Training ");
                $(".fa-clock", $training).addClass("fa-spin");
                var width = 0;
                var i = 0;
                var maxWidth = 240;
                var id = setInterval(frame, 100, startTime, maxWidth);
                function frame(time) {
                    i++;
                    if (i % 10 == 0) {
                        time = time - i / 10;
                        $('.time', $training).html(utils.secondsToTime(time));
                    }
                    if (width >= 1) {
                        clearInterval(id);
                        $(".fa-clock", $training).removeClass("fa-spin");
                        $(".name", $training).html("Complete ");
                        $training.addClass("blinking");
                        $training.css("cursor", "pointer");
                    } else {
                        width = ((i*100)/(startTime*1000));
                        $(".train-progress", $training).css("width", width * maxWidth );
                    }
                }
            }
        });

        var id = 0;

        return {
            next: function() {
                return id++;
            },

            reset: function() {
                id = 0;
            }

        };
    })();

})(window, jQuery, Game.Utils, Game.Core);