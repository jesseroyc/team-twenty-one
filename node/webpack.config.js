import path from 'path';
import nodeExternals from "webpack-node-externals";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

function config (envs,argv) {
  return {
    
    /** development or production, determines
     * ref:
     */
    mode: envs.MODE,
    
    /** tell webpack where src, build, dist is
     * ref:
     */
    context: argv.ROOT_DIR,
    
    /** process rules for filetypes
     * ref:
     */
    module: {
      rules: [
        {
          test:  /\.(js|jsx|mjs)$/,
          loader: 'babel-loader',
        },
        {
          test: /\.(css|less|styl|scss|sass|sss)$/,
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
      ],
    },
  };
}

export function serverConfig (envs,argv) {
  return {
    
    target: 'node',
    
    node: {
      __dirname: false,
      __filename: false,
    },
    
    externals: [nodeExternals()],
    
    /** files that maintain runtime
     * ref:
     */
    entry: argv.SERVER_FILE,
    
    /** build and dist transpiled/minified outputs
     * ref:
     */
    output: {
      path: argv.BUILD_DIR,
      filename: argv.OUTPUT_NAME
    },
    
    ...config(envs,argv),
  };
}

export function clientConfig (envs,argv) {
  return {

    entry: argv.CLIENT_FILE,
    
    /** build and dist transpiled/minified outputs
     * ref:
     */
    output: {
      path: argv.BUILD_DIR,
      filename: argv.CLIENT_FILE
    },
    
    ...config(envs,argv),
  };
}