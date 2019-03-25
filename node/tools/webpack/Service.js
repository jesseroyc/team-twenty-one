import webpack from 'webpack';
import Config  from './Config.js';

class Service {
  
  constructor(env){
    this.config = new Config();
    this.serverCompiler = webpack(this.config.getServerConfig());
    this.clientCompiler = webpack(this.config.getServerConfig());
  }
  
  bundleServer(){
    const statOptions = this.config.getStatOptions();
    this.serverCompiler.run(function (err, stats) {
      if (err) console.error(err);
      process.stdout.write(stats.toString(statOptions) + '\n\n');
    });
  }
  
  /* TO DO
  bundleClient(){
    const statOptions = this.config.getStatOptions();
    this.serverCompiler.run(function (err, stats) {
      if (err) console.error(err);
      process.stdout.write(stats.toString(statOptions) + '\n\n');
    });
  }
  */
}
export default new Service();