document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    const baseLang = window.location.pathname.split("/")[1] || "en";
    const introKey = "IntroPlayed";

    const navEntry = performance.getEntriesByType("navigation")[0];
    const isReload = navEntry && navEntry.type == "reload";
    if (isReload) {
        Object.keys(sessionStorage).forEach(key => {
            if (key.endsWith(introKey) && !key == "page" + introKey) {
                sessionStorage.removeItem(key);
            }
        });
    }

    if (!sessionStorage.getItem("page" + introKey)) {
        sessionStorage.setItem("page" + introKey, "true");
    }

    document.body.addEventListener("click", async (e) => {
        const link = e.target.closest("a");
        if (!link || link.target === "_blank" || link.hasAttribute("data-no-router")) return;

        const href = link.getAttribute("href");
        const isInternal = href && href.startsWith(`/${baseLang}/`);
        if (!isInternal) return;

        e.preventDefault();
        const newPath = href.replace(window.location.origin, "");
        await navigateTo(newPath);
    });

    // ---- BACK/FORWARD NAVIGATION ----
    window.addEventListener("popstate", async () => {
        const path = window.location.pathname;
        await navigateTo(path, false);
    });

    // ---- MAIN PAGE LOADING FUNCTION ----
    async function navigateTo(path, addToHistory = true) {
        try {
            const res = await fetch(`${path}index.html`);
            if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);

            const html = await res.text();
            const temp = document.createElement("div");
            temp.innerHTML = html;
            const newMain = temp.querySelector("main");

            if (newMain) {
                main.classList.add("fade-out");
                await new Promise(r => setTimeout(r, 200));
                main.innerHTML = newMain.innerHTML;
                main.classList.remove("fade-out");

                if (addToHistory) {
                    history.pushState({}, "", path);
                }

                // Re-run per-page intros if needed
                const pageName = getPageNameFromPath(path);
                triggerPageIntro(pageName);
            }
        } catch (err) {
            console.error(err);
            main.innerHTML = `<p>Sorry, this page could not be loaded.</p>`;
        }
    }

    // ---- DETERMINE PAGE NAME ----
    function getPageNameFromPath(path) {
        const parts = path.split("/").filter(Boolean);
        return parts[1] || "home"; // e.g. /en/contact/ → "contact"
    }

    // ---- PER-PAGE INTRO HANDLING ----
    function triggerPageIntro(pageName) {
        const key = `${pageName}IntroPlayed`;

        // If intro has not been played yet for this page, run it
        if (!sessionStorage.getItem(key)) {
            if (pageName === "home" && typeof window.runHomeIntro === "function") {
                window.runHomeIntro();
            }
            // Add similar checks for other pages later, e.g. contact, education, etc.
            sessionStorage.setItem(key, "true");
        }
    }

    // LANGUAGE SWITCH HANDLER
    document.body.addEventListener("click", (e) => {
        const langLink = e.target.closest("[data-lang-switch]");
        if (langLink) {
            Object.keys(sessionStorage).forEach(key => {
                if (key.endsWith("IntroPlayed")) {
                    sessionStorage.removeItem(key);
                }
            });
        }
    });
});