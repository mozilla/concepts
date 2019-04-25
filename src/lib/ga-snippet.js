/* global window */

if (typeof window === 'object') {
  window.dataLayer = window.dataLayer || [];
}
function gtag(){
  if (typeof window !== 'object') {
    return;
  }
  if (typeof navigator === 'object' && navigator.doNotTrack === '1') {
    return;
  }

  //check if user has seen this experiment before:
  const aid = JSON.stringify({a: arguments});
  const hasSeenId = localStorage.getItem(aid);

  // if they're not debugging, set a localstorage item that says they have
  if (arguments.length === 3 && !(arguments[2].debug)) {
    localStorage.setItem(aid, true);
  }

  //  if they've seen this experiment, don't send stuff
  if (hasSeenId) {
    return;
  }

  window.dataLayer.push(arguments);
}

export function setupGA(metaCleanName, metaVariant) {
  if (typeof window !== 'object') {
    return;
  }
  if (typeof navigator === 'object' && navigator.doNotTrack === '1') {
    return;
  }

  const params = new URLSearchParams(window.location.search);

  // HACK...if coming from a bought add we should
  // convert UTM src and term to rc and rv
  let rc = params.get('rc');
  if (params.has('utm_source')) {
    rc = params.get('utm_source');
  }

  let rv = params.get('rv');
  if (params.has('utm_term')) {
    rv = params.get('utm_term');
  }

  gtag('js', new Date());

  // In gtag, the config event logs the pageview.
  gtag('config', 'UA-77033033-22', {
    transport_type: 'beacon',
    custom_map: {
      dimension1: 'rc',
      dimension2: 'rv',
      dimension3: 'aid',
      dimension4: 'av',
      dimension5: 'debug'
    },
    rc,
    rv,
    aid: metaCleanName,
    av: metaVariant,
    debug: params.get('debug')
  });

  gtag('event', 'visit', {
    event_category: 'Page',
    rc,
    rv,
    aid: metaCleanName,
    av: metaVariant,
    debug: params.get('debug')
  });
}

export function makeHandleClickLink(aid, av, label) {
  return () => {
    const params = new URLSearchParams(window.location.search);

    // HACK...if coming from a bought add we should
    // convert UTM src and term to rc and rv
    let rc = params.get('rc');
    if (params.has('utm_source')) {
      rc = params.get('utm_source');
    }

    let rv = params.get('rv');
    if (params.has('utm_term')) {
      rv = params.get('utm_term');
    }
    gtag(
      'event', 'click', {
        event_category: 'CTA',
        event_label: label,
        rc,
        rv,
        aid: aid,
        av: av,
        debug: params.get('debug')
      });
  };
}


