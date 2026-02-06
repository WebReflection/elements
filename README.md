# @webreflection/elements

HTML & SVG Custom Elements, glueing [qsa-observer](https://github.com/WebReflection/qsa-observer#readme) and [nonchalance](https://github.com/WebReflection/nonchalance#readme) together.

```html
<script type="module">
  import { elements, HTML, SVG } from 'https://esm.run/@webreflection/elements';

  // same Custom Elements API
  elements.whenDefined('header').then(() => {
    console.log('header defined');
  });

  // native extends out of the box
  elements.define('header', class extends HTML.H1 {
    // anything that works with classes works here
    #private;

    // only caveat:
    //   if defined, the constructor MUST forwards arguments!
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

  // automatic upgrades per element
  elements.whenDefined('header').then(() => {
    console.log('header defined');
  });
</script>
<h1 is="header"></h1>
```

Enjoy 👋
