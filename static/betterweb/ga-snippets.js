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
  
    window.dataLayer.push(arguments);
  }
  
  function setupGA(metaCleanName) {
    if (typeof window !== 'object') {
      return;
    }
    if (typeof navigator === 'object' && navigator.doNotTrack === '1') {
      return;
    }
  
    const params = new URLSearchParams(window.location.search);
  
    gtag('js', new Date());

    let utm_campaign = params.get('utm_campaign');
    let utm_medium = params.get('utm_medium');
    let utm_source = params.get('utm_source');
    let utm_content = params.get('utm_content');
    let debug = params.get('debug');
  
    // In gtag, the config event logs the pageview.
    gtag('config', 'UA-159564696-1', {
      transport_type: 'beacon',
      custom_map: {
        dimension1: 'utm_campaign',
        dimension2: 'utm_medium',
        dimension3: 'utm_source',
        dimension4: 'utm_content',
        dimension5: 'debug'
      },
      utm_campaign,
      utm_medium,
      utm_source,
      utm_content,
      debug
    });
  
    gtag('event', 'visit', {
      event_category: 'Page',
      utm_campaign,
      utm_medium,
      utm_source,
      utm_content,
      debug
    });
  }