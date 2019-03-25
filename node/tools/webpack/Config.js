import path from 'path';

export default class Config {
  
  constructor(){
    
    // private member variables
    
    this.envs = setDotenv();
    this.argv = setPaths();
    
    // private member functions
    
    function setPaths(){
      
      const ROOT_DIR = path.resolve(__dirname, '../../');
      const SRC_DIR = path.resolve(ROOT_DIR, 'src');
      
      return {
        
        ROOT_DIR: ROOT_DIR,
        SRC_DIR:  SRC_DIR,
        
        BUILD_DIR:   path.resolve(ROOT_DIR, 'build'),
        DIST_DIR:    path.resolve(ROOT_DIR, 'dist'),
        CONFIG_FILE: path.resolve(ROOT_DIR, 'webpack.config.js'),
        SERVER_FILE: path.resolve(SRC_DIR, 'server.js'),
        CLIENT_FILE: path.resolve(SRC_DIR, 'client.js'),
        OUTPUT_NAME: 'server.js'
      };
    }
    
    function setDotenv(){
      const dotenv = require('dotenv').config();
      if (dotenv.error) { throw dotenv.error }
      const { parsed: envs } = dotenv;
      return envs;
    }
  }
  
  // public member functions
  
  getStatOptions() {
    const statOptions = {
      colors: true,
      modules: true,
      children: false,
      chunks: false,
      chunkModules: false
    };
    return statOptions;
  }
  
  getServerConfig(){
    const config = require(this.argv.CONFIG_FILE);
    const serverConfig = config.serverConfig(this.envs,this.argv);
    return serverConfig;
  }
  
  getClientConfig(){
    return require(this.argv.CONFIG_FILE).clientConfig(this.envs,this.argv);
  }
  
}