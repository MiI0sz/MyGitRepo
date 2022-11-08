function showAndHideHeader () {
    if (headerFooterAreOpen) {
        HEADER.style.removeProperty("top");
        FOOTER.style.removeProperty("bottom");
        headerFooterAreOpen = false;
    } else {
        HEADER.style.setProperty("top", "0");
        FOOTER.style.setProperty("bottom", "0");
        headerFooterAreOpen = true;
    }
}

const HEADER = document.querySelector("header");
const FOOTER = document.querySelector("footer");

HEADER.addEventListener("click", showAndHideHeader);
let headerFooterAreOpen = false;
