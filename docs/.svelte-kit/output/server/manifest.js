export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "pixi-paper/_app",
	assets: new Set([".nojekyll","compare.html","icon.svg","index.html","robots.txt","stress.html"]),
	mimeTypes: {".html":"text/html",".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DOOzB8gD.js",app:"_app/immutable/entry/app.D-4pygH-.js",imports:["_app/immutable/entry/start.DOOzB8gD.js","_app/immutable/chunks/CtYK-4TL.js","_app/immutable/chunks/6lvm0ttw.js","_app/immutable/chunks/CLyjSZbH.js","_app/immutable/entry/app.D-4pygH-.js","_app/immutable/chunks/6lvm0ttw.js","_app/immutable/chunks/CTWvJBvf.js","_app/immutable/chunks/CVYpwanY.js","_app/immutable/chunks/CLyjSZbH.js","_app/immutable/chunks/CREhRnT0.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
