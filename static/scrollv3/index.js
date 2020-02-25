window.addEventListener("scroll", () => {
    if (window.scrollY) {
        document.getElementsByClassName("page-container")[0].classList.add("page-scrolled");
    } else {
        document.getElementsByClassName("page-container")[0].classList.remove("page-scrolled");
    }
});

let expandCollapse = (e) => {
    let questionElm = e.target.parentNode.parentNode;
    let isCollapsed = questionElm.classList.contains("collapsed");
    if (isCollapsed) {
        questionElm.classList.remove("collapsed");
        questionElm.classList.add("expanded");
    } else {
        questionElm.classList.remove("expanded");
        questionElm.classList.add("collapsed");
    }
}

let setupAnchordLinks = () => {
    // setting up anchor links
    document.querySelectorAll(".faq-link").forEach(elm => {
        elm.addEventListener("click", () => {
            let anchorId = elm.getAttribute("data-anchor-id");
            let anchorElm = document.getElementById(anchorId);
            let questionElm = anchorElm.parentNode.parentNode.parentNode;
            let isCollapsed = questionElm.classList.contains("collapsed");
            if (isCollapsed) {
                questionElm.classList.remove("collapsed");
                questionElm.classList.add("expanded");
            }
        });    
    });
}

window.addEventListener("DOMContentLoaded", () => {
    let expandButtons = document.querySelectorAll(".question-header button").forEach(button => button.addEventListener("click", expandCollapse));

    setupAnchordLinks();
});




