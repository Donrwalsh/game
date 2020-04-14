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

        return {
            depleteCollectBox : depleteCollectBox,
            isCollectBoxFullById : isCollectBoxFullById,
            setCollectStorageCount : setCollectStorageCount
        }

    }();

})(window, jQuery, Data, Display, Char);