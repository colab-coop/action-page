module.exports = {
  port: 1337,
  awsRegion: 'us-east-1',
  awsBucket: 'awesomeactionpage.com',
  awsCache: '/tmp/actionpage.cache',
  cloudFrontDistID: 'ABCD1234',
  title: 'Action-Page Title',
  mainlogo: 'nosunoco-logo.svg',
  actionNetwork: {
    id: 'boycott-sunoco'
  },
  meta: {
    "og:title": 'Action-Page',
    "og:url": 'https://awesomeactionpage.com/',
    "og:description": 'This is a lengthier description of the action page',
    "og:image": 'https://awesomeactionpage.com/actionpage.png',
    "twitter:site": '@awesomeactionpage'
  },
  twitter: {
    url: encodeURIComponent('https://awesomeactionpage.com/'),
    text: encodeURIComponent('A boilerplate for creating compelling, super-fast one-page action landings for Action Network campaigns using just HTML, CSS and AWS.'),
    related: 'actionpage',
    hashtags: 'actionpage, skeleton'
  },
  fb: {
    app_id: '573217829552127',
    pagetitle: 'Action Page',
    ui_href: 'http://nosunoco.com/',
    href: 'https://www.facebook.com/No-Sunoco-1243314592371578/'
  },
  google: {
    analytics: {
      id: 'UA-87440490-1'
    }
  }
}
