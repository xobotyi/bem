/* eslint-disable no-new */
import * as BEMHelper from 'react-bem-helper';
import { PredicateSet } from 'react-bem-helper';
import * as b from 'b_';
import { BEM as BEMnpm } from '@xobotyi/bem';
import { BEM as BEMlocal } from '../../src';
import { run } from './run';

const showRef = false;

const instances = {
  'react-bem-helper': new BEMHelper({
    name: 'test',
    modifierDelimiter: '_',
    outputIsString: true,
  }),
  BEMBlock: BEMlocal.lock('test'),
  BEMElement: BEMlocal.lock('test', 'element'),
} as const;

run(
  [
    {
      name: 'instance creation',
      data: undefined,
    },
  ],
  {
    'BEM (local)': () => {
      BEMlocal.extend();
    },
    'BEM (local, baked block)': () => {
      BEMlocal.lock('test');
    },
    'BEM (local, baked element)': () => {
      BEMlocal.lock('test', 'element');
    },
    'BEM (npm)': () => {
      BEMnpm.extend();
    },
    b_: () => {
      b.B({});
    },
    'react-bem-helper': () => {
      new BEMHelper({
        name: 'test',
        modifierDelimiter: '_',
        outputIsString: true,
      });
    },
  },
  { showRef }
);

run(
  [
    {
      name: 'block+modifiers',
      data: { block: 'test', modifiers: { disabled: true, size: 'l' } as unknown as PredicateSet },
      reference: 'test test_mod1',
    },
  ],
  {
    'BEM (local)': (data) => BEMlocal(data.block, data.modifiers),
    'BEM (local, baked block)': (data) => instances.BEMBlock(data.modifiers),
    'BEM (npm)': (data) => BEMnpm(data.block, data.modifiers),
    b_: (data) => b(data.block, data.modifiers),
    'react-bem-helper': (data) => instances['react-bem-helper']({ modifiers: data.modifiers }),
  },
  { showRef }
);

run(
  [
    {
      name: 'block+element',
      data: { block: 'test', element: 'element' },
      reference: 'test__element',
    },
  ],
  {
    'BEM (local)': (data) => BEMlocal(data.block, data.element),
    'BEM (local, baked block)': (data) => instances.BEMBlock(data.element),
    'BEM (local, baked element)': () => instances.BEMElement(),
    'BEM (npm)': (data) => BEMnpm(data.block, data.element),
    b_: (data) => b(data.block, data.element),
    'react-bem-helper': (data) => instances['react-bem-helper']({ element: data.element }),
  },
  { showRef }
);

run(
  [
    {
      name: 'block+element+modifiers',
      data: {
        block: 'test',
        element: 'element',
        modifiers: { disabled: true, size: 'l' } as unknown as PredicateSet,
      },
      reference: 'test__element test__element_disabled test__element_size_l',
    },
  ],
  {
    'BEM (local)': (data) => BEMlocal(data.block, data.element, data.modifiers),
    'BEM (local, baked block)': (data) => instances.BEMBlock(data.element, data.modifiers),
    'BEM (local, baked element)': (data) => instances.BEMElement(data.modifiers),
    'BEM (npm)': (data) => BEMnpm(data.block, data.element, data.modifiers),
    b_: (data) => b(data.block, data.element, data.modifiers),
    'react-bem-helper': (data) =>
      instances['react-bem-helper']({ element: data.element, modifiers: data.modifiers }),
  },
  { showRef }
);
