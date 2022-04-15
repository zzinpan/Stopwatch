import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {

  verbose: true,

  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: [ '<rootDir>/node_modules/' ],
  testMatch: [
      "<rootDir>/test/**/*.test.ts"
  ]

};

export default config;