<div align="center">
  <h1>@xobotyi/bem</h1>
  <p>The fastest BEM class name generator</p>
  <p>
    <a href="https://travis-ci.org/xobotyi/bem">
        <img src="https://flat.badgen.net/travis/xobotyi/bem" alt="Build status"/>
    </a>
    <a href="https://www.npmjs.com/package/@xobotyi/bem">
        <img src="https://flat.badgen.net/npm/v/@xobotyi/bem" alt="NPM version"/>
    </a>
    <a href="https://www.npmjs.com/package/@xobotyi/bem">
        <img src="https://flat.badgen.net/npm/dw/@xobotyi/bem" alt="NPM weekly downloads"/>
    </a>
    <a href="https://www.npmjs.com/package/@xobotyi/bem">
        <img src="https://flat.badgen.net/npm/license/@xobotyi/bem" alt="License"/>
    </a>
    <a href="https://www.npmjs.com/package/@xobotyi/bem">
        <img src="https://flat.badgen.net/npm/types/@xobotyi/bem" alt="Types definition"/>
    </a>
    <a href="https://www.npmjs.com/package/@xobotyi/bem">
        <img src="https://flat.badgen.net/codacy/grade/41452ebba00f442dab5ab31b7be6c9d1" alt="Codacy Code Grade"/>
    </a>
    <a href="https://www.npmjs.com/package/@xobotyi/bem">
        <img src="https://flat.badgen.net/codacy/coverage/41452ebba00f442dab5ab31b7be6c9d1" alt="Tests LOC"/>
    </a>
  </p>
</div>

---

<div align="center">❤️Please consider starring this project to show your love and support.🙌</div>

---

As handwriting BEM-compatible class names is quite painful and existing couple of packages are slow or lack of 
functionality needed for me (such as prefixing) &mdash; this package exists.  
Also as figures this package the [fastest](/benchmark) one I know about🚀

And turns this:
```jsx
import * as react from "react";

export function component(){
  return (
    <div className="NTS-blockName NTS-blockName_size_l">
      <div className="NTS-blockName__wrapperElement">
        <div className="NTS-blockName__headerElement NTS-blockName__headerElement_size_l">Block title</div>
        <button className="NTS-blockName__buttonElement NTS-blockName__buttonElement_left NTS-blockName__buttonElement_size_l NTS-blockName__buttonElement_disabled">Button left</button>
        <button className="NTS-blockName__buttonElement NTS-blockName__buttonElement_right NTS-blockName__buttonElement_size_l">Button right</button>
      </div>
    </div>
  );
}
```
into this:
```jsx
import * as react from "react";
import { BEM } from "@xobotyi/bem";

const bem = BEM.extend({prefix: "MY"}); // in real world this row will be a single per project 
                                        // and initialized elsewhere
const b = bem.lock('blockName');

export function component(){
  return (
    <div className={ b({ size:'l' }) }>
      <div className={ b('wrapperElement') }>
        <div className={ b('headerElement', { size: 'l' }) }>Block title</div>
        <button className={ b('buttonElement', { 'left':true, size:'l', disabled:true }) }>Button left</button>
        <button className={ b('buttonElement', { 'right':true, size:'l' }) }>Button right</button>
      </div>
    </div>
  );
}
```


#### Installation note

This package written in TypeScript and delivered with 3 versions:

- `main` field of `package.json` is pointing to transpiled ES5 version with CJS modules resolution;
- `module` field is pointing to transpiled ES5 version with ES modules resolution;
- `esnext` field is pointing to the ESNext version with ES modules resolution;

Depending on your targets you may have to use [Webpack](https://webpack.js.org/) and/or
[Babel](http://babeljs.io/) to pull untranspiled version of package.  
See some tips on wiring thing up: [https://2ality.com/2017/06/pkg-esnext.html](https://2ality.com/2017/06/pkg-esnext.html)


## Usage

##### Regular BEM
By default component provides default BEM syntax
```typescript
import { BEM } from "@xobotyi/bem";

// blocks
BEM('block', ['large', 'disabled'], 'random_classname'); // block block_large block_disabled random_classname
// or
BEM('block', { size: 'large', disabled: true }); // block block_size_large block_disabled

// elements
BEM('block', 'element', { size: 'large' }); // block__element block__element_size_large
```

##### Syntax alternation
But you easily can alter any of separators as you wish, add prefix or make modifier-only generation as declared
in BEViS syntax notation.
```typescript
import { BEM } from "@xobotyi/bem";

const myBem = BEM.extend({
  prefix: 'PFX',
  prefixDelimiter: '__',
  elementDelimiter: '-',
  modifierDelimiter: '_',
  modifierValueDelimiter: '_',
  isFullModifier: false,
});

// blocks
myBem('block', ['large', 'disabled']); // PFX__block _large _disabled
// or
myBem('block', { size: 'large', disabled: true }); // PFX__block _size_large _disabled

// elements
BEM('block', 'element', { size: 'large' }); // PFX__block-element _size_large
```

##### Currying
Currying is an approach from functional programming that allow to lock function parameter for easier future use.
It is very convenient for react users.
```typescript jsx
import * as react from "react";
import { BEM } from "@xobotyi/bem";

const b = BEM.lock('block');

function render(){
  return (
    <div className={b()}>
      <span className={b('text', ['running'])}></span>
      <button className={b('button', { active: true })}></button>
    </div>
  );
}
```


### Performance (recent benchmark results)

Benchmark results can be found in the [`benchmark`](/benchmark) directory.

To run benchmarks simply clone this repo and make `yarn && yarn benchmark`.


## Related projects

- [cnbuilder](https://www.npmjs.com/package/cnbuilder) &mdash; Yet another classname string builder (the fastest one).
- [react-scrollbars-custom](https://www.npmjs.com/package/react-scrollbars-custom) &mdash; The best React custom scrollbars component. Allows you to customise scrollbars as you like it, crossbrowser!
- [zoom-level](https://www.npmjs.com/package/zoom-level) &mdash; A comprehensive cross-browser package that allow you to determine page's and element's zoom level.
- [@xobotyi/scrollbar-width](https://www.npmjs.com/package/@xobotyi/scrollbar-width) &mdash; A tool to get browser's scrollbars width.
- [@xobotyi/should-reverse-rtl-scroll](https://www.npmjs.com/package/@xobotyi/should-reverse-rtl-scroll) &mdash; A tool detecting if RTL scroll value should be negative.