import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
  output: {
    sourceMap: {
      js: "source-map",
    },
    assetPrefix: "auto",
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: "auto",
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      // You need to set a unique value that is not equal to other applications
      config.output.uniqueName = "jsHost";
      appendPlugins([
        new ModuleFederationPlugin({
          name: "jsHost",
          // remotes: {
          //   'jsRemote': 'jsRemote@http://localhost:3001/mf-manifest.json',
          // },
          shared: [
            {
              react: {
                singleton: true,
                eager: true,
              },
            },
            {
              "react-dom": {
                singleton: true,
                eager: true,
              },
            },
            {
              "gmd-mf-widget-loader": {
                eager: true,
                singleton: true,
              },
            },
          ],
        }),
      ]);
    },
  },
  plugins: [pluginReact()],
});
