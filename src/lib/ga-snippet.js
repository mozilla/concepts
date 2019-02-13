/* global window */

if (typeof window === 'object') {
  window.dataLayer = window.dataLayer || [];
}
function gtag(){
  if (typeof window !== 'object') {
    return;
  }
  if (typeof navigator === 'object' && navigator.doNotTrack === "1") {
    return;
  }
  window.dataLayer.push(arguments);
}

export function setupGA(metaCleanName, metaVariant) {
  if (typeof window !== 'object') {
    return;
  }
  if (typeof navigator === 'object' && navigator.doNotTrack === "1") {
    return;
  }

  const params = new URLSearchParams(window.location.search)

  gtag('js', new Date());

  // In gtag, the config event logs the pageview.
  gtag('config', 'UA-77033033-22', {
    send_page_view: false,
    transport_type: 'beacon',
    custom_map: {
      dimension1: 'rc',
      dimension2: 'rv',
      dimension3: 'aid',
      dimension4: 'av',
      dimension5: 'debug'
    }
  });

  gtag("event", "visit", {
    event_category: "Page",
    rc: params.get('rc'),
    rv: params.get('rv'),
    aid: metaCleanName,
    av: metaVariant,
    debug: params.get('debug')
  });
}

export function makeHandleClickLink(aid, av, label) {
  return (e) => {
    const params = new URLSearchParams(window.location.search)
    gtag(
      "event", "click", {
        event_category: "CTA",
        event_label: label,
        rc: params.get('rc'),
        rv: params.get('rv'),
        aid: aid,
        av: av,
        debug: params.get('debug')
      })
  } 
}


