var progress_bars = [
        {target: -1, current: -1},
        {target: -1, current: -1},
        {target: -1, current: -1}
    ]
var barDetails;

var baseUrl = $(location).attr('href').substring(0, $(location).attr('href').split('/', 3).join('/').length+1);
var userId = $(location).attr('href').substring($(location).attr('href').split('/', 4).join('/').length+1);
userId = userId == "" ? "0" : userId;
var diagCount = 0;
var offset = 0;

//Primary Loop
setInterval(function() {
    for (var i = 0; i < progress_bars.length; i++) {
        $('#diag-' + (i+1) + '-1').text(progress_bars[i].current);
        $('#diag-' + (i+1) + '-2').text(progress_bars[i].target);

        if (isBarActive(progress_bars[i])) {
            progress_bars[i].current = progress_bars[i].current < progress_bars[i].target ? progress_bars[i].current + 1 : progress_bars[i].current;
            var barWidth = parseFloat($("#bar"+(i+1)).css("width"));
            var width = (progress_bars[i].current / progress_bars[i].target) * barWidth;
            width = width > barWidth ? barWidth : width;
            $("#bar"+(i+1)+"-progress").css("width", width);
        }
        if (barDetails != null && barDetails[i].auto) {
            if (isBarComplete(progress_bars[i]) || (progress_bars[i].current == -1 && progress_bars[i].target == -1)) {
                $('#bar' + (i+1)).click();
            }
        }
    }
}, 100);

$(document).ready(function(){
    console.log(/*[[${init}]]*/)

    $('.time-input.hours').on('input', function() {
        $(this).val($(this).val().match(/\d*\.?\d+/));
        $(this).val($(this).val() > 23 ? 23 : $(this).val());
    });

    $('.time-input.minutes').on('input', function() {
        $(this).val($(this).val().match(/\d*\.?\d+/));
        $(this).val($(this).val() > 59 ? 59 : $(this).val());
    });

    $('.time-input.seconds').on('input', function() {
        $(this).val($(this).val().match(/\d*\.?\d+/));
        $(this).val($(this).val() > 59 ? 59 : $(this).val());
    });

    $('.times-input').on('input', function() {
        $(this).val($(this).val().match(/\d*\.?\d+/));
        $(this).val($(this).val() > 999999 ? 999999 : $(this).val());
    });

    $('.time-input').change(function() {
        zeroNotAllowed();
        submitBars();
    });

    $('.auto-checkbox').change(function() {
        submitBars();
    })

    $('.times-input').change(function() {
        submitBars();
    });

    $(".btn.diagnostic").click(function(){
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(".diag-child").css('display', 'none');
    } else {
        $(this).addClass("active");
        $(".diag-child").css('display', 'flex');
        $(".diag-child.diag-output").css('display', 'block');
    }

    });

    $.ajax({
        url: baseUrl+ 'heartbeat/time',
        type: "GET",
        success: function(result) {
            offset = Date.parse(result) - Date.now();
            $('.offset').text((offset/1000 + ' second offset'));
        }
    });

    const Url=baseUrl + 'bars/init?userId=' + userId;
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

    const Url2=baseUrl + '/bars/completions?userId=' + userId;
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
        if (!isBarActive(progress_bars[id-1])) {
            log = true;
            diag = diag + "<span class='col-2'>client | server</span><span class='col-2 server-" + diagCount + "'></span>";
            diag = diag + "<span class='col-2'>difference:</span><span class='col-2 diff-" + diagCount + "'></span>";
            const Url=baseUrl + 'bars/begin';
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
        } else if (isBarComplete(progress_bars[id-1])) {
            diag = diag + "<span class='col-2'>complete</span>";
            const Url=baseUrl + 'bars/complete';
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
                        completeBar(progress_bars[id-1], id);
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
            $('.diag-output').append(diag);
        }
    });
});

function initPage(result) {
    for (var i = 0; i < result.progresses.length; i++) {
        registerBar(result.progresses[i]);
    }
    barDetails = result.bars;
    for (var i = 0; i < result.bars.length; i++) {
        registerBarDetails(result.bars[i]);
    }
}

function registerBar(progress) {
    var start = Date.parse(progress.startTime);
    var end = Date.parse(progress.endTime);

    var target = (end - start)/100;
    var current = Math.round((Date.now() + offset - start)/100);
    current = current > target ? target : current;
    current = current < 0 ? 0 : current;

    progress_bars[progress.barId-1].target = target;
    progress_bars[progress.barId-1].current = current;
}

function determineSeconds(duration) {
    return duration % 60;
}

function registerBarDetails(bar) {
    $('#bar' + bar.barNum + '-seconds').val(bar.durationSec % 60);
    $('#bar' + bar.barNum + '-minutes').val(Math.floor((bar.durationSec % 3600) / 60));
    $('#bar' + bar.barNum + '-hours').val(Math.floor(bar.durationSec / 3600));
    $('#bar' + bar.barNum + '-auto').prop("checked", bar.auto);
    $('#bar' + bar.barNum + '-auto-count').val(bar.autoCount);
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

function zeroNotAllowed() {
    for (var i = 0; i < 2; i++) {
        if ($('#bar' + (i+1) + '-hours').val() == 0
            && $('#bar' + (i+1) + '-minutes').val() == 0
            && $('#bar' + (i+1) + '-seconds').val() == 0) {
                $('#bar' + (i+1) + '-seconds').val(1);
        }
    }
}

function submitBars() {
    var updated = false;
    for (var i = 0; i < barDetails.length; i++) {
        var bar = barDetails[i];

        var newDuration = getNewDuration(bar.barNum);
        var newAuto = $('#bar' + bar.barNum + "-auto").prop('checked');
        var newAutoCount = parseInt($('#bar' + bar.barNum + "-auto-count").val());

        if (bar.durationSec != newDuration || bar.auto != newAuto || bar.autoCount != newAutoCount) {
            updated = true;
        }

        bar.durationSec = newDuration;
        bar.auto = newAuto;
        bar.autoCount = newAutoCount;
    }
    if (updated) {
        const Url=baseUrl + 'bars/submit';
        $.ajax({
            url: Url,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(barDetails),
            dataType: "json",
            success: function(result) {
                //noop
            },
            error:function(error) {
                console.log('Error ${error}')
            }
        });
    }

}

function getNewDuration(id) {
    return parseInt(($('#bar' + id + '-hours').val() * 3600)) + parseInt($('#bar' + id + '-minutes').val() * 60) + parseInt($('#bar' + id + '-seconds').val());
}