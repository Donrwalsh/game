(function(window, $, data, display, char) {

    var items = Items = function() {

        class Item {
            constructor(name, source, rarity, path) {
                this.name = name;
                this.source = source;
                this.rarity = rarity;
                this.path = path;
            }

            obtain = function() {
                this.source.seen = 1;
                this.source.amount += 1;
                display.updateItemsDisplay();
            }

            getMessageIcon() {
                return '<img class="loot-icon ' + getRarityString(this.rarity) + '-loot"' +
                    ' src="' + this.path + '" alt="' + this.name + '">';
            }
        }

        var ratPoison = new Item("Rat Poison", data.items.rat_poison, 3, 'img/loot/rat_poison.png');

        var getRarityString = function(rarity) {
            var string;
            if (rarity === 1) {string = "uncommon"}
            if (rarity === 2) {string = "rare"}
            if (rarity === 3) {string = "epic"}
            if (rarity === 4) {string = "legendary"}
            return string;
        }

        var depleteCollectBox = function(id) {
            data.storage.collect[id] = 0;
            data.storage.collectRarity[id] = 0;
            $('.collection-box[data-id="' + id + '"]').removeClass("yes").empty();
        }

        var isCollectBoxFullById = function(id) {
            return data.storage.collect[id] != 0;
        }

        var setCollectStorageCount = function(count, collect, collectRarity) {
            data.storage.count = count;
            data.storage.collect = collect;
            data.storage.collectRarity = collectRarity;
            for (i = 0; i < count; i++) {
                display.addCollectionBox(i, collect[i], collectRarity[i]);
            }
        }

        var setInventory = function(items) {
            for (var i=0; i < items.length; i++) {
                switch(i) {
                    case 0:
                        data.items.rat_tail.amount = items[i][0];
                        data.items.rat_tail.seen  = items[i][1];
                        break;
                    case 1:
                        data.items.den_shroom.amount = items[i][0];
                        data.items.den_shroom.seen  = items[i][1];
                        break;
                    case 2:
                        data.items.rat_poison.amount = items[i][0];
                        data.items.rat_poison.seen  = items[i][1];
                        break;
                    case 3:
                        data.items.survival_quartz.amount = items[i][0];
                        data.items.survival_quartz.seen  = items[i][1];
                        break;
                }
            }
            display.updateItemsDisplay();
        }

        return {
            depleteCollectBox : depleteCollectBox,
            isCollectBoxFullById : isCollectBoxFullById,
            setCollectStorageCount : setCollectStorageCount,
            setInventory : setInventory,
            ratPoison : ratPoison
        }

    }();

})(window, jQuery, Data, Display, Char);