
$(document).ready(function() {
    if($(window).height() < $(document).height()) {
        $('#footer').css('position', 'relative');
    } else if($(window).height() == $(document).height()) {
        $('#footer').css('position', 'fixed');
    }
    $(window).resize(function() {
        if($(window).height() < $(document).height()) {
            $('#footer').css('position', 'relative');
        } else if($(window).height() == $(document).height()) {
            $('#footer').css('position', 'fixed');
        }
    });
});

