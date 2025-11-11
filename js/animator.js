document.addEventListener("DOMContentLoaded", () => {
    const intros = ["main", "home", "about_me", "contact", "education", "projects"];
    const introKey = "IntroPlayed";

    setupAnimations();

    const navEntry = performance.getEntriesByType("navigation")[0];
    const isReload = navEntry && navEntry.type == "reload";
    if (isReload) {
        resetAnimations();
    }

    checkMainAnim();

    function resetAnimations() {
        intros.forEach(page => {
            const key = page + introKey;
            sessionStorage.setItem(key, "false");
        });
    }

    function setupAnimations() {
        intros.forEach(page => {
            const key = page + introKey;
            if (!sessionStorage.getItem(key)) {
                sessionStorage.setItem(key, "false");
            }
        });
    }

    function checkMainAnim() {
        if (sessionStorage.getItem("main" + introKey) == "false") {
            const body = document.body;
            const header = document.querySelector("header");
            body.classList.add("bg-fade-in");
            header.classList.add("header-slide-in");
            sessionStorage.setItem("main" + introKey, "true");
        }
    }
});