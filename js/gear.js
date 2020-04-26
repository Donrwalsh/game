(function(window, $, data, display, char, items) {

    var gear = Gear = function() {

        class gearPiece {
            constructor(id, name, img, color) {
                this.id = id;
                this.name = name;
                this.img = img;
                this.color = color;
            }

            getAttributeText = function() {
                // return "Storage Capacity +3 for : " + items.ratTail.getMessageIcon() + "<br>Storage Capacity +1 for all other items."
                return "Storage Capacity +1 for all items."
            }
        }

        var warriorPouch = new gearPiece(1, "Pouch", "img/gear/pouch.png", "red");

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
                console.log(id);
                display.setSelectedGear(gear);
            }
        }

        var getGearById = function(id) {
            var gearPiece;
            if (id === 1) { gearPiece = warriorPouch}
            return gearPiece;
        }

        return {
            setSelected : setSelected
        }

    }();

})(window, jQuery, Data, Display, Char, Items);