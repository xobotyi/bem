import { BEM } from '../src';

describe('BEM', () => {
  it('should be defined', () => {
    expect(BEM).toBeDefined();
  });

  it('should apply prefix if defined', () => {
    const b = BEM.extend({ prefix: 'ns' });

    expect(b('block')).toBe('ns__block');
    expect(b('block', 'element')).toBe('ns__block__element');
  });

  it('should apply specified delimiters', () => {
    const b = BEM.extend({
      prefix: 'ns',
      prefixDelimiter: '**',
      elementDelimiter: '**',
      modifierDelimiter: '**',
      modifierValueDelimiter: '*',
    });

    expect(b('block')).toBe('ns**block');
    expect(b('block', { foo: true, bar: 'baz' })).toBe(
      'ns**block ns**block**foo ns**block**bar*baz'
    );
    expect(b('block', 'element')).toBe('ns**block**element');
    expect(b('block', 'element', { foo: true, bar: 'baz' })).toBe(
      'ns**block**element ns**block**element**foo ns**block**element**bar*baz'
    );
  });

  it('should apply extra classnames after modifiers set', () => {
    expect(BEM('block', ['foo'], 'extraClassname')).toBe('block block_foo extraClassname');
    expect(BEM('block', 'element', ['foo'], 'extraClassname')).toBe(
      'block__element block__element_foo extraClassname'
    );
  });

  it('should properly apply modifiers in case of non-full specification', () => {
    const b = BEM.extend({ fullModifier: false });

    expect(b('block', ['foo'])).toBe('block _foo');
    expect(b('block', 'element', ['foo'])).toBe('block__element _foo');
  });

  describe('baked block', () => {
    it('should properly bake in block name', () => {
      const b = BEM.extend({ prefix: 'ns' });

      expect(b.lock('block')()).toBe('ns__block');
      expect(b.lock('block')(['foo'], 'extra')).toBe('ns__block ns__block_foo extra');
      expect(b.lock('block')('element')).toBe('ns__block__element');
      expect(b.lock('block')('element', ['foo'])).toBe('ns__block__element ns__block__element_foo');
      expect(b.lock('block')('element', { foo: true }, 'extra')).toBe(
        'ns__block__element ns__block__element_foo extra'
      );
    });
  });

  describe('baked element', () => {
    it('should properly bake in block name', () => {
      const b = BEM.extend({ prefix: 'ns' });

      expect(b.lock('block', 'element')()).toBe('ns__block__element');
      expect(b.lock('block', 'element')(['foo'])).toBe('ns__block__element ns__block__element_foo');
      expect(b.lock('block', 'element')({ foo: true })).toBe(
        'ns__block__element ns__block__element_foo'
      );
    });

    it('should be bakable from baked block', () => {
      const b = BEM.extend({ prefix: 'ns' });

      expect(b.lock('block').lock('element')()).toBe('ns__block__element');
      expect(b.lock('block').lock('element')(['foo'])).toBe(
        'ns__block__element ns__block__element_foo'
      );
    });
  });
});
