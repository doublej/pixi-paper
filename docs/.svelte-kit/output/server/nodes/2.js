import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.CDV_R066.js","_app/immutable/chunks/CVYpwanY.js","_app/immutable/chunks/6lvm0ttw.js","_app/immutable/chunks/BBnNw1tc.js","_app/immutable/chunks/CTWvJBvf.js"];
export const stylesheets = ["_app/immutable/assets/2.BlmCoaH_.css"];
export const fonts = [];
