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
            var width = ((bars[i].current - bars[i].start) / (bars[i].end - bars[i].start));
            $("#bar"+(i+1)+"-progress").css("width", width * parseFloat($("#bar"+(i+1)).css("width")));
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
});

function initPage(result) {
    for (var i = 0; i < result.length; i++) {
        bars[result[i].barId-1].start = Date.parse(result[i].startTime);
        bars[result[i].barId-1].end = Date.parse(result[i].endTime);
    }
    console.log(bars);
}