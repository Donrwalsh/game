(function(window, $, utils, core) {

    var buttons = Game.Buttons = function() {

        $('.button-plus').click(function() {
            core.updateExp(30);
        });

        $('.button-minus').click(function() {
            core.updateExp(-1);
        });

        $('.warrior-level-up').click(function() {
            core.levelUpWarrior();
        });

        $('.caster-level-up').click(function() {
            core.levelUpCaster();
        });

        $('.rogue-level-up').click(function() {
            core.levelUpRogue();
        });

        $('.rat-den-quest').click(function() {
            var $questing = $('.questing.rat-den');
            console.log("now questing in the rat den");
            var startTime = 10;
            $('.time', '.rat-den').html(utils.secondsToTime(startTime));
            $questing.css('visibility', 'visible');
            $questing.addClass('no');
            $(".quest-progress", $questing).removeClass("progressReduce");
            $(".quest-progress", $questing).css("width", "0px");
            $(".fa-clock", $questing).addClass("fa-spin");
            var width = 0;
                var i = 0;
                var id = setInterval(frame, 100, startTime, parseInt($(".rat-den").css("width"),10));
                function frame(time) {
                    i++;
                    if (i % 10 == 0) {
                        time = time - i / 10;
                        $('.time', $questing).html(utils.secondsToTime(time));
                        core.updateExp(Game.getRatDenPerTickExp());
                    }
                    if (width >= 1) {
                        clearInterval(id);
                        $(".fa-clock", $questing).removeClass("fa-spin");
                        $(".name", $questing).html("Complete ");
                        $questing.addClass("blinking");
                        $questing.addClass("yes");
                        $questing.removeClass("no");
                    } else {
                        width = ((i*100)/(startTime*1000));
                        $(".quest-progress", $questing).css("width", width * parseInt($(".rat-den").css("width"),10) );
                    }
                }
        });

        $('.questing.rat-den').click(function() {
            if ($(this).hasClass('yes')) {
                console.log("collect");
            }
        })


    }();


})(window, jQuery, Game.Utils, Game.Core);