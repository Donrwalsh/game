$(document).ready(function(){

    var x = window.matchMedia("(max-width: 600px)")
    x.addEventListener("change", (e) => {
        if (!e.matches) {
            $('.mobile-detail-3-wide').css('display', 'none');
            $('.container-3-wide').css('padding-bottom', '0');
        }
    });

    $('.skill-3-wide').click(function() {
        showMobileDetail3Wide(x, $(this));
    });

    $('.mobile-close').click(function() {
        $('.mobile-detail').css('visibility', 'hidden');
        $('.mobile-detail-3-wide').css('display', 'none');
        $('.container-3-wide').css('padding-bottom', '0');
    });

});

function showMobileDetail3Wide(x, button) {
    if (x.matches) {
        $('.mobile-detail-3-wide').css('display', 'block');
        $('.container-3-wide').css('padding-bottom', '25vh');
        $('.mobile-detail').css('visibility', 'hidden');
        $('#mobile-detail-' + button.attr('id')).css('visibility', 'visible');
    }
}