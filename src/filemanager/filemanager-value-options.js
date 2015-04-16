'use strict';

angular.module('ta.bootstrap.fm').value('fmOptions', {
	shows : [{
		text : 'TA_FM_THUMBNAIL',
		name : 'thumbnail'
	}, {
		text : 'TA_FM_LIST',
		name : 'list'
	}],

	sorts : [{
		text : 'TA_FM_NAME',
		name : 'name'
	}, {
		text : 'TA_FM_SIZE',
		name : 'size'
	}, {
		text : 'TA_FM_EXT',
		name : 'ext'
	}],

	types : [{
		text : 'TA_FM_TYPE_VIDEO',
		name : 'video'
	}, {
		text : 'TA_FM_TYPE_IMAGE',
		name : 'image'
	}]
}).value('videoConfig', {
	youku : {
		reg : /youku\.com\/v_show\/id_([A-Za-z0-9]+)(_.+)?\.html/,
		url : 'http://player.youku.com/embed/'
	},
	tudou : {
		// http://www.tudou.com/albumplay/A4WsWRnVG2Q/tlPKpJK1a_E.html
		// http://www.tudou.com/albumplay/IvF03NlsGzg.html
		reg : /tudou\.com\/albumplay\/([A-Za-z0-9]+)(\/.+)?\.html/,
		url : 'http://www.tudou.com/programs/view/html5embed.action?code='
	}
});
