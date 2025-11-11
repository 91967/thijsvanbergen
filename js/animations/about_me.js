document.addEventListener("DOMContentLoaded", function() {

    function runAbout_MeIntro() {
        
    };

    if (sessionStorage.getItem("about_meIntroPlayed") == "false") {
        runAbout_MeIntro();
        sessionStorage.setItem("about_meIntroPlayed", "true");
    }
});
