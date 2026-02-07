import * as module from './native.js';

let { HTML, SVG, elements } = module;

try {
  const LI = class extends HTMLLIElement {};
  customElements.define('li-' + Date.now(), LI, { extends: 'li' });
  new LI;
}
catch {
  ({ HTML, elements } = await import('./min.js'));
}

export { HTML, SVG, elements };
