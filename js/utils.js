(function(window, $) {

    var utils = Game.Utils = function() {
        
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

        return {
            secondsToTime : secondsToTime
        };

    }();

})(window, jQuery);