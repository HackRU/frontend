$(document).ready(function(){
  $(window).scroll(function(){
        if ($(this).scrollTop() > 150) {
            $('.navbar').fadeIn(200);
        } else {
            $('.navbar').fadeOut(200);
        }
    });

});
