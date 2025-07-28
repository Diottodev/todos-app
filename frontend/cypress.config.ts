import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    screenshotOnRunFailure: false,
  },

  component: {
    screenshotOnRunFailure: false,
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
