(function(window, $, data, display, char, items) {

    var gear = Gear = function() {

        class upgrade {
            constructor(id, title, description, image, imageText, gridLocation, cost, unlocked) {
                this.id = id;
                this.title = title;
                this.description = description;
                this.image = image;
                this.imageText = imageText;
                this.gridLocation = gridLocation;
                this.cost = cost;
                this.unlocked = unlocked;
            }
        }

        class gearPiece {
            constructor(id, name, img, color, upgrades) {
                this.id = id;
                this.name = name;
                this.img = img;
                this.color = color;
                this.upgrades = upgrades;
            }

            getAttributeText = function() {
                // return "Storage Capacity +3 for : " + items.ratTail.getMessageIcon() + "<br>Storage Capacity +1 for all other items."
                return "Storage Capacity +1 for all items."
            }
        }

        var unlockPouch = new upgrade(1, "Unlock Pouch", "Storage Capacity +1 for all items.", "img/gear/pouch.png", '', 3, [], true)
        var ratTailThree = new upgrade(2, "Rat Tail Storage III", "Storage Capacity +300 for " + items.ratTail.getMessageIcon() + '.', "img/loot/rat_tail.png", "III", 1, [[items.ratTail, 99]], false);
        var warriorPouch = new gearPiece(1, "Pouch", "img/gear/pouch.png", "red", [unlockPouch, ratTailThree]);

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