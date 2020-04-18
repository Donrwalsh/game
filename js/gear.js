(function(window, $, data, display, char, items) {

    var gear = Gear = function() {

        var setSelected = function(id) {
            if (id === null) {
                id = data.selected_gear.id;
            } else {
                data.selected_gear.id = id;
            }
            if (id === 0) {
                display.setNoSelectedGear();
            } else {
                gear = getGearById(id);
                display.setSelectedGear(gear);
            }
        }

        return {
            setSelected : setSelected
        }

    }();

})(window, jQuery, Data, Display, Char, Items);