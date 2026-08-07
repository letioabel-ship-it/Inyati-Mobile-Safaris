"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const siteHeader = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mainMenu = document.getElementById("mainMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!menuToggle || !mainMenu) {
        return;
    }

    function closeMenu() {
        menuToggle.classList.remove("open");
        mainMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

    menuToggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const menuIsOpen = mainMenu.classList.toggle("open");

        menuToggle.classList.toggle("open", menuIsOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            menuIsOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1100) {
            closeMenu();
        }
    });

    function updateHeader() {
        if (siteHeader) {
            siteHeader.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();
    // Close the mobile menu when clicking outside it.

document.addEventListener("click", (event) => {
    const menuIsOpen = mainMenu.classList.contains("open");

    if (!menuIsOpen) {
        return;
    }

    const clickedInsideMenu = mainMenu.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        closeMenu();
    }
});

// Close the mobile menu when the page is scrolled.

window.addEventListener(
    "scroll",
    () => {
        if (mainMenu.classList.contains("open")) {
            closeMenu();
        }
    },
    {
        passive: true
    }
);
});