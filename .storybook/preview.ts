import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { themes } from "@storybook/theming";
import '../src/index.css';
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();

export const loaders = [mswLoader]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...MINIMAL_VIEWPORTS
    }
  }
}
