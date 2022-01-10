# Benchmarks

OS: Windows 11
CPU: AMD Ryzen 5800H
RAM: 32Gb DDR4 @ 3800MHz

**Nodejs: 16.13**
<pre>
# instance creation
  BEM (local) x 11,074,898 ops/sec ±0.60% (95 runs sampled)
  BEM (local, baked block) x 1,320,689,293 ops/sec ±0.38% (91 runs sampled)
  BEM (local, baked element) x 1,177,278,497 ops/sec ±0.16% (97 runs sampled)
  b_ x 133,782,471 ops/sec ±1.18% (92 runs sampled)
  react-bem-helper x 20,897,287 ops/sec ±0.56% (94 runs sampled)
 Fastest is BEM (local, baked block)

# block
  BEM (local) x 1,185,462,340 ops/sec ±0.15% (95 runs sampled)
  BEM (local, baked block) x 1,187,527,399 ops/sec ±0.18% (98 runs sampled)
  b_ x 234,750,969 ops/sec ±0.39% (96 runs sampled)
  react-bem-helper x 3,339,088 ops/sec ±0.46% (93 runs sampled)
 Fastest is BEM (local, baked block),BEM (local)

# block+modifiers
  BEM (local) x 12,768,471 ops/sec ±0.84% (94 runs sampled)
  BEM (local, baked block) x 13,347,178 ops/sec ±0.40% (94 runs sampled)
  b_ x 13,101,879 ops/sec ±0.80% (92 runs sampled)
  react-bem-helper x 1,289,896 ops/sec ±0.80% (93 runs sampled)
 Fastest is BEM (local, baked block)

# block+element
  BEM (local) x 931,711,151 ops/sec ±22.89% (79 runs sampled)
  BEM (local, baked block) x 151,249,568 ops/sec ±2.64% (88 runs sampled)
  BEM (local, baked element) x 148,957,435 ops/sec ±2.66% (85 runs sampled)
  b_ x 111,186,547 ops/sec ±4.57% (88 runs sampled)
  react-bem-helper x 3,035,418 ops/sec ±0.38% (95 runs sampled)
 Fastest is BEM (local)

# block+element+modifiers
  BEM (local) x 16,382,847 ops/sec ±0.81% (91 runs sampled)
  BEM (local, baked block) x 17,265,704 ops/sec ±1.01% (86 runs sampled)
  BEM (local, baked element) x 20,694,804 ops/sec ±0.60% (94 runs sampled)
  b_ x 13,359,016 ops/sec ±0.78% (93 runs sampled)
  react-bem-helper x 1,188,931 ops/sec ±0.36% (93 runs sampled)
 Fastest is BEM (local, baked element)
</pre>

**Chrome 97**
<pre>
# instance creation
  BEM (local) x 10,980,540 ops/sec ±0.54% (67 runs sampled)
  BEM (local, baked block) x 1,157,911,315 ops/sec ±0.45% (68 runs sampled)
  BEM (local, baked element) x 1,199,528,711 ops/sec ±0.17% (69 runs sampled)
  b_ x 304,081,619 ops/sec ±0.95% (67 runs sampled)
  react-bem-helper x 20,824,750 ops/sec ±0.83% (67 runs sampled)
 Fastest is BEM (local, baked element)

# block
  BEM (local) x 1,199,999,978 ops/sec ±0.20% (67 runs sampled)
  BEM (local, baked block) x 1,201,944,794 ops/sec ±0.25% (67 runs sampled)
  b_ x 238,580,351 ops/sec ±0.25% (68 runs sampled)
  react-bem-helper x 4,788,631 ops/sec ±0.60% (67 runs sampled)
 Fastest is BEM (local, baked block),BEM (local)

# block+modifiers
  BEM (local) x 15,595,057 ops/sec ±0.43% (66 runs sampled)
  BEM (local, baked block) x 15,850,754 ops/sec ±0.52% (68 runs sampled)
  b_ x 15,169,811 ops/sec ±0.42% (68 runs sampled)
  react-bem-helper x 1,525,234 ops/sec ±0.28% (67 runs sampled)
 Fastest is BEM (local, baked block)

# block+element
  BEM (local) x 1,195,445,538 ops/sec ±0.21% (68 runs sampled)
  BEM (local, baked block) x 1,198,451,842 ops/sec ±0.17% (68 runs sampled)
  BEM (local, baked element) x 1,202,704,907 ops/sec ±0.26% (69 runs sampled)
  b_ x 110,950,697 ops/sec ±5.76% (60 runs sampled)
  react-bem-helper x 3,693,737 ops/sec ±0.44% (66 runs sampled)
 Fastest is BEM (local, baked element)

# block+element+modifiers
  BEM (local) x 19,417,468 ops/sec ±0.93% (66 runs sampled)
  BEM (local, baked block) x 21,950,951 ops/sec ±0.81% (66 runs sampled)
  BEM (local, baked element) x 27,679,105 ops/sec ±1.05% (66 runs sampled)
  b_ x 15,444,338 ops/sec ±0.97% (61 runs sampled)
  react-bem-helper x 1,383,640 ops/sec ±0.39% (68 runs sampled)
 Fastest is BEM (local, baked element)
</pre>

**Firefox 95**
<pre>
# instance creation
  BEM (local) x 5,823,958 ops/sec ±1.46% (65 runs sampled)
  BEM (local, baked block) x 29,756,571 ops/sec ±0.90% (66 runs sampled)
  BEM (local, baked element) x 2,039,548,851 ops/sec ±1.03% (65 runs sampled)
  b_ x 11,215,479 ops/sec ±1.42% (63 runs sampled)
  react-bem-helper x 9,880,741 ops/sec ±0.77% (66 runs sampled)
 Fastest is BEM (local, baked element)

# block
  BEM (local) x 90,877,279 ops/sec ±1.09% (66 runs sampled)
  BEM (local, baked block) x 102,315,428 ops/sec ±1.01% (61 runs sampled)
  b_ x 76,702,821 ops/sec ±1.34% (66 runs sampled)
  react-bem-helper x 6,596,908 ops/sec ±1.30% (66 runs sampled)
 Fastest is BEM (local, baked block)

# block+modifiers
  BEM (local) x 8,115,217 ops/sec ±0.91% (66 runs sampled)
  BEM (local, baked block) x 8,167,807 ops/sec ±0.98% (65 runs sampled)
  b_ x 8,394,282 ops/sec ±1.14% (65 runs sampled)
  react-bem-helper x 1,288,846 ops/sec ±0.75% (65 runs sampled)
 Fastest is b_

# block+element
  BEM (local) x 33,441,126 ops/sec ±1.04% (65 runs sampled)
  BEM (local, baked block) x 34,210,838 ops/sec ±0.90% (66 runs sampled)
  BEM (local, baked element) x 95,230,385 ops/sec ±1.39% (64 runs sampled)
  b_ x 32,569,264 ops/sec ±1.00% (67 runs sampled)
  react-bem-helper x 5,777,022 ops/sec ±1.13% (66 runs sampled)
 Fastest is BEM (local, baked element)

# block+element+modifiers
  BEM (local) x 6,007,393 ops/sec ±1.19% (65 runs sampled)
  BEM (local, baked block) x 5,995,760 ops/sec ±1.30% (66 runs sampled)
  BEM (local, baked element) x 6,784,233 ops/sec ±0.99% (65 runs sampled)
  b_ x 6,537,527 ops/sec ±0.98% (67 runs sampled)
  react-bem-helper x 1,145,303 ops/sec ±0.78% (66 runs sampled)
 Fastest is BEM (local, baked element)
</pre>
