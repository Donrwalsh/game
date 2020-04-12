(function(window, $, data, display, char) {

    var items = Items = function() {

        setCollectStorageCount = function(count, collect, collectRarity) {
            data.storage.count = count;
            data.storage.collect = collect;
            data.storage.collectRarity = collectRarity;
            for (i = 0; i < count; i++) {
                display.addCollectionBox(i, collect[i], collectRarity[i]);
            }
        }

        return {
            setCollectStorageCount : setCollectStorageCount
        }

    }();

})(window, jQuery, Data, Display, Char);