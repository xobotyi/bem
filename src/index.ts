import { ClassValue, cnb } from 'cnbuilder';

export interface IBemOptions {
  prefix: string;
  prefixDelimiter: string;
  elementDelimiter: string;
  modifierDelimiter: string;
  modifierValueDelimiter: string;
  isFullModifier: boolean;
}

export type IBemHelperModifiers = string[] | ({ [mod: string]: any } | { [mod: number]: any });

const isArr = Array.isArray;
const hasOwnProp = Object.prototype.hasOwnProperty;

const DEFAULT_OPTIONS: IBemOptions = {
  prefix: '',
  prefixDelimiter: '-',
  elementDelimiter: '__',
  modifierDelimiter: '_',
  modifierValueDelimiter: '_',
  isFullModifier: true,
};

export class BemBuilder {
  readonly options: IBemOptions;

  constructor(options: Partial<IBemOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS };

    if (typeof options.prefix !== 'undefined') this.options.prefix = options.prefix;
    if (typeof options.prefixDelimiter !== 'undefined') this.options.prefixDelimiter = options.prefixDelimiter;
    if (typeof options.elementDelimiter !== 'undefined') this.options.elementDelimiter = options.elementDelimiter;
    if (typeof options.modifierDelimiter !== 'undefined') this.options.modifierDelimiter = options.modifierDelimiter;
    if (typeof options.modifierValueDelimiter !== 'undefined')
      this.options.modifierValueDelimiter = options.modifierValueDelimiter;
    if (typeof options.isFullModifier !== 'undefined') this.options.isFullModifier = options.isFullModifier;
  }

  stringifyModifiers(prefix: string, modifiers: IBemHelperModifiers): string {
    let mod: string;
    let res = '';

    if (isArr(modifiers)) {
      for (let i = 0; i < modifiers.length; i++) {
        mod = modifiers[i];

        // as array entry can be non-string we have to check it
        if (typeof mod === 'string') res += ` ${prefix}${this.options.modifierDelimiter}${mod}`;
      }

      return res;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (mod in modifiers) {
      /* istanbul ignore next */
      if (hasOwnProp.call(modifiers, mod)) {
        // key-value modifiers should be joined with appropriate separator
        if (typeof modifiers[mod] === 'number' || typeof modifiers[mod] === 'string') {
          // eslint-disable-next-line max-len
          res += ` ${prefix}${this.options.modifierDelimiter}${mod}${this.options.modifierValueDelimiter}${modifiers[mod]}`;
        }
        // only name should be used otherwise
        else if (modifiers[mod]) {
          res += ` ${prefix}${this.options.modifierDelimiter}${mod}`;
        }
      }
    }

    return res;
  }

  stringify(block: string, modifiers?: IBemHelperModifiers, extra?: ClassValue): string;

  stringify(block: string, element: string, modifiers?: IBemHelperModifiers, extra?: ClassValue): string;

  stringify(
    block: string,
    element?: string | IBemHelperModifiers,
    modifiers?: IBemHelperModifiers | ClassValue,
    extra?: ClassValue,
  ): string;

  stringify(
    block: string,
    element?: string | IBemHelperModifiers,
    modifiers?: IBemHelperModifiers | ClassValue,
    extra?: ClassValue,
  ): string {
    let res = `${this.options.prefix && `${this.options.prefix}${this.options.prefixDelimiter}`}${block}`;

    if (typeof element === 'object') {
      extra = modifiers;
      modifiers = element;
      element = undefined;
    }

    if (element) res += `${this.options.elementDelimiter}${element}`;

    // build modifiers string and append it
    if (modifiers) {
      modifiers = this.stringifyModifiers(this.options.isFullModifier ? res : '', modifiers as IBemHelperModifiers);

      if (modifiers) res += modifiers;
    }

    return extra ? cnb(res, extra) : res;
  }
}

type IStringifier = typeof BemBuilder.prototype.stringify;

interface IBlockStringifier {
  (modifiers?: IBemHelperModifiers, extra?: ClassValue): string;

  (element: string, modifiers?: IBemHelperModifiers, extra?: ClassValue): string;

  (element?: string | IBemHelperModifiers, modifiers?: IBemHelperModifiers | ClassValue, extra?: ClassValue): string;
}

interface IElementStringifier {
  (modifiers?: IBemHelperModifiers, extra?: ClassValue): string;
}

interface IStringifierProps {
  lock(block: string): IBlockStringifier;

  lock(block: string, element: string): IElementStringifier;

  lock(...args: Parameters<IStringifier>);

  extend(options?: Partial<IBemOptions>): IStringifierWithProps;
}

type IStringifierWithProps = IStringifier & IStringifierProps;

function carry(block: string): IBlockStringifier;
function carry(block: string, element: string): IElementStringifier;
function carry(this: IStringifierWithProps, ...args: Parameters<IStringifier>) {
  return this.bind(this, ...args);
}

function createStringifier(options: Partial<IBemOptions> = {}): IStringifierWithProps {
  const helper: BemBuilder = new BemBuilder(options);
  const fn: IStringifier & Partial<IStringifierProps> = helper.stringify.bind(helper);

  fn.lock = carry;
  // eslint-disable-next-line no-shadow
  fn.extend = (options: Partial<IBemOptions>) => createStringifier({ ...helper.options, ...options });

  return fn as IStringifierWithProps;
}

export const BemHelper = createStringifier();
