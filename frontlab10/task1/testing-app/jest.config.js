export default {
preset: 'ts-jest',
testEnvironment: 'jsdom',
setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/react',
    '^react-dom$': '<rootDir>/node_modules/react-dom',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
},
transform: {
    '^.+\\.tsx?$': 'ts-jest'
}
};