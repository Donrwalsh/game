var bars = [
    {start: 0, end: 0, current: 0},
    {start: 0, end: 0, current: 0},
    {start: 0, end: 0, current: 0}
]
var baseUrl = $(location).attr('href');
var userId = baseUrl.substring($(location).attr('href').split('/', 3).join('/').length+1);
userId = userId == "" ? "0" : userId;

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
    const Url=baseUrl + 'bars?userId=' + userId;
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

    const Url2=baseUrl + 'completions?userId=' + userId;
    $.ajax({
        url: Url2,
        type:"GET",
        success: function(result){
            $('#completion-count').text(result.count);
        },
        error:function(error){
            console.log('Error ${error}')
        }
    });

    $(".bar").click(function() {
        var id = parseInt($(this).attr('id').charAt(3));
        if (!isBarActive(bars[id-1])) {
            const Url=baseUrl + 'begin';
                $.ajax({
                    url: Url,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        userId : userId,
                        barId : id
                    }),
                    dataType: "json",
                    success: function(result) {
                        registerBar(result);
                    },
                    error:function(error) {
                        console.log('Error ${error}')
                    }
                });
        }
        if (isBarComplete(bars[id-1])) {
            const Url=baseUrl + 'complete';
                $.ajax({
                    url: Url,
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            userId : userId,
                            barId : id
                        }),
                        dataType: "json",
                    success: function(result) {
                        completeBar(bars[id-1], id);
                        $('#completion-count').text(result.count);
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
}

function registerBar(progress) {
    bars[progress.barId-1].start = Date.parse(progress.startTime);
    bars[progress.barId-1].end = Date.parse(progress.endTime);
}

function isBarActive(bar) {
    return bar.start != 0 && bar.end != 0 && bar.current != 0;
}

function isBarComplete(bar) {
    return isBarActive(bar) && bar.end - Date.parse(new Date()) <= 0;
}

function completeBar(bar, i) {
    bar.end = 0;
    bar.start = 0;
    bar.current = 0;
    $("#bar"+(i)+"-progress").css("width", 0);
}
