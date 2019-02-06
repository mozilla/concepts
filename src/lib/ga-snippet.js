/* global ga */

/* eslint-disable */
// HACK: Google Analytics lives here, because CSP won't let it live inline
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)
},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://ssl.google-analytics.com/analytics.js','ga');

if (typeof(ga) !== 'undefined') {
  ga('create', {
      trackingId: 'UA-133941153-1', // TODO Replace this with the real id
      cookieDomain: 'auto',
      siteSpeedSampleRate: '100'
  });
} else {
  console.warn( // eslint-disable-line no-console
    'You have google analytics blocked. We understand. Take a ' +
    'look at our privacy policy to see how we handle your data.'
  );
}
/* eslint-enable */

export default function sendToGA(type, aid, av, dataIn) {
  if (window.ga && ga.loaded) {
    const data = dataIn || {}
    const params = new URLSearchParams(window.location.search)

    data.hitType = type
    data.dimension1 = params.get('rc')
    data.dimension2 = params.get('rv')
    data.dimension3 = aid
    data.dimension4 = av
    data.dimension5 = params.get('debug')

    ga("send", data)
  }
}

export function makeHandleClickLink(aid, av) {
  return (e) => {
    sendToGA(
      "event", aid, av, {
        eventCategory: "Outbound Link",
        eventAction: "click",
        eventLabel: e.target.href,
        transport: 'beacon'
      })
  } 
}


