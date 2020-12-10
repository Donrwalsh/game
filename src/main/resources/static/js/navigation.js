$(document).ready(function(){
    $('.nav-link.bars').click(function() {
        event.preventDefault();
        var userId = Math.floor(Math.random() * 2147483647);
        window.location.href='/bars/' + userId;
    });
});