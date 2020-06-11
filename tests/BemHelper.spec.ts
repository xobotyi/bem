import { BemHelper, BemBuilder } from '../src';

describe('BemHelper', () => {
  it('should be defined', () => {
    expect(BemHelper).toBeDefined();
  });

  describe('stringifyModifiers', () => {
    it('should be defined', () => {
      const helper = new BemBuilder();

      expect(helper.stringifyModifiers).toBeDefined();
    });

    it('should return string if modifier is an array', () => {
      const helper = new BemBuilder();
      expect(helper.stringifyModifiers('a', ['b', 'c'])).toBe(' a_b a_c');
    });

    it('should return string if modifier is an object', () => {
      const helper = new BemBuilder();

      expect(helper.stringifyModifiers('a', { a: true, b: true })).toBe(' a_a a_b');
    });

    it('should properly handle key-value modifiers', () => {
      const helper = new BemBuilder();

      expect(helper.stringifyModifiers('a', { is: 'valid', c: 123 })).toBe(' a_is_valid a_c_123');
    });

    it('should use custom modifier and modifier value delimiter', () => {
      const helper = new BemBuilder({ modifierValueDelimiter: '-', modifierDelimiter: '--' });

      expect(helper.stringifyModifiers('a', { is: 'valid', c: 123 })).toBe(' a--is-valid a--c-123');
    });

    it('should ignore non-string element in array of modifiers', () => {
      const helper = new BemBuilder();

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      expect(helper.stringifyModifiers('a', [() => {}])).toBe('');
    });
  });

  describe('stringify', () => {
    it('should be defined', () => {
      const helper = new BemBuilder();

      expect(helper.stringify).toBeDefined();
    });

    it('should properly join prefix, prefix delimiter and block', () => {
      const helper = new BemBuilder({ prefix: 'NTS', prefixDelimiter: '--' });

      expect(helper.stringify('a')).toBe('NTS--a');
    });

    it('should attach element name using element delimiter', () => {
      const helper = new BemBuilder({ elementDelimiter: '--' });

      expect(helper.stringify('a', 'b')).toBe('a--b');
    });

    it('should attach modifiers', () => {
      const helper = new BemBuilder();

      expect(helper.stringify('a', ['c'])).toBe('a a_c');
      expect(helper.stringify('a', 'b', ['c'])).toBe('a__b a__b_c');
    });

    it('should not attach empty or invalid modifiers', () => {
      const helper = new BemBuilder();
      expect(helper.stringify('a', { c: false })).toBe('a');
    });
  });

  it('should be callable with call arguments to build block name (1-3 args, 2nd is modifiers)', () => {
    expect(BemHelper('a')).toBe('a');
    expect(BemHelper('a', ['b'])).toBe('a a_b');
    expect(BemHelper('a', ['b'], 'extra')).toBe('a a_b extra');
  });

  it('should be callable with call arguments to build element name (2-4 args, 3nd is modifiers)', () => {
    expect(BemHelper('a', 'b')).toBe('a__b');
    expect(BemHelper('a', 'b', ['c'])).toBe('a__b a__b_c');
    expect(BemHelper('a', 'b', ['c'], 'extra')).toBe('a__b a__b_c extra');
  });

  it('should apply custom delimiters via extension with options object', () => {
    const b = BemHelper.extend({
      prefixDelimiter: '--',
      modifierDelimiter: '--',
      elementDelimiter: '--',
      modifierValueDelimiter: '--',
    });

    expect(b('a', 'b', { c: 123 })).toBe('a--b a--b--c--123');
  });

  it('should be extendable multiple times', () => {
    const b = BemHelper.extend({
      prefixDelimiter: '--',
      modifierDelimiter: '--',
      elementDelimiter: '--',
      modifierValueDelimiter: '--',
    });
    const bem = b.extend({ prefix: 'NTS', isFullModifier: false });

    expect(bem('a', 'b', { c: 123 })).toBe('NTS--a--b --c--123');
  });

  it('should carry arguments with .lock call', () => {
    const block = BemHelper.lock('blockName');

    expect(block()).toBe('blockName');
    expect(block(['a'], 'test')).toBe('blockName blockName_a test');

    const element = BemHelper.lock('blockName', 'element');

    expect(element()).toBe('blockName__element');
    expect(element(['a'], 'test')).toBe('blockName__element blockName__element_a test');
  });
});
