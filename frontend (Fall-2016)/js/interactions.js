$(document).ready(function() {
    $('.question').click(function() {
        if($(this).next().height() == 0) {
            var height = $(this).next().find('.answer').outerHeight();
            $(this).next().css('height', height);
            $(this).addClass('open');
            $(this).next().css('border-bottom', '2px solid #ff4040');
            $('.question').not($(this)).next().css('height', 0);
            $('.question').not($(this)).next().css('border-bottom', '0px solid #ff4040');
            $('.question').not($(this)).removeClass('open');

        } else {
            $(this).next().css('height', 0);
            $(this).removeClass('open');
            $(this).next().css('border-bottom', '0px solid #ff4040');
        }
    });
});
$(window).on("load resize scroll",function(e){
    $('.gallery').css('height', $('.left').outerHeight()); 
    $('.gallery li').css('height', $('.left').outerHeight()); 
    $('#landing').css('height', $('.left').outerHeight()); 

    var scrollTop = $(window).scrollTop();
    var landingBottom = $('#landing').height();

    if(scrollTop > landingBottom) {
        $('.logo').addClass('open');
    } else {
        $('.logo').removeClass('open');
    }
});

//smooth scroll anchor
$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});