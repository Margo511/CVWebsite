import { register } from 'node:module';

// SSR checks verify markup; Vite and browser QA verify the actual styles.
register('./css-loader.mjs', import.meta.url);
