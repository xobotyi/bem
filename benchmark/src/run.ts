import { Suite } from 'benchmark';

const outputFn =
  typeof document === 'undefined'
    ? // eslint-disable-next-line no-console
      console.log
    : (text) => {
        document.body.innerHTML += `${text.replace('\n', '<br/>')}<br/>`;
      };

export function run<T, R = any>(
  testData: { name: string; data: T; reference?: R }[],
  libraries: { [name: string]: (data: T) => R },
  { showRef = true }: { showRef?: boolean } = {},
) {
  testData.forEach((test) => {
    const suite = new Suite(test.name, {
      onStart: () => {
        outputFn(`\n# ${test.name}${test.reference && showRef ? ` [reference: '${test.reference}']` : ''}`);
      },
      onCycle: (ev) => {
        outputFn(`  ${String(ev.target)} ${test.reference && showRef ? `[${ev.target.fn(test.data)}]` : ''}`);
      },
      onComplete: (ev) => {
        outputFn(` Fastest is ${ev.currentTarget.filter('fastest').map('name')}`);
      },
    });

    Object.entries(libraries).forEach(([name, fn]) => {
      suite.add(name, () => fn(test.data));
    });

    suite.run();
  });
}
