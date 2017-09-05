// HackRU Fall 2017 Scripts
$(document).ready(function() {

    var pageLocation = window.location.pathname; // used to run certain JS on specific pages
    console.log(pageLocation);

    if (pageLocation == '/' || pageLocation == '/index.ejs' || pageLocation == '/sponsorship') { // run on home page (landing page)
        // console.log("THIS IS THE HOME PAGE.");
        smoothScrollEnable();
    }

    else {
        // on resume file upload, change the notification to say what file was uploaded
        $('#resume-upload-input').on("change", function(){
            changeFileUploadPreview();
        });

        highlightCurrentPageOnMenu();
    }


    if (pageLocation == '/sponsorship') {

        // sponsorship button selection functionality
        $("#spons-level-btn-brz").click(function() {
            scrollOnPackageSelect(1500, "Bronze");
        });

        $("#spons-level-btn-sil").click(function() {
            scrollOnPackageSelect(4000, "Silver");
        });

        $("#spons-level-btn-gld").click(function() {
            scrollOnPackageSelect(7000, "Gold");
        });

        $("#spons-level-btn-plt").click(function() {
            scrollOnPackageSelect(15000, "Platinum");
        });

    }

});


function scrollOnPackageSelect(cost, packageName) {

    var parentWidth = $(".progress").width().toFixed() - 1;
    var newWidth = (cost/15000*parentWidth).toFixed();
    var newPackageText = "the " + packageName + " package"

    $('html, body').animate({
        scrollTop: $("#contact").offset().top
    }, "slow");
    $(".progress-bar").animate({ width: newWidth }, "slow");

    $("#package-selected-text").text(newPackageText);

    $("#sp-message").text("Hi! Let's chat about my company sponsoring HackRU with the " + packageName + " package! :)");

    $("#input-package-name").val(packageName);

}


function smoothScrollEnable() {
    // helps smoothly transition to anchor points on the landing page.
    $('.smooth-scroll').on('click', function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    });
}

function changeFileUploadPreview(){
    // for use in resume uploading on the registration and account management pages.
    var fileName = $("#resume-upload-input").val().replace(/\\/g, '/').replace(/.*\//, '');
    $("#file-selector-notif").text(fileName);

}

function highlightCurrentPageOnMenu() {

    var pageName = window.location.pathname;

    if (pageName.includes("registration")) {
        $('#nav-link-registration').addClass('bold-text');
    }
    else if (pageName.includes("dashboard")) {
        $('#nav-link-dashboard').addClass('bold-text');
    }
    else {

    }
}
