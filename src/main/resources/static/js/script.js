$(document).ready(function(){
    const Url='http://localhost:8080/test';
    $.ajax({
        url: Url,
        type:"GET",
        success: function(result){
        console.log(result)
        },
        error:function(error){
            console.log('Error ${error}')
        }
    });
});