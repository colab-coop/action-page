module.exports = {
  port: 1337,
  awsRegion: 'us-east-1',
  awsBucket: 'actionpage.tech',
  awsCache: '/tmp/actionpage.tech.cache',
  cloudFrontDistID: 'ABCD1234',
  title: 'Action-Page Title',
  mainlogo: 'logo.svg',
  actionNetwork: {
    id: 'actionpage'
  },
  meta: {
    "og:title": 'Action-Page',
    "og:url": 'https://actionpage.tech/',
    "og:description": 'This is a lengthier description of the action page',
    "og:image": 'https://actionpage.tech/actionpage.png',
    "twitter:site": '@awesomeactionpage'
  },
  sections: {
    actionNetwork: false,
    socialShare: false
  },
  twitter: {
    url: encodeURIComponent('https://actionpage.tech/'),
    text: encodeURIComponent('A boilerplate for creating compelling, super-fast one-page action landings for Action Network campaigns using just HTML, CSS and AWS.'),
    related: 'actionpage',
    hashtags: 'actionpage, skeleton'
  },
  fb: {
    app_id: '573217829552127',
    pagetitle: 'Action Page',
    ui_href: 'http://actionpage.tech/',
    href: 'https://www.facebook.com/Action-Page-1111111111111111/'
  },
  google: {
    analytics: {
      id: 'UA-11111111-1'
    }
  }
}
