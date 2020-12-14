$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip()

    var x = window.matchMedia("(max-width: 600px)")
    x.addEventListener("change", (e) => {
        if (!e.matches) {
            $('.mobile-detail-3-wide').css('display', 'none');
            $('.container-3-wide').css('padding-bottom', '0');
        }
    });

    $('.skill-3-wide').click(function() {
        showMobileDetail3Wide(x);
    });

});

function showMobileDetail3Wide(x) {
    if (x.matches) {
        $('.mobile-detail-3-wide').css('display', 'block');
        $('.container-3-wide').css('padding-bottom', '25vh');
    }
}