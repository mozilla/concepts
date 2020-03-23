window.addEventListener("scroll", () => {
    if (window.scrollY) {
        document.getElementsByClassName("page-container")[0].classList.add("page-scrolled");
    } else {
        document.getElementsByClassName("page-container")[0].classList.remove("page-scrolled");
    }
});

let getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);

    let utm_campaign = params.get('utm_campaign');
    let utm_medium = params.get('utm_medium');
    let utm_source = params.get('utm_source');
    let utm_content = params.get('utm_content');
    let debug = params.get('debug');

    return {utm_campaign, utm_medium, utm_source, utm_content, debug};
}

let detectMob = () => {
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

let signup = (email) => {
    const SIGN_UP_URL_BASE = "https://scroll.com/firefoxauth";
    let url;
    let {utm_campaign, utm_medium, utm_source, utm_content, debug} = getQueryParams();
    let paramQueries = "";
    if (utm_campaign) paramQueries += `&utm_campaign=${utm_campaign}`;
    if (utm_medium) paramQueries += `&utm_medium=${utm_medium}`;
    if (utm_source) paramQueries += `&utm_source=${utm_source}`;
    if (utm_content) paramQueries += `&utm_content=${utm_content}`;

    if (email !== "") {
        url = encodeURI(`${SIGN_UP_URL_BASE}?email=${email}${paramQueries}`);
    } else {
        url = encodeURI(`${SIGN_UP_URL_BASE}?${paramQueries}`);
    }

    window.location.href = url;
    console.log(url);
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
            let ctaId = b.dataset.ctaId;
            if (email && validateEmail(email)) {
                signup(email);
            } else {
                signup("")
            }
            let {utm_campaign, utm_medium, utm_source, utm_content, debug} = getQueryParams();
            gtag('event', 'click', {
                event_category: 'CTA',
                event_label: ctaId,
                utm_campaign,
                utm_medium,
                utm_source,
                utm_content,
                debug})
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

let expandCollapseQuestion = (elm, source) => {
    let questionElm = elm;
    let isCollapsed = questionElm.classList.contains("collapsed");
    if (isCollapsed) {
        questionElm.classList.remove("collapsed");
        questionElm.classList.add("expanded");
        enableTabIndexes(questionElm);
        let {utm_campaign, utm_medium, utm_source, utm_content, debug} = getQueryParams();
        gtag('event', 'question-click', {
            event_category: 'faq-expansion',
            event_label: elm.dataset.qId,
            utm_campaign,
            utm_medium,
            utm_source,
            utm_content,
            debug})
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
            let questionElm = anchorElm.nextElementSibling;
            let isCollapsed = questionElm.classList.contains("collapsed");
            if (isCollapsed) {
                questionElm.classList.remove("collapsed");
                questionElm.classList.add("expanded");
            }
            let {utm_campaign, utm_medium, utm_source, utm_content, debug} = getQueryParams();
            gtag('event', 'anchor-click', {
                event_category: 'faq-expansion',
                event_label: anchorId,
                utm_campaign,
                utm_medium,
                utm_source,
                utm_content,
                debug})
        });    
    });
}

let hideDownloadButton = () => {
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    function detectFirefox() {
        return window.navigator.userAgent.indexOf("Firefox") != -1;
    }

    if (detectMob() || detectFirefox()) {
        document.querySelector(".download-fx").classList.add("hidden");
        document.querySelector(".download-fx-link").classList.add("hidden");
        document.querySelector(".download-fx").setAttribute("tabindex", "-1");
    }
}

