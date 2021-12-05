const { merge } = require("webpack-merge"); //esto lo instalamos con npm install webpack-merge 
// --save-dev y sirve para unir los dos modules, en este caso, para que no se sobreescriba uno con otro sino que haga la suma de los dos.
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const common = require("./webpack.common.js");
const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,// En esta caso, a diferencia de "style-loader", si crea el archivo css. En este caso se usa más para producción. No se actualiza al grabar. Tenemos que dar siempre a F5 en la página para que recargue.

                    // "style-loader",// inyecta los estilos en el html, no crea el fichero CSS.
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                exportLocalsConvention: "camelCase",// este camelCase es para cuando importamos un estilado como en averageComponent podamos acceder con classes.resultBackaground. El camelCase elimina el - y la siguiente letra la pone en mayúsculas.
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
        }),
        new Dotenv({
            path: "./prod.env",
        })
    ],
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "all",
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true,
                },
            },
        },
    },
});