const { init } = require('../serverless.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["logo.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"start-fd937681.js","js":["start-fd937681.js","chunks/index-7de2d7f3.js","chunks/preload-helper-383d10e9.js"],"css":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js'))
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
