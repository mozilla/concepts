window.addEventListener("scroll", () => {
    if (window.scrollY) {
        document.getElementsByClassName("page-container")[0].classList.add("page-scrolled");
    } else {
        document.getElementsByClassName("page-container")[0].classList.remove("page-scrolled");
    }
});

let signup = (email) => {
    const SIGN_UP_URL_BASE = "https://scroll.com/firefoxauth";
    let url;
    if (email !== "") {
        url = encodeURI(`${SIGN_UP_URL_BASE}?email=${email}`);
    } else {
        url = SIGN_UP_URL_BASE;
    }

    window.location.href = url;
}

let setupSignupListeners = () => {
    function validateEmail(email) {
        // https://stackoverflow.com/a/46181
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    document.querySelectorAll(".signup-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            let b = e.target;
            let email = document.getElementById(b.dataset.emailId).value;
            if (email && validateEmail(email)) {
                signup(email);
            } else {
                signup("")
            }
        });
    });
}

let enableTabIndexes = (questionElement) => {
    let as = questionElement.querySelectorAll("a[href]");
    as.forEach(a => a.removeAttribute("tabindex"));
}

let disableTabIndexes = (questionElement) => {
    let as = questionElement.querySelectorAll("a[href]");
    as.forEach(a => a.setAttribute("tabindex", "-1"));
}

let expandCollapseParent = (e) => {
    let questionElm = e.target.parentNode.parentNode;
    let isCollapsed = questionElm.classList.contains("collapsed");
    if (isCollapsed) {
        questionElm.classList.remove("collapsed");
        questionElm.classList.add("expanded");
        enableTabIndexes(questionElm);
    } else {
        questionElm.classList.remove("expanded");
        questionElm.classList.add("collapsed");
        disableTabIndexes(questionElm);
    }
}

