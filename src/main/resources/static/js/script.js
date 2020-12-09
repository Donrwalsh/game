var bars = [
    {target: -1, current: -1},
    {target: -1, current: -1},
    {target: -1, current: -1}
]
var baseUrl = $(location).attr('href').substring(0, $(location).attr('href').split('/', 3).join('/').length+1);
var userId = $(location).attr('href').substring($(location).attr('href').split('/', 3).join('/').length+1);
userId = userId == "" ? "0" : userId;
var diagCount = 0;
var offset = 0;

//Primary Loop
setInterval(function() {
    for (var i = 0; i < bars.length; i++) {
        $('#diag-' + (i+1) + '-1').text(bars[i].current);
        $('#diag-' + (i+1) + '-2').text(bars[i].target);

        if (isBarActive(bars[i])) {
            bars[i].current = bars[i].current < bars[i].target ? bars[i].current + 1 : bars[i].current;
            var barWidth = parseFloat($("#bar"+(i+1)).css("width"));
            var width = (bars[i].current / bars[i].target) * barWidth;
            width = width > barWidth ? barWidth : width;
            $("#bar"+(i+1)+"-progress").css("width", width);
        }
    }
}, 100);

$(document).ready(function(){
    $.ajax({
        url: baseUrl+ 'heartbeat/time',
        type: "GET",
        success: function(result) {
            offset = Date.parse(result) - Date.now();
            console.log(offset);
            $('.offset').text((offset/1000 + ' second offset'));
        }
    });

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
        var log = false;
        diagCount++;
        var diagNow = Date.now();
        var diag = "<div><span class='col-2'>bar " + id + " clicked</span><span class='col-2'>" + diagNow + "</span>";
        if (!isBarActive(bars[id-1])) {
            log = true;
            diag = diag + "<span class='col-2'>client | server</span><span class='col-2 server-" + diagCount + "'></span>";
            diag = diag + "<span class='col-2'>difference:</span><span class='col-2 diff-" + diagCount + "'></span>";
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
                        $('.server-' + diagCount).text(Date.parse(result.startTime));
                        $('.diff-' + diagCount).text(diagNow - Date.parse(result.startTime));
                    },
                    error:function(error) {
                        console.log('Error ${error}')
                    }
                });
        } else if (isBarComplete(bars[id-1])) {
            diag = diag + "<span class='col-2'>complete</span>";
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
        } else {
            diag = diag + "<span class='col-2'>none</span>";
        }
        diag = diag + "</div>"
        if (log) {
            $('.diagnostic').append(diag);
        }
    });
});

function initPage(result) {
    for (var i = 0; i < result.length; i++) {
        registerBar(result[i]);
    }
}

function registerBar(progress) {
    var start = Date.parse(progress.startTime);
    var end = Date.parse(progress.endTime);

    var target = (end - start)/100;
    var current = Math.round((Date.now() + offset - start)/100);
    current = current > target ? target : current;
    current = current < 0 ? 0 : current;

    bars[progress.barId-1].target = target;
    bars[progress.barId-1].current = current;
}

function isBarActive(bar) {
    return bar.current != -1 && bar.target != -1;
}

function isBarComplete(bar) {
    return isBarActive(bar) && bar.target == bar.current;
}

function completeBar(bar, i) {
    bar.current = -1;
    bar.target = -1;
    $("#bar"+(i)+"-progress").css("width", 0);
}
