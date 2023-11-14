// vite.config.ts
import { createRequire } from 'module';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { RollupCommonJSOptions } from '@rollup/plugin-commonjs';

const require = createRequire(import.meta.url);

export default defineConfig({

  plugins: [react()],
  mode: "production",
  build: {
    lib: {
      entry: 'src/components/widget.tsx',
      name: 'ChatWidget',
      formats: ['es','umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    // Bugfix required to handle issue with vite, rollup and libs (like react-phone-input-2)
    commonjsOptions: {
      defaultIsModuleExports(id) {
        try {
          const module = require(id);
          if (module?.default) {
            return false;
          }
          return 'auto';
        } catch (error) {
          return 'auto';
        }
      },
      transformMixedEsModules: true,
    } as RollupCommonJSOptions,
  },
  optimizeDeps: {
    include: ['esm-dep > cjs-dep'],
  },
});