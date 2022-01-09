import { buildModifiers } from '../src/buildModifiers';

describe('buildModifiers', () => {
  it('should be defined', () => {
    expect(buildModifiers).toBeDefined();
  });

  it('should return empty string in case of non-object input', () => {
    // @ts-expect-error tests of inappropriate use
    expect(buildModifiers(1)).toBe('');
    // @ts-expect-error tests of inappropriate use
    expect(buildModifiers('hey')).toBe('');
    // @ts-expect-error tests of inappropriate use
    expect(buildModifiers(false)).toBe('');
  });

  it('should properly build array modifiers', () => {
    expect(buildModifiers(['b', 1, 'd'], 'a', '_', '-')).toBe(' a_b a_1 a_d');
  });

  it('should properly build object modifiers', () => {
    expect(buildModifiers({ b: 'c', d: true, e: false, f: 1 }, 'a', '_', '-')).toBe(
      ' a_b-c a_d a_f-1'
    );
  });

  it('should ignore invalid array modifiers', () => {
    expect(buildModifiers([true, null, {}], 'a', '_', '-')).toBe('');
  });
});
