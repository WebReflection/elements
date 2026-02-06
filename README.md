# @webreflection/elements

HTML & SVG Custom Elements, glueing [qsa-observer](https://github.com/WebReflection/qsa-observer#readme) and [nonchalance](https://github.com/WebReflection/nonchalance#readme) together.

**[Live Test](https://webreflection.github.io/elements/test.html)**

```html
<script type="module">

  import { elements, HTML, SVG } from 'https://esm.run/@webreflection/elements';

  // same Custom Elements API
  elements.whenDefined('my-h1').then(Class => {
    console.log(Class.name, 'defined');
  });

  // native extends out of the box
  elements.define('my-h1', class MyH1 extends HTML.H1 {
    // anything that works with classes works here
    #private;

    // only caveat:
    //   if defined, the constructor MUST forward arguments!
    constructor(...args) {
      super(...args);
      this.#private = 'test';
    }

    // custom elements lifecycle (connected/disconnected/attributeChanged)
    connectedCallback() {
      console.log('connected', this.#private);
      this.innerHTML = 'Hello World';
    }
  });

</script>
<h1 is="my-h1"></h1>
```

Enjoy 👋

### Native Support Included

If your browser supports natively *HTML* custom elements builtin extends (i.e. Chrome/ium based), and *HTML* is all you want/need to extend 'cause *SVG* custom elements do not exist natively on the Web, you can use [@webreflection/elements/native](./native.js) export instead, which offers the **exact same API** without any dependency, hence it's lightweight, easier to reason about, and natively wonderful.

If you don't know if that's supported and you would like to feature detect this ability, you can pick the [@webreflection/elements/auto](./auto.js) export insted.
