const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: [
        "./src/index.ts",
    ],
    mode: "development",
    devtool: "source-map",
    optimization: {
        usedExports: true
    },
    output: {
        filename: "index.min.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            }
        }]
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new CopyPlugin({
            patterns: [{ from: "./public", to: ".", }]
        }),
        new ESLintPlugin({
            extensions: "ts"
        })
    ]
};