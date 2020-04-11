(function(window, $, data, display, char) {

    var items = Items = function() {

        setCollectStorageCount = function(count, collect) {
            data.storage.count = count;
            data.storage.collect = collect;
            for (i = 0; i < count; i++) {
                display.addCollectionBox(i, collect[i]);
            }
        }

        return {
            setCollectStorageCount : setCollectStorageCount
        }

    }();

})(window, jQuery, Data, Display, Char);