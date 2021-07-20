module.exports = {
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    testMatch: [
        '<rootDir>/**/*.test.(js|ts)', '<rootDir>/(tests/unit/**/*.spec.(js|ts)|**/__tests__/*.(js|ts))',
    ],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    collectCoverage: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'clover', 'cobertura'],
    reporters: ['default', 'jest-junit'],
    testResultsProcessor: 'jest-junit',
};
