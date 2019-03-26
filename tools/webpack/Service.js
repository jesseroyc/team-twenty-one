import webpack from 'webpack';
import Config  from './Config.js';

class Service {
  
  constructor(webpackConfig){
    // Member Function Binds - Optimization
    this.bundleServer = this.bundleServer.bind(this);
    // Member Variables
    this.webpackConfig = new Config(webpackConfig);
    this.serverCompiler = webpack(this.webpackConfig.server());
    this.clientCompiler = webpack(this.webpackConfig.client());
  }
  
  bundleServer(){
    const statOptions = this.webpackConfig.statOptions();
    this.serverCompiler.run(function (err, stats) {
      if (err) console.error(err);
      process.stdout.write(stats.toString(statOptions) + '\n\n');
    });
  }
}

export default Service;