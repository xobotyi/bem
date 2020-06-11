import * as BEMHelper from 'react-bem-helper';
import { PredicateSet } from 'react-bem-helper';
import * as b from 'b_';
import { BEM } from '../..';
import { run } from './run';

const showRef = false;

const reactBemHelperInstances: { [key: string]: BEMHelper<string> } = {};

run(
  [
    {
      name: 'block+modifiers',
      data: { block: 'test', modifiers: ['mod1'] },
      reference: 'test test_mod1',
    },
  ],
  {
    b_: (data) => {
      return b(data.block, data.modifiers);
    },
    'react-bem-helper': (data) => {
      reactBemHelperInstances.simple =
        reactBemHelperInstances.simple ||
        new BEMHelper({
          name: data.block,
          modifierDelimiter: '_',
          outputIsString: true,
        });
      return reactBemHelperInstances.simple({ modifiers: data.modifiers });
    },
    BEM: (data) => {
      return BEM(data.block, data.modifiers);
    },
  },
  { showRef },
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
    b_: (data) => {
      return b(data.block, data.element);
    },
    'react-bem-helper': (data) => {
      reactBemHelperInstances.simple =
        reactBemHelperInstances.simple ||
        new BEMHelper({
          name: data.block,
          modifierDelimiter: '_',
          outputIsString: true,
        });
      return reactBemHelperInstances.simple({ element: data.element });
    },
    BEM: (data) => {
      return BEM(data.block, data.element);
    },
  },
  { showRef },
);

run(
  [
    {
      name: 'block+element+modifiers',
      data: { block: 'test', element: 'element', modifiers: { disabled: true, size: 'l' } },
      reference: 'test__element test__element_disabled test__element_size_l',
    },
  ],
  {
    b_: (data) => {
      return b(data.block, data.element, data.modifiers);
    },
    'react-bem-helper': (data) => {
      reactBemHelperInstances.modifiers =
        reactBemHelperInstances.modifiers ||
        new BEMHelper({ name: data.block, modifierDelimiter: '_', outputIsString: true });
      return reactBemHelperInstances.modifiers({
        element: data.element,
        modifiers: (data.modifiers as unknown) as PredicateSet,
      });
    },
    BEM: (data) => {
      return BEM(data.block, data.element, data.modifiers);
    },
  },
  { showRef },
);
