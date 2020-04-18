(function(window, $, data, display, char) {

    var items = Items = function() {

        class Item {
            constructor(id, name, source, rarity, path) {
                this.id = id;
                this.name = name;
                this.source = source;
                this.rarity = rarity;
                this.path = path;
            }

            getLootSelectorStub = function() {
                return '.' + getRarityString(this.rarity) + '-loot';
            }

            getMessageIcon() {
                return '<img class="loot-icon ' + getRarityString(this.rarity) + '-loot"' +
                    ' src="' + this.path + '" alt="' + this.name + '">';
            }

            getUnknownPath() {
                var path = "";
                switch(this.getZoneId()) {
                    case 1:
                        path = "img/loot/rat_den_unknown.png"
                        break;
                }
                return path;
            }

            getZoneId() {
                return Math.ceil(this.id/4);
            }

            init(amount, seen) {
                this.source.amount = amount;
                this.source.seen  = seen;
                display.updateItemsDisplay(this);
            }

            obtain = function() {
                this.source.seen = 1;
                this.source.amount += 1;
                display.updateItemsDisplay(this);
            }
        }

        var ratTail = new Item(1, "Rat Tail", data.items.rat_tail, 1, 'img/loot/rat_tail.png');
        var denShroom = new Item(2, "Den Shroom", data.items.den_shroom, 2, 'img/loot/den_shroom.png');
        var ratPoison = new Item(3, "Rat Poison", data.items.rat_poison, 3, 'img/loot/rat_poison.png');
        var survivalQuartz = new Item(4, "Survival Quartz", data.items.survival_quartz, 4, 'img/loot/survival_quartz.png');

        var getItemById = function(id) {
            var item;
            if (id === 1) item = ratTail;
            if (id === 2) item = denShroom;
            if (id === 3) item = ratPoison;
            if (id === 4) item = survivalQuartz;
            return item;
        }

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
                getItemById(i+1).init(items[i][0], items[i][1]);
            }
        }

        return {
            depleteCollectBox : depleteCollectBox,
            isCollectBoxFullById : isCollectBoxFullById,
            setCollectStorageCount : setCollectStorageCount,
            setInventory : setInventory,
            
            //Items
            ratTail : ratTail,
            denShroom : denShroom,
            ratPoison : ratPoison,
            survivalQuartz : survivalQuartz
        }

    }();

})(window, jQuery, Data, Display, Char);