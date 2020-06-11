<div align="center">
  <h1>@xobotiy/bem</h1>
  <p>The fastest BEM class name generator</p>
  <p>
    <a href="https://travis-ci.org/xobotyi/bem">
        <img src="https://flat.badgen.net/travis/xobotyi/bem" alt="Build status"/>
    </a>
    <a href="https://www.npmjs.com/package/@xobotiy/bem">
        <img src="https://flat.badgen.net/npm/v/@xobotiy/bem" alt="NPM version"/>
    </a>
    <a href="https://www.npmjs.com/package/@xobotiy/bem">
        <img src="https://flat.badgen.net/npm/dw/@xobotiy/bem" alt="NPM weekly downloads"/>
    </a>
    <a href="https://www.npmjs.com/package/@xobotiy/bem">
        <img src="https://flat.badgen.net/npm/license/@xobotiy/bem" alt="License"/>
    </a>
    <a href="https://www.npmjs.com/package/@xobotiy/bem">
        <img src="https://flat.badgen.net/npm/types/@xobotiy/bem" alt="Types definition"/>
    </a>
    <a href="https://www.codacy.com/manual/xobotyi/bem">
        <img src="https://flat.badgen.net/codacy/grade/41452ebba00f442dab5ab31b7be6c9d1" alt="Codacy Code Grade"/>
    </a>
    <a href="https://www.codacy.com/manual/xobotyi/bem">
        <img src="https://flat.badgen.net/codacy/coverage/41452ebba00f442dab5ab31b7be6c9d1" alt="Tests LOC"/>
    </a>
  </p>
</div>

---

<div align="center">❤️Please consider starring this project to show your love and support.🙌</div>

---

As handwriting BEM-compatible class names is quite painful and `react-bem-helper` really slow and does not fully support
all BEM concepts, this package exists.

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
import { BEM } from "@xobotiy/bem";

export const B = new BEM({ prefix: 'NTS' });
const block = b.lock('blockName');

export function component(){
  return (
    <div className={ block({ size:'l' }) }>
      <div className={ block('wrapperElement') }>
        <div className={ block('headerElement', { size: 'l' }) }>Block title</div>
        <button className={ block('buttonElement', { 'left':true, size:'l', disabled:true }) }>Button left</button>
        <button className={ block('buttonElement', { 'right':true, size:'l' }) }>Button right</button>
      </div>
    </div>
  );
}
```
