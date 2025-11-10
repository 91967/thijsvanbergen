document.addEventListener("DOMContentLoaded", function() {

    window.runHomeIntro = function() {
        const startButton = document.getElementById("home-startbutton");
        const title1 = document.getElementById("home-title-1");
        const title2 = document.getElementById("home-title-2");
        const subTitle1 = document.getElementById("home-subtitle-1");

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
        startButton.classList.remove("home-startbutton-visible")

        setTimeout(() => {
            typeWriter(title1, 100, () => {
                setTimeout(() => {
                    typeWriter(title2, 100, () => {
                        setTimeout(() => {
                            typeWriter(subTitle1, 60, () => {
                                setTimeout(() => {
                                    startButton.classList.add("home-startbutton-visible");
                                }, 500);
                            });
                        }, 500);
                    });
                }, 500);
            });
        }, 3000);
    };

    if (!sessionStorage.getItem("homeIntroPlayed")) {
        window.runHomeIntro();
        sessionStorage.setItem("homeIntroPlayed", "true");
    }
});
