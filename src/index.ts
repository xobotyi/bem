import { ClassValue, cnb } from 'cnbuilder';
import { BEMModifiers, buildModifiers } from './buildModifiers';

export interface BEMOptions {
  /**
   *
   */
  prefix: string;

  prefixDelimiter: string;
  elementDelimiter: string;
  modifierDelimiter: string;
  modifierValueDelimiter: string;

  /**
   * Add full classname before modifier. 4ex: in case this option is `false`
   * modifiers set will be as followed
   * ```
   * ns__block__element _foo _bar-baz
   * ```
   * and
   * ```
   * ns__block__element ns__block__element_foo ns__block__element _bar-baz
   * ```
   * in case of `true`.
   */
  fullModifier: boolean;
}

const defaultOptions: BEMOptions = {
  prefix: '',

  prefixDelimiter: '__',
  elementDelimiter: '__',
  modifierDelimiter: '_',
  modifierValueDelimiter: '-',

  fullModifier: true,
};

const addModifiersAndExtra = (
  o: BEMOptions,
  prefix: string,
  modifiers?: BEMModifiers,
  extra?: ClassValue
): string => {
  if (typeof modifiers !== 'undefined') {
    const m = buildModifiers(
      modifiers,
      o.fullModifier ? prefix : '',
      o.modifierDelimiter,
      o.modifierValueDelimiter
    );

    if (m) prefix += m;
  }

  return typeof extra !== 'undefined' ? cnb(prefix, extra) : prefix;
};

type ElementStringifier = (modifiers?: BEMModifiers, extra?: ClassValue) => string;

const createElementStringifier = (o: BEMOptions, prefix: string): ElementStringifier =>
  addModifiersAndExtra.bind(undefined, o, prefix);

interface BlockStringifier {
  (modifiers?: BEMModifiers, extra?: ClassValue): string;

  (element: string, modifiers?: BEMModifiers, extra?: ClassValue): string;

  lock(element: string): ElementStringifier;
}

const createBlockStringifier = (o: BEMOptions, prefix: string): BlockStringifier => {
  const stringifier: BlockStringifier = ((
    element?: string | BEMModifiers,
    modifiers?: BEMModifiers | ClassValue,
    extra?: ClassValue
  ) => {
    let res = prefix;

    if (typeof element === 'object') {
      extra = modifiers;
      modifiers = element;
      element = undefined;
    }

    if (typeof element !== 'undefined') res += `${o.elementDelimiter}${element}`;

    return addModifiersAndExtra(o, res, modifiers as BEMModifiers, extra);
  }) as any;

  stringifier.lock = (element: string) =>
    createElementStringifier(o, `${prefix}${o.elementDelimiter}${element}`);

  return stringifier;
};

interface BEMStringifier {
  (block: string, modifiers?: BEMModifiers, extra?: ClassValue): string;

  (block: string, element: string, modifiers?: BEMModifiers, extra?: ClassValue): string;

  lock(block: string): BlockStringifier;

  lock(block: string, element: string): ElementStringifier;

  lock(block: string, element?: string): BlockStringifier | ElementStringifier;

  extend(options?: Partial<BEMOptions>): BEMStringifier;
}

const createBEMStringifier = (o: BEMOptions, prefix: string): BEMStringifier => {
  const stringifier: BEMStringifier = ((
    block: string,
    element?: string | BEMModifiers,
    modifiers?: BEMModifiers | ClassValue,
    extra?: ClassValue
  ) => {
    let res = prefix + block;

    if (typeof element === 'object') {
      extra = modifiers;
      modifiers = element;
      element = undefined;
    }

    if (typeof element !== 'undefined') res += `${o.elementDelimiter}${element}`;

    return addModifiersAndExtra(o, res, modifiers as BEMModifiers, extra);
  }) as any;

  stringifier.lock = (block: string, element?: string) => {
    if (typeof element === 'undefined') {
      return createBlockStringifier(o, `${prefix}${block}`);
    }

    return createElementStringifier(o, `${prefix}${block}${o.elementDelimiter}${element}`) as any;
  };

  stringifier.extend = (options) => {
    const newO = { ...o, ...options };
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let prefix = '';

    if (newO.prefix) prefix += `${newO.prefix}${newO.prefixDelimiter}`;

    return createBEMStringifier(newO, prefix);
  };

  return stringifier;
};

const constructBEM = (
  o: BEMOptions,
  bakedBlock?: string,
  bakedElement?: string
): BEMStringifier | BlockStringifier | ElementStringifier => {
  let prefix = '';

  if (o.prefix) prefix += `${o.prefix}${o.prefixDelimiter}`;

  if (typeof bakedElement !== 'undefined') {
    return createElementStringifier(o, `${prefix}${o.elementDelimiter}${bakedElement}`);
  }

  if (typeof bakedBlock !== 'undefined') {
    return createBlockStringifier(o, `${prefix}${bakedBlock}`);
  }

  return createBEMStringifier(o, prefix);
};

export const BEM = constructBEM(defaultOptions) as BEMStringifier;
