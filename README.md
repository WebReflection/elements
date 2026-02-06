# @webreflection/elements

HTML & SVG Custom Elements, glueing [qsa-observer](https://github.com/WebReflection/qsa-observer#readme) and [nonchalance](https://github.com/WebReflection/nonchalance#readme) together.

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

</script>
<h1 is="my-h1"></h1>
```

Enjoy 👋
