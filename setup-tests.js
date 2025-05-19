import '@testing-library/jest-dom';

globalThis.import = {
    meta: {
        env: {
            VITE_BASE_URL: 'http://localhost:3000/api/v1', // Substitua conforme necessário
        },
    },
};