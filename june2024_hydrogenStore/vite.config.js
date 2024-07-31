import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
  },
  ssr: {
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: [
        'lodash/memoize',
        'lodash/find',
        'lodash/every',
        'lodash/mapValues',
        'lodash/some',
        'lodash/range',
        'lodash/first',
        'lodash/isBoolean',
        'lodash/isPlainObject',
        'lodash/minBy',
        'lodash/maxBy',
        'prop-types',
        'lodash/last',
        'lodash/isEqual',
        'lodash/flatMap',
        'lodash/min',
        'lodash/max',
        'lodash/throttle',
        'lodash/sortBy',
        'lodash/uniqBy',
        'lodash/upperFirst',
        'lodash/isNumber',
        'lodash/isNaN',
        'react-is',
        'lodash/isObject',
        'lodash/isFunction',
        'lodash/isString',
        'lodash/isNil',
        'lodash/get',
        'recharts',
      ],
    },
  },
});
