module.exports = {
  root: true,
  extends: ['@xobotyi/eslint-config/base', '@xobotyi/eslint-config/typescript'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: '*.ts',
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
};
