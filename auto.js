import * as module from './native.js';

let { HTML, SVG, elements } = module;

try {
  const LI = class extends HTMLLIElement {};
  customElements.define('extends-' + Date.now(), LI, { extends: 'li' });
  new LI;
}
catch {
  ({ HTML, SVG, elements } = await import('./min.js'));
}

export { HTML, SVG, elements };
