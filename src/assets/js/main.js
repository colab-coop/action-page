function doOpenFbShare() {
	FB.ui({
		method: 'share',
		href: 'http://nosunoco.com/',
	}, function(response){});
	ga('send', 'event', 'ShareFacebook', 'click', 'Facebook Share');
}

function doTrackTwitterShare() {
	ga('send', 'event', 'ShareTwitter', 'click', 'Twitter Share');
}
