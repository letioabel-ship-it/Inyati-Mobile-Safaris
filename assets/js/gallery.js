"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const albumTriggers = document.querySelectorAll(
        ".gallery-album-trigger"
    );

    const albumViewer = document.getElementById(
        "galleryAlbumViewer"
    );

    const albumTitle = document.getElementById(
        "galleryAlbumTitle"
    );

    const albumBack = document.getElementById(
        "galleryAlbumBack"
    );

    const galleryHeading = document.getElementById(
        "galleryTitle"
    );

    if (
        !albumTriggers.length ||
        !albumViewer ||
        !albumTitle ||
        !albumBack
    ) {
        return;
    }

    function openAlbum(trigger) {
        const selectedTitle =
            trigger.dataset.albumTitle || "Gallery Album";

        albumTitle.textContent = selectedTitle;
        albumViewer.hidden = false;

        albumViewer.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    albumTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            openAlbum(trigger);
        });

        trigger.addEventListener("keydown", (event) => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                openAlbum(trigger);
            }
        });
    });

    albumBack.addEventListener("click", () => {
        albumViewer.hidden = true;

        if (galleryHeading) {
            galleryHeading.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});