var bars = [
    {start: 0, end: 0, current: 0},
    {start: 0, end: 0, current: 0},
    {start: 0, end: 0, current: 0}
]
//Primary Loop
setInterval(function() {
    for (var i = 0; i < bars.length; i++) {
        if (bars[i].start != 0 && bars[i].end != 0) {
            bars[i].current = Date.now();
            var barWidth = parseFloat($("#bar"+(i+1)).css("width"));
            var width = ((bars[i].current - bars[i].start) / (bars[i].end - bars[i].start)) * barWidth;
            width = width > barWidth ? barWidth : width;
            $("#bar"+(i+1)+"-progress").css("width", width);
        }
    }
}, 100);

$(document).ready(function(){
    const Url='http://localhost:8080/bars';
    $.ajax({
        url: Url,
        type:"GET",
        success: function(result){
            initPage(result);
        },
        error:function(error){
            console.log('Error ${error}')
        }
    });

    $(".bar").click(function() {
        var id = parseInt($(this).attr('id').charAt(3));
        if (!isBarActive(bars[id-1])) {
            const Url='http://localhost:8080/start?barId=' +id;
                $.ajax({
                    url: Url,
                    type: "GET",
                    success: function(result) {
                        registerBar(result);
                    },
                    error:function(error) {
                        console.log('Error ${error}')
                    }
                });
        }
    });
});

function initPage(result) {
    for (var i = 0; i < result.length; i++) {
        registerBar(result[i]);
    }
    console.log(bars);
}

function registerBar(progress) {
    bars[progress.barId-1].start = Date.parse(progress.startTime);
    bars[progress.barId-1].end = Date.parse(progress.endTime);
}

function isBarActive(bar) {
    return bar.start != 0 && bar.end != 0 && bar.current != 0;
}
