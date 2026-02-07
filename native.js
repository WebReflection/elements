const DOM = new Map;

const create = document.createElement.bind(document);

const set = (map, tag) => {
  let Class = DOM.get(tag);
  if (!Class) {
    Class = tag === 'element' ? HTMLElement : create(tag).constructor;
    DOM.set(tag, Class);
  }
  class CustomElement extends Class {
    static tag = tag;
  }
  map.set(tag, CustomElement);
  return CustomElement;
};

// @ts-ignore
export const HTML = /** @type {import("nonchalance/ce").HTML} */(new Proxy(new Map, {
  get(map, tag) {
    let _ = /** @type {string} */ (tag).toLowerCase();
    return map.get(_) || set(map, _);
  }
}));

// @ts-ignore
export const SVG = /** @type {import("nonchalance/ce").SVG} */(new Proxy(new Map, {
  get() {
    throw new DOMException('SVG extends not natively supported');
  }
}));

export const elements = {
  /**
   * @param {string} name
   * @param {CustomElementConstructor} constructor
   * @returns
   */
  define: (name, constructor) => {
    const args = [name, constructor];

    //@ts-ignore
    if (constructor.tag !== 'element') {
      //@ts-ignore
      args.push({ extends: constructor.tag });
    }

    //@ts-ignore
    return customElements.define(...args);
  },

  /**
   * @param {string} name
   * @returns {CustomElementConstructor?}
   */
  get: name => customElements.get(name),

  /**
   * @param {string} name
   * @returns {Promise<CustomElementConstructor>}
   */
  whenDefined: name => customElements.whenDefined(name),
};
