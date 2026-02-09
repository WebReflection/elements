import QSAO from 'qsa-observer';
import createRegistry from 'nonchalance/ce';

const query = [];
const registry = new Map;
const waitlist = new Map;

const { parse } = QSAO({
  query,
  handle(element, connected, selector) {
    if (connected) {
      const name = selector[0] === '[' ? selector.slice(5, -2) : selector;
      const constructor = registry.get(name);
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
  /**
   * @param {string} name
   * @param {CustomElementConstructor} constructor
   * @returns
   */
  define(name, constructor) {
    if (registry.has(name) || customElements.get(name))
      throw new DOMException(`Element ${name} already defined`);

    registry.set(name, constructor);
    wait(name).resolve(constructor);

    //@ts-ignore
    const selector = constructor.tag === 'element' ? name : `[is="${name}"]`;
    query.push(selector);
    parse(document.querySelectorAll(selector));
  },

  /**
   * @param {string} name
   * @returns {CustomElementConstructor?}
   */
  get: name => registry.get(name),

  /**
   * @param {string} name
   * @returns {Promise<CustomElementConstructor>}
   */
  whenDefined: name => wait(name).promise,
};
