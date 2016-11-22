function doOpenFbShare() {
	FB.ui({
		method: 'share',
		href: 'http://nosunoco.com/',
	}, function(response){});
}