let expandCollapseQuestion = (elm) => {
    let questionElm = elm;
    let isCollapsed = questionElm.classList.contains("collapsed");
    if (isCollapsed) {
        questionElm.classList.remove("collapsed");
        questionElm.classList.add("expanded");
        enableTabIndexes(questionElm);
    } else {
        questionElm.classList.remove("expanded");
        questionElm.classList.add("collapsed");
        disableTabIndexes(questionElm);
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

let hideDownloadButton = () => {
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    function detectMob() {
        const toMatch = [
                /Android/i,
                /webOS/i,
                /iPhone/i,
                /iPad/i,
                /iPod/i,
                /BlackBerry/i,
                /Windows Phone/i
            ];

        return toMatch.some((toMatchItem) => {
            return window.navigator.userAgent.match(toMatchItem);
        });
    }

    function detectFirefox() {
        return window.navigator.userAgent.indexOf("Firefox") != -1;
    }

    if (detectMob() || detectFirefox()) {
        document.querySelector(".download-fx").classList.add("hidden");
    }
}

let setupDesktopCarousel = () => {
    let leftArrow = document.querySelector(".brand-arrow.left");
    let rightArrow = document.querySelector(".brand-arrow.right");
    let logosSection = document.querySelector(".desktop .brand-logos");

    function flipPage() {
        let page1 = document.querySelector(".desktop .brand-logos-page.page1");
        let page2 = document.querySelector(".desktop .brand-logos-page.page2");
        let pagBtn1 = document.querySelector(".desktop .pagination-btn.btn1");
        let pagBtn2 = document.querySelector(".desktop .pagination-btn.btn2");

        let activePage = pagBtn1.classList.contains("selected") ? 1 : 2;
        // works if only two pages
    
        if (activePage == 1) activePage = 2;
            else activePage = 1;

        // update the properties
        if (activePage == 1) {
            pagBtn1.classList.add("selected");
            pagBtn2.classList.remove("selected");
            page1.classList.remove("inactive");
            page2.classList.add("inactive");
        } else {
            pagBtn2.classList.add("selected");
            pagBtn1.classList.remove("selected");
            page2.classList.remove("inactive");
            page1.classList.add("inactive");
        }
    }

    function arrowClick(isLeft) {
        flipPage();
    }

    // also enablind swipe on mobile phones with high resolution
    detectswipe(logosSection, (el, d) => {
        if (d == "r" || d == "l") flipPage();
    });

    leftArrow.addEventListener("click", () => arrowClick(true));
    rightArrow.addEventListener("click", () => arrowClick(false));
}

function detectswipe(ele, func) {
    // from https://stackoverflow.com/questions/15084675/how-to-implement-swipe-gestures-for-mobile-devices
    swipe_det = new Object();
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
    const min_x = 30;  //min x swipe for horizontal swipe
    const max_x = 30;  //max x difference for vertical swipe
    const min_y = 50;  //min y swipe for vertical swipe
    const max_y = 60;  //max y difference for horizontal swipe
    let direc = "";
    ele.addEventListener('touchstart', (e) => {
      let t = e.touches[0];
      swipe_det.sX = t.screenX; 
      swipe_det.sY = t.screenY;
    },false);

    ele.addEventListener('touchmove', (e) => {
      e.preventDefault();
      let t = e.touches[0];
      swipe_det.eX = t.screenX; 
      swipe_det.eY = t.screenY;    
    },false);

    ele.addEventListener('touchend',function(e){
      //horizontal detection
      direc = "";
      if ((Math.abs(swipe_det.eX - swipe_det.sX) > min_x) && (Math.abs(swipe_det.eY - swipe_det.sY) < max_y) && (swipe_det.eX > 0)) {
        if(swipe_det.eX > swipe_det.sX) direc = "r";
        else direc = "l";
      }
  
      if (direc !== "") {
        if(typeof func == 'function') func(ele, direc);
      }
      direc = "";
      swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
    },false);  
}


let setupMobileCarousel = () => {
    let pages = document.querySelectorAll(".mobile .brand-logos-page");
    let btns = document.querySelectorAll(".mobile .pagination-btn");
    let logosSection = document.querySelector(".mobile .brand-logos");

    function onSwipe(el, d) {
        if (d !== "r" && d != "l") return;
        let activePage;
        for (let i of [0, 1, 2]) {
            if (btns[i].classList.contains("selected")) {
                activePage = i+1;
            }
        }

        if (d == "l") {
            if (activePage == 3){
                activePage = 1;
            } else {
                activePage += 1;
            }
        }

        if (d == "r") {
            if (activePage == 1) {
                activePage = 3;
            } else {
                activePage -= 1;
            }
        }

        for (let i of [0, 1, 2]) {
            if (activePage == i+1) {
                btns[i].classList.add("selected");
                pages[i].classList.remove("inactive");
            } else {
                btns[i].classList.remove("selected");
                pages[i].classList.add("inactive");
            }
        }
    }

    detectswipe(logosSection, onSwipe);
}

let setupExpandButtons = () => {
    function isTouchDevice() {
        // https://stackoverflow.com/a/4819886
    
        let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        
        let mq = (query) => {
            return window.matchMedia(query).matches;
        }
    
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            return true;
        }
    
        let query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    }

    if (!isTouchDevice()) {
        document.querySelectorAll(".question-header button").forEach(button => button.addEventListener("click", expandCollapseParent));
    } else {
        document.querySelectorAll(".faq.question").forEach(elm => elm.addEventListener("click", (e) => {
            if (e.currentTarget === elm)
                expandCollapseQuestion(elm);
        }));
    }
}

let setupTabIndexes = () => {
    let as = document.querySelectorAll(".faq.answer a");
    as.forEach(a => a.setAttribute("tabindex", "-1"));
}

let setupVideoLoop = () => {
    let video = document.querySelector(".hero-animation video");
    //this did the trick
    video.loop = false; 
    video.addEventListener('ended', () => { 
      video.currentTime=0.1; video.play(); }, false);
    video.play();
}

window.addEventListener("DOMContentLoaded", () => {
    setupExpandButtons();
    setupAnchordLinks();
    hideDownloadButton();
    setupDesktopCarousel();
    setupMobileCarousel();
    setupSignupListeners();
    setupTabIndexes();
    setupVideoLoop();
});




