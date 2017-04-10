function doOpenFbShare() {
	FB.ui({
		method: 'share',
		href: '<%= fb.ui_href %>',
	}, function(response){});
	ga('send', 'event', 'ShareFacebook', 'click', 'Facebook Share');
}

function doTrackTwitterShare() {
	ga('send', 'event', 'ShareTwitter', 'click', 'Twitter Share');
}
