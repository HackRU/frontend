// check if current position is past halfpoint of hero
// if so, we make the secondary navbar appear on top
$(window).on('scroll', function() {
	// console.log("scrolling...");
	var heroBottomHalf = $('#hero').height() / 2;
    var stop = Math.round($(window).scrollTop());
    if (stop > heroBottomHalf) {
    	$('#nav-secondary').fadeIn();
    } else {
    	$('#nav-secondary').fadeOut();
    }
});


$(document).ready(function() {
	
	var pageLocation = window.location.pathname; // used to run certain JS on specific pages

	loadExternalHTMLTemplates();


	if (pageLocation == '/' || pageLocation == '/index.ejs') { // run on home page (landing page)
		// console.log("THIS IS THE HOME PAGE.");
		smoothScrollEnable();
		toggleMapScrollOnClickAndLeave();
		hideWebOIfNoSpace();
	}

	else {
		// on resume file upload, change the notification to say what file was uploaded
		$('#resume-upload-input').on("change", function(){
			changeFileUploadPreview();
		});
	}

	
});

function hideWebOIfNoSpace() {
	var $heroInfo = $('#hero-info');
	var botOfHeroInfo = $heroInfo.offset().top + $heroInfo.outerHeight(true);
	var $webO = $('#hero-webosphere');
	var topOfWebO = $webO.offset().top;
	if (botOfHeroInfo > topOfWebO) {
		$webO.hide();
	}
	return;
}

function loadExternalHTMLTemplates() {
	// templating.
	$(".subpage-nav").load("../temps/subpage-nav.html"); // load nav bar for all subpages
	$("#footer").load("../temps/footer.html"); // load footer for all pages
	return;
}

function smoothScrollEnable() {
	// helps smoothly transition to anchor points on the landing page.
	$('a[href*=\\#]').on('click', function(event){     
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
	});
	return;
}

function toggleMapScrollOnClickAndLeave() {
	// for use on the google map on the landing page.
	$('#about-location-map').click(function () {
		$('#about-location-map iframe').css("pointer-events", "auto");
	});

	$( "#about-location-map" ).mouseleave(function() {
		$('#about-location-map iframe').css("pointer-events", "none"); 
	});
}

function changeFileUploadPreview(){
	// for use in resume uploading on the registration and account management pages.
    var fileName = $("#resume-upload-input").val().replace(/\\/g, '/').replace(/.*\//, '');
    $("#file-selector-notif").text(fileName);
    console.log(fileName);

}