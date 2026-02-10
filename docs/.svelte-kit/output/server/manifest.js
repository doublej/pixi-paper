export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "pixi-paper/_app",
	assets: new Set([".nojekyll","icon.svg","robots.txt"]),
	mimeTypes: {".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.MHSQ0REY.js",app:"_app/immutable/entry/app.TseRKWtp.js",imports:["_app/immutable/entry/start.MHSQ0REY.js","_app/immutable/chunks/CDrTm7Ki.js","_app/immutable/chunks/6lvm0ttw.js","_app/immutable/chunks/CLyjSZbH.js","_app/immutable/entry/app.TseRKWtp.js","_app/immutable/chunks/6lvm0ttw.js","_app/immutable/chunks/CTWvJBvf.js","_app/immutable/chunks/CVYpwanY.js","_app/immutable/chunks/CLyjSZbH.js","_app/immutable/chunks/CREhRnT0.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/pixi-paper/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
