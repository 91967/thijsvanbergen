document.addEventListener("DOMContentLoaded", async () => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    const pathParts = window.location.pathname.split("/").filter(Boolean);
    let currentLang = "_" + pathParts[0];

    if (pathParts[0] == null || pathParts[0] == undefined) {
        currentLang = "";
    }

    async function loadHTML(element, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`${filePath}: ${response.status}`);
            element.innerHTML = await response.text();
        } 
        catch (err) {
            console.error(`Failed to load ${filePath}:`, err);
        }
    }

    const headerPath = `/fetch/headers/header${currentLang}.html`;
    const footerPath = `/fetch/footers/footer${currentLang}.html`;

    if (header) await loadHTML(header, headerPath);
    if (footer) await loadHTML(footer, footerPath);

    if (!currentLang == "") {
        const languageDropdownBtn = document.getElementById("lang-select");
        languageDropdownBtn.addEventListener("mouseenter", function() {
            languageDropdownBtn.classList.add("lang-hover");
        })

        languageDropdownBtn.addEventListener("mouseleave", function() {
            languageDropdownBtn.classList.remove("lang-hover");
            if (languageDropdownBtn.classList.length <= 0) {
                languageDropdownBtn.removeAttribute("class")
            }
        })

        document.documentElement.lang = currentLang;
    }
});
