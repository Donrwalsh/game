(function(window, $, data, display, char) {

    var items = Items = function() {

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
            setInventory : setInventory
        }

    }();

})(window, jQuery, Data, Display, Char);