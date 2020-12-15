$(document).ready(function(){

    $('.skill-green').click(function() {
        showNodeDetails($(this));
    });

   $('.skill-pane-close').click(function() {
        $('.skill-detail-pane').css('display', 'none');
        $('.container-green').css('padding-bottom', '0');
        $('.skill-detail').css('display', 'none');
    });
});

function showNodeDetails(button) {
    $('.skill-detail-pane').css('display', 'block');
    $('.container-green').css('padding-bottom', '25vh');
    $('.skill-detail').css('display', 'none');
    $('#green-skill-detail-' + button.attr('id')).css('display', 'block');
}


