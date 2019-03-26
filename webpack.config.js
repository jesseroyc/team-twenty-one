import path from 'path';
import nodeExternals from "webpack-node-externals";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

function config (envs,dirs,files) {
  //console.log(envs,dirs,files)
  return {
    
    /** development or production, determines
     * ref:
     */
    mode: envs.NODE_ENV,
    
    /** tell webpack where src, build, dist is
     * ref:
     */
    context: dirs.root,
    
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

export function serverConfig (envs,dirs,files) {
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
    entry: files.srcServer,
    
    /** build and dist transpiled/minified outputs
     * ref:
     */
    output: {
      path: dirs.mode,
      filename: files.serverName
    },
    
    ...config(envs,dirs,files),
  };
}

export function clientConfig (envs,dirs,files) {
  return {

    entry: files.srcClient,
    
    /** build and dist transpiled/minified outputs
     * ref:
     */
    output: {
      path: dirs.build,
      filename: files.clientName,
    },
    
    ...config(envs,dirs,files),
  };
}