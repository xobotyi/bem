const isArr = Array.isArray;

export type BemModifiers = Array<string | number> | Record<string | number, any>;

export function buildModifiers(
  modifiers: BemModifiers,
  prefix: string,
  delimiter: string,
  valueDelimiter: string
): string {
  if (typeof modifiers !== 'object') return '';

  let res = '';

  if (isArr(modifiers)) {
    const l = modifiers.length;
    let i = 0;
    let v;

    while (i < l) {
      v = modifiers[i++];
      if (typeof v === 'string') {
        if (v) {
          res += ` ${prefix}${delimiter}${v}`;
        }
      } else if (typeof v === 'number') {
        res += ` ${prefix}${delimiter}${v}`;
      }
    }

    return res;
  }

  let k: string | number;
  let v: any;
  // for..in syntax is 4+ times faster than Object.entries.forEach and other such ways.
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (k in modifiers) {
    v = modifiers[k];
    if (typeof v === 'string') {
      if (v) {
        res += ` ${prefix}${delimiter}${k}${valueDelimiter}${v}`;
      }
    } else if (typeof v === 'number') {
      res += ` ${prefix}${delimiter}${k}${valueDelimiter}${v}`;
    } else if (v) {
      res += ` ${prefix}${delimiter}${k}`;
    }
  }

  return res;
}
