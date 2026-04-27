// @ts-check

import QSAO from 'qsa-observer';
import createRegistry from 'nonchalance/ce';

// @ts-ignore
import withResolvers from '@webreflection/utils/with-resolvers';

/** @type {string[]} */
const query = [];

/** @type {Map<string, CustomElementConstructor>} */
const registry = new Map;

/** @type {Map<string, Promise<CustomElementConstructor>>} */
const waitlist = new Map;

const { parse } = QSAO({
  query,
  handle(element, connected, selector) {
    if (connected) {
      const name = selector[0] === '[' ? selector.slice(5, -2) : selector;
      const constructor = registry.get(name);
      // @ts-ignore
      if (!(element instanceof constructor))
        // @ts-ignore
        new constructor(element);
    }
  }
});

/**
 * @param {string} name
 * @returns {{resolve: (value: CustomElementConstructor) => void, reject: (reason?: any) => void, promise: Promise<CustomElementConstructor>}}
 */
const wait = name => {
  if (!waitlist.has(name))
    // @ts-ignore
    waitlist.set(name, withResolvers());

  // @ts-ignore
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
   * @returns {CustomElementConstructor | undefined}
   */
  get: name => registry.get(name),

  /**
   * @param {string} name
   * @returns {Promise<CustomElementConstructor>}
   */
  whenDefined: name => wait(name).promise,
};