let setupPaginationBtns = () => {
    let btns = document.querySelectorAll(".mobile .pagination-btn");

    function switchPage(page) {
        let pages = document.querySelectorAll(".mobile .brand-logos-page");

        for (let i of [0, 1]) {
            if (page == i+1) {
                btns[i].classList.add("selected");
                pages[i].classList.remove("inactive");
            } else {
                btns[i].classList.remove("selected");
                pages[i].classList.add("inactive");
            }
        }
    }

    btns.forEach(btn => btn.addEventListener("click", (e) => {
        let p = e.target.dataset.page; 
        switchPage(p);
    }));
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

    function logCarouselMovement() {
        let {utm_campaign, utm_medium, utm_source, utm_content, debug} = getQueryParams();
        gtag('event', 'carousel', {
            event_category: 'carousel-movement',
            event_label: "",
            utm_campaign,
            utm_medium,
            utm_source,
            utm_content,
            debug})
    }

    function onSwipe(el, d) {
        if (d !== "r" && d != "l") return;
        let activePage;
        for (let i of [0, 1]) {
            if (btns[i].classList.contains("selected")) {
                activePage = i+1;
            }
        }

        if (d == "l") {
            if (activePage == 2){
                activePage = 1;
            } else {
                activePage += 1;
            }
        }

        if (d == "r") {
            if (activePage == 1) {
                activePage = 2;
            } else {
                activePage -= 1;
            }
        }

        for (let i of [0, 1]) {
            if (activePage == i+1) {
                btns[i].classList.add("selected");
                pages[i].classList.remove("inactive");
            } else {
                btns[i].classList.remove("selected");
                pages[i].classList.add("inactive");
            }
        }

        logCarouselMovement();
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

    document.querySelectorAll(".faq.question").forEach(elm => elm.addEventListener("click", (e) => {
        if (e.currentTarget === elm && !(e.target instanceof HTMLAnchorElement)){
            expandCollapseQuestion(elm, "click");
        }
    }));
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

let emptyEmailField = () => {
    let emailElms = document.querySelectorAll("input[type='email']");
    emailElms.forEach(e => {e.value = "";});
}

let checkforCustomElementSupport = () => {
    if (!('customElements' in window)) {
        document.querySelector('firefox-apps').style = 'display: none';
    }
}

let activateNonregionModal = () => {
    let mob = false;

    if (detectMob()) {
        mob = true;
    }

    let {utm_campaign, utm_medium, utm_source, utm_content, debug} = getQueryParams();
    
    document.querySelector('.overlay-container').classList.remove('hidden');
    gtag('event', 'show', {
        event_category: 'modal',
        event_label: mob ? "mobile": "desktop",
        utm_campaign,
        utm_medium,
        utm_source,
        utm_content,
        debug});
}

let checkRegion = () => {
    // https://dev.to/ganeshmani/how-to-get-query-string-parameters-in-javascript-2019-4dm2
    const getQueryParams = ( params, url ) => {
        let href = url;
        //this expression is to get the query strings
        let reg = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
        let queryString = reg.exec(href);
        return queryString ? queryString[1] : null;
    };

    let nonregionParam = getQueryParams('nonregion', window.location.href);
    if (nonregionParam && nonregionParam == "false") return;

    const url = "https://location.services.mozilla.com/v1/country?key=efdb6cac-b8d9-452e-bbbe-87481222b36a";
    function reqListener (e) {
        try {
            let response = e.target.response;
            if (response.country_code != "US"){
                activateNonregionModal();
            }

        } catch (err) {}
      }
      
    let req = new XMLHttpRequest();
    req.responseType = "json"
    req.addEventListener("load", reqListener);
    req.open("GET", url);
    req.send();
}

let setupModalDismissBtns = () => {
    let okBtn = document.getElementById("ok-dismiss");
    let crossBtn = document.getElementById("cross-dismiss");
    let overlay = document.querySelector(".overlay-container");

    function hideOverlay(e, label) {
        overlay.classList.add("hidden");
        let {utm_campaign, utm_medium, utm_source, utm_content, debug} = getQueryParams();

        gtag('event', 'click', {
            event_category: 'modal-dismiss',
            event_label: label,
            utm_campaign,
            utm_medium,
            utm_source,
            utm_content,
            debug})
    }

    okBtn.addEventListener("click", (e) => hideOverlay(e, "ok"));
    crossBtn.addEventListener("click", (e) => hideOverlay(e, "cross"));   
}

let setupAdditionalInstrumentation = () => {
    let {utm_campaign, utm_medium, utm_source, utm_content, debug} = getQueryParams();

    let scrollSetup = document.getElementById("scroll-setup-link");
    scrollSetup.addEventListener("click", ()=> {
        gtag('event', 'click', {
            event_category: 'scroll-setup',
            event_label: '',
            utm_campaign,
            utm_medium,
            utm_source,
            utm_content,
            debug})
    });

    window.addEventListener("scroll", (e) => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // you're at the bottom of the page
            gtag('event', 'scroll', {
                event_category: 'full-scroll',
                event_label: '',
                utm_campaign,
                utm_medium,
                utm_source,
                utm_content,
                debug})
        }
    });

    document.querySelector(".get-help-question").addEventListener("click", (e) => {
        gtag('event', 'click', {
            event_category: 'help-link',
            event_label: 'top',
            utm_campaign,
            utm_medium,
            utm_source,
            utm_content,
            debug})
    });

    document.getElementById("get-help-bottom").addEventListener("click", (e) => {
        gtag('event', 'click', {
            event_category: 'help-link',
            event_label: 'bottom',
            utm_campaign,
            utm_medium,
            utm_source,
            utm_content,
            debug})
    });

    document.querySelector(".download-fx").addEventListener("click", (e) => {
        gtag('event', 'click', {
            event_category: 'download-fx',
            event_label: '',
            utm_campaign,
            utm_medium,
            utm_source,
            utm_content,
            debug})
    });

    document.querySelector("firefox-apps").addEventListener("click", (e) => {
        gtag('event', 'click', {
            event_category: 'bento-button',
            event_label: '',
            utm_campaign,
            utm_medium,
            utm_source,
            utm_content,
            debug})
    });
}

window.addEventListener("DOMContentLoaded", () => {
    setupGA("fbw-march-v1");
    setupExpandButtons();
    setupAnchordLinks();
    setupMobileCarousel();
    setupSignupListeners();
    setupTabIndexes();
    setupVideoLoop();
    emptyEmailField();
    hideDownloadButton();
    checkforCustomElementSupport();
    setupPaginationBtns();
    setupModalDismissBtns();
    checkRegion();
    setupAdditionalInstrumentation();
});




