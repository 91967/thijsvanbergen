document.addEventListener("DOMContentLoaded", function() {

    function runHomeIntro() {
        const startButton = document.getElementById("home-startbutton");
        const title1 = document.getElementById("home-title-1");
        const title2 = document.getElementById("home-title-2");
        const subTitle1 = document.getElementById("home-subtitle-1");
        const welcomeImg = document.getElementById("home-welcome-pfp");

        if (!title1 || !title2 || !subTitle1) return;

        function typeWriter(element, speed = 100, callback) {
            const text = element.innerHTML;
            element.innerHTML = "";
            element.style.display = "inline-block";
            let i = 0;

            function typeChar() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeChar, speed);
                } else {
                    element.removeAttribute("style");
                    if (callback) callback();
                }
            }

            typeChar();
        }

        title1.style.display = "none";
        title2.style.display = "none";
        subTitle1.style.display = "none";
        title1.style.borderRight = "2px solid rgb(0, 128, 0)";
        title2.style.borderRight = "2px solid rgb(0, 128, 0)";
        subTitle1.style.borderRight = "2px solid rgb(0, 128, 0)";
        startButton.classList.remove("fade-in");
        welcomeImg.style.transform = "translateX(100%)";

        setTimeout(() => {
            typeWriter(title1, 100, () => {
                setTimeout(() => {
                    welcomeImg.classList.add("slide-in-from-right");
                    typeWriter(title2, 100, () => {
                        setTimeout(() => {
                            typeWriter(subTitle1, 60, () => {
                                setTimeout(() => {
                                    startButton.classList.add("fade-in");
                                }, 500);
                            });
                        }, 500);
                    });
                }, 500);
            });
        }, 3000);
    };

    if (sessionStorage.getItem("homeIntroPlayed") == "false") {
        runHomeIntro();
        sessionStorage.setItem("homeIntroPlayed", "true");
    }
});
