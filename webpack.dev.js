
const { merge } = require("webpack-merge"); //esto lo instalamos con npm install webpack-merge 
// --save-dev y sirve para unir los dos modules, en este caso, para que no se sobreescriba uno con otro sino que haga la suma de los dos.

const common = require("./webpack.common.js");
const path = require("path");
const Dotenv = require("dotenv-webpack");


module.exports = merge(common, { // Aquí le decimos que haga el merge, unión, de common más el objeto qu se le pasa y así no hace override.
    mode: "development",
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    // MiniCssExtractPlugin.loader,// En esta caso, a diferencia de "style-loader", si crea el archivo css. En este caso se usa más para producción. No se actualiza al grabar. Tenemos que dar siempre a F5 en la página para que recargue.

                    "style-loader",// inyecta los estilos en el html, no crea el fichero CSS.
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                exportLocalsConvention: "camelCase",// este camelCase es para cuando importamos un estilado como en averageComponent podamos acceder con classes.resultBackaground. El camelCase elimina el - y la siguiente letra la pone en mayúsculas.
                                localIdentName: '[path].[name]__[local]--[hash:base64:5]',// Esto le asigna un nombre de clase más legible a los div por ejemplo por si tenemos que hacer referencia.
                                localIdentContext: path.resolve(__dirname, "src/components")// Para evitar que al nombrar la clase meta el nombre de la carpeta también ya que es común. Le decimos que la ruta es la carpeta components.
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
    devtool: 'eval-source-map', // esto es para que el código que aparezca en las dev tools sea el mismo que tenemos nosotros, no todo el traspilado, para poder hacer debugger. Esto solo para dev, no prod.
    devServer: {
        port: "8083",
    },
    stats: 'errors-only', //para que en la consola solo nos muestre los errores, no las actuaciones en cada archivo. Para desarrollo.
    plugins: [
        new Dotenv({
            path: "./dev.env",
        })
    ],
});