class Config {
  
  constructor(config){
    // Member Function Binds - Optimization
    this.statOptions = this.statOptions.bind(this);
    this.server = this.server.bind(this);
    this.client = this.client.bind(this);
    // Member Variables
    console.log(config)
    this.envs = config.envs;
    this.dirs = config.dirs;
    this.files = config.files;
  }
  
  statOptions() {
    const statOptions = {
      colors: true,
      modules: true,
      children: false,
      chunks: false,
      chunkModules: false
    };
    return statOptions;
  }
  
  server(){
    const webpackFile = require(this.files.webpack);
    const config = webpackFile.serverConfig(this.envs,this.dirs,this.files);
    return config;
  }
  
  client(){
    const webpackFile = require(this.files.webpack);
    const config = webpackFile.clientConfig(this.envs,this.dirs,this.files);
    return config;
  }
}

export default Config;