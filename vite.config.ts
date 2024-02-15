/// <reference types="vitest" />
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react(), legacy()],
  envDir: join(process.cwd(), './environments'),
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
