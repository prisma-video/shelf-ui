const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
// const InterpolateHtmlPlugin = require('interpolate-html-plugin')

let localCanisters, prodCanisters, canisters;

function initCanisterIds() {
  try {
    localCanisters = require(path.resolve('.dfx', 'local', 'canister_ids.json'));
  } catch (error) {
    console.log('No local canister_ids.json found. Continuing production');
  }
  try {
    prodCanisters = require(path.resolve('canister_ids.json'));
  } catch (error) {
    console.log('No production canister_ids.json found. Continuing with local');
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === 'production' ? 'ic' : 'local');

  canisters = network === 'local' ? localCanisters : prodCanisters;

  for (const canister in canisters) {
    process.env[canister.toUpperCase() + '_CANISTER_ID'] =
      canisters[canister][network];
  }
}
initCanisterIds();

// const dfxJson = require("./dfx.json");
// // List of all aliases for canisters. This creates the module alias for
// // the `import ... from "ic:canisters/xyz"` where xyz is the name of a
// // canister.
// const aliases = Object.entries(dfxJson.canisters)
//   .reduce((acc, [name,value]) => {
//     const outputRoot = path.join(__dirname, dfxJson.defaults.build.output, name);

//     if(typeof value.frontend !== 'object') {
//       return {
//         ...acc,
//         ["ic:canisters/" + name]: path.join(outputRoot, "index.js"),
//         ["ic:idl/" + name]: path.join(outputRoot, name + ".did.js"),
//       };
//     } else {
//       return {
//         ...acc,
//       };
//     }
//   }, {});
// console.log(aliases);

// function generateWebpackConfigForCanister(name, info) {
//   if (typeof info.frontend !== 'object') {
//     return;
//   }
//   const inputRoot = __dirname;
//   return {
//     mode: "production",
//     entry: {
//       index: path.join(inputRoot, info.frontend.entrypoint),
//     },
//     devtool: "source-map",
//     optimization: {
//       // TODO Set to true before deployment
//       minimize: false,
//       minimizer: [new TerserPlugin()],
//     },
//     resolve: {
//       alias: aliases,
//     },
//     output: {
//       filename: "[name].js",
//       path: path.join(__dirname, info.frontend.output),
//     },
//     module: {
//       rules: [
//         { test: /\.css$/, use: ['style-loader','css-loader']  }
//       ]
//     },
//     plugins: [
//     ],
//   };
// }

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = [{
  target: "web",
  mode: isDevelopment ? "development" : "production",
  entry: ['babel-polyfill', path.join(__dirname, "src", "shelf_ui", "src", "index.js")],
  devtool: isDevelopment ? "source-map" : false,
  // optimization: {
  //   minimize: !isDevelopment,
  //   minimizer: [new TerserPlugin()],
  // },
  // resolve: {
  //   // extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx"],
  //   extensions: [".js", ".ts", ".jsx", ".tsx"],
  //   fallback: {
  //     assert: require.resolve("assert/"),
  //     buffer: require.resolve("buffer/"),
  //     events: require.resolve("events/"),
  //     stream: require.resolve("stream-browserify/"),
  //     util: require.resolve("util/"),
  //   },
  // },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: '/',
  },

  // Depending in the language or framework you are using for
  // front-end development, add module loaders to the default
  // webpack configuration. For example, if you are using React
  // modules and CSS as described in the "Adding a stylesheet"
  // tutorial, uncomment the following lines:
  // module: {
  //  rules: [
  //    { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
  //    { test: /\.css$/, use: ['style-loader','css-loader'] }
  //  ]
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src',  "shelf_ui", "src"),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            ignore: [
              /\/core-js/,
            ],
            sourceType: "unambiguous",
            presets: [['@babel/preset-env', {targets: "defaults"}], '@babel/preset-react'],
            plugins: [
                ["@babel/transform-runtime"]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, path.join("src", "shelf_ui", "assets", "index_template.html")),
      filename: './index.html',
      cache: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src", "shelf_ui", "assets"),
          to: path.join(__dirname, "dist"),
        },
      ],
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      USER_CANISTER_ID: canisters["user"],
      NFT_CANISTER_ID: canisters["nft"],
      SWAP_CONTRACTS_CANISTER_ID: canisters["swap_contracts"],
      SHELF_UI_CANISTER_ID: canisters["shelf_ui"]
    }),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve("buffer/"), "Buffer"],
      process: require.resolve("process/browser"),
    }),
    // new InterpolateHtmlPlugin({
    //   PUBLIC_URL: 'static' // can modify `static` to another name or get it from `process`
    // }),
  ],
  // proxy /api to port 8000 during development
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
    hot: true,
    contentBase: path.resolve(__dirname, "./src/shelf_ui"),
    watchContentBase: true,
    historyApiFallback: true,
  },
}, 
// ...Object.entries(dfxJson.canisters).map(([name, info]) => {
//   return generateWebpackConfigForCanister(name, info);
// }).filter(x => !!x),
];
