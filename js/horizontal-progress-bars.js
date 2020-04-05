var app = (function() {

    function secondsToTime(secs)
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
    }

    var warriorTrainTime = 600;
    var rogueTrainTime = 600;
    var casterTrainTime = 600;
    $('.time', '.warrior-train').html(secondsToTime(warriorTrainTime));
    $('.time', '.rogue-train').html(secondsToTime(rogueTrainTime));
    $('.time', '.caster-train').html(secondsToTime(casterTrainTime));

    $(".training").click(function() {
        var $training = $(this);
        if ($(".train-progress", $training).css("width") == "240px") {
            // $(".train-progress", $training).css("width", 0);
            $(".time", $training).removeClass("blinking");
            $(".name", $training).html("Train ");
            $(".train-progress", $training).addClass("progressReduce");
        } else if ($(".train-progress", $training).css("width") == "0px") {
            $(".train-progress", $training).removeClass("progressReduce");
            $(".train-progress", $training).css("width", "0px");
            $training.css("cursor", "default");
            $(".name", $training).html("Training ");
            $(".fa-clock", $training).addClass("fa-spin");
            var width = 0;
            var i = 0;
            var startTime;
            if ($training.hasClass("warrior-train")) {
                startTime = warriorTrainTime;
            } else if ($training.hasClass("rogue-train")) {
                startTime = rogueTrainTime;
            } else if ($training.hasClass("caster-train")) {
                startTime = casterTrainTime;
            }
            var maxWidth = 240;
            var id = setInterval(frame, 100, startTime, maxWidth);
            function frame(time) {
                i++;
                if (i % 10 == 0) {
                    time = time - i / 10;
                    $('.time', $training).html(secondsToTime(time));
                }
                if (width >= 1) {
                    clearInterval(id);
                    $(".fa-clock", $training).removeClass("fa-spin");
                    $(".name", $training).html("Complete ");
                    $(".time", $training).addClass("blinking");
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



console.log(
    app.next(),
    app.next(),
    app.reset(),
    app.next()
)