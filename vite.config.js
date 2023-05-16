import { loadEnv } from 'vite';
// import { viteMockServe } from 'vite-plugin-mock';
import { createVuePlugin } from 'vite-plugin-vue2';
import { createSvgPlugin } from 'vite-plugin-vue2-svg';

import path from 'path';

const CWD = process.cwd();

export default ({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD);

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
        },
      },
    },

    plugins: [
      createVuePlugin({
        jsx: true,
      }),
      // viteMockServe({
      //   mockPath: 'mock',
      //   localEnabled: true,
      // }),
      createSvgPlugin(),
    ],

    build: {
      cssCodeSplit: false,
    },

    server: {
      host: '127.0.0.1',
      port: 3001,
      proxy: {
        '/api': {
          target: 'http://81.70.198.37:9999',
          rewrite: (path) => path.replace(/^\/api/, '/'),
          changeOrigin: true,
        },
      },
    },
  };
};
