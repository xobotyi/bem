# Benchmarks

OS: Windows 10  
CPU: AMD Ryzen 3950x  
RAM: 32Gb DDR4 @ 3800MHz

**Nodejs: 13.13**
<pre>
# block+modifiers
  b_ x 3,990,774 ops/sec ±0.30% (94 runs sampled)
  react-bem-helper x 1,316,977 ops/sec ±0.23% (94 runs sampled)
  BEM x 40,048,279 ops/sec ±2.07% (89 runs sampled)
 Fastest is BEM

# block+element
  b_ x 117,523,543 ops/sec ±1.10% (96 runs sampled)
  react-bem-helper x 2,103,110 ops/sec ±0.22% (96 runs sampled)
  BEM x 1,360,071,231 ops/sec ±0.22% (96 runs sampled)
 Fastest is BEM

# block+element+modifiers
  b_ x 9,105,245 ops/sec ±0.79% (91 runs sampled)
  react-bem-helper x 762,111 ops/sec ±0.23% (96 runs sampled)
  BEM x 15,916,897 ops/sec ±0.85% (92 runs sampled)
 Fastest is BEM
</pre>

**Chrome 81**
<pre>
# block+modifiers
  b_ x 4,307,858 ops/sec ±0.69% (65 runs sampled)
  react-bem-helper x 1,454,489 ops/sec ±0.35% (67 runs sampled)
  BEM x 38,742,961 ops/sec ±1.78% (65 runs sampled)
 Fastest is BEM

# block+element
  b_ x 120,234,903 ops/sec ±0.57% (65 runs sampled)
  react-bem-helper x 2,273,810 ops/sec ±0.22% (67 runs sampled)
  BEM x 1,366,234,496 ops/sec ±0.28% (66 runs sampled)
 Fastest is BEM

# block+element+modifiers
  b_ x 9,442,649 ops/sec ±0.70% (65 runs sampled)
  react-bem-helper x 871,145 ops/sec ±0.33% (69 runs sampled)
  BEM x 16,792,060 ops/sec ±1.31% (67 runs sampled)
 Fastest is BEM
</pre>

**Firefox 77.0.1**
<pre>
# block+modifiers
  b_ x 1,045,098 ops/sec ±4.15% (63 runs sampled)
  react-bem-helper x 2,387,033 ops/sec ±0.32% (66 runs sampled)
  BEM x 6,754,178 ops/sec ±0.51% (53 runs sampled)
 Fastest is BEM

# block+element
  b_ x 15,846,023 ops/sec ±1.02% (65 runs sampled)
  react-bem-helper x 5,262,933 ops/sec ±0.43% (66 runs sampled)
  BEM x 19,095,687 ops/sec ±0.34% (68 runs sampled)
 Fastest is BEM

# block+element+modifiers
  b_ x 4,150,414 ops/sec ±0.36% (66 runs sampled)
  react-bem-helper x 1,074,604 ops/sec ±0.38% (66 runs sampled)
  BEM x 5,315,760 ops/sec ±1.13% (65 runs sampled)
 Fastest is BEM
</pre>