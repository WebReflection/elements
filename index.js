import QSAO from 'qsa-observer';
import createRegistry from 'nonchalance/ce';

const query = [];
const registry = new Map;
const waitlist = new Map;

const name = selector => {
  const i = selector.indexOf('="');
  return selector.slice(i + 2, -2);
};

const { parse } = QSAO({
  query,
  handle(element, connected, selector) {
    if (connected) {
      const constructor = registry.get(name(selector));
      if (!(element instanceof constructor))
        new constructor(element);
    }
  }
});

const wait = name => {
  if (!waitlist.has(name))
    waitlist.set(name, Promise.withResolvers());

  return waitlist.get(name);
};

export const { HTML, SVG } = createRegistry();

export const elements = {
  define(name, constructor) {
    if (registry.has(name) || customElements.get(name))
      throw new DOMException(`Element ${name} already defined`);

    registry.set(name, constructor);
    wait(name).resolve(constructor);

    const selector = `[is="${name}"]`;
    query.push(selector);
    parse(document.querySelectorAll(selector));
  },
  get: name => registry.get(name),
  whenDefined: name => wait(name).promise,
};
