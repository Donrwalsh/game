(function(window, $) {

    var game = Game = function() {

        var experience_points = 0;

        return {
            getExperiencePoints: function() {
                return experience_points;
            }
        };


    }();

})(window, jQuery);