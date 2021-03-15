const path = require("path");
const CopyPlugin = require("copy-webpack-plugin")
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin")

const baseManifest = require("./chrome/manifest.json")

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        background: path.join(__dirname, "./src/background/index.js"),
        scripts: path.join(__dirname, "./src/scripts/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ["*", ".js"]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "chrome/icons",
                    to: "icons"
                },
                {
                    from: "chrome/popup",
                    to: "popup"
                },
                {
                    from: 'chrome/css',
                    to: ''
                }
            ]
        }),
        new WebpackExtensionManifestPlugin({
            config: {
                base: baseManifest
            }
        })
    ]
}