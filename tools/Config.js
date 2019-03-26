import path from 'path';
import DockerService from './docker/Service';
import WebpackService from './webpack/Service';
import FileSystemService from './filesystem/Service';
/**
 * Top Level Config Parent
 */
class Config {
  constructor(){
    // Setup Member Function Binds - Optimization
    this.setupDirs     = this.setupDirs.bind(this);
    this.setupFiles    = this.setupFiles.bind(this);
    this.setupEnvs     = this.setupEnvs.bind(this);
    // Getter Member Function Binds - Optimization
    this.getEnvs       = this.getEnvs.bind(this);
    this.getDirs       = this.getDirs.bind(this);
    this.getFiles      = this.getFiles.bind(this);
    this.getWebpack    = this.getWebpack.bind(this);
    this.getDocker     = this.getDocker.bind(this);
    this.getFileSystem = this.getFileSystem.bind(this);
    // Setter Member Function Binds - Optimization
    this.setEnvs       = this.setEnvs.bind(this);
    // Member Variables
    this.config = {
        dirs:  this.setupDirs(),
        files: this.setupFiles(),
        envs:  this.setupEnvs(),
    };
    this.filesystem = FileSystemService;
  }
  setupDirs(){
    
    let mode = (this.config.envs.NODE_ENV === 'development')
    ? path.resolve(__dirname,'../build')
    : path.resolve(__dirname,'../dist');
    
    return {
      mode:     mode,
      root:     path.resolve(__dirname,'..'),
      src:      path.resolve(__dirname,'../src'),
      srcPub:   path.resolve(__dirname,'../src/public'),
      build:    path.resolve(__dirname,'../build'),
      buildPub: path.resolve(__dirname,'../build/public'),
      dist:     path.resolve(__dirname,'../dist'),
      distPub:  path.resolve(__dirname,'../dist/public'),
    };
  }
  setupFiles(){
    const serverFileName = 'server.js';
    const clientFileName = 'client.js';
    return {
      serverName:  serverFileName,
      clientName:  clientFileName,
      srcServer:   path.resolve(__dirname,'../src/' + serverFileName),
      buildServer: path.resolve(__dirname,'../build/' + serverFileName),
      distServer:  path.resolve(__dirname,'../dist/' + serverFileName),
      webpack: path.resolve(__dirname,'../webpack.config.js'),
    };
  }
  setupEnvs(){
    const dotenv = require('dotenv').config();
    if (dotenv.error) { throw dotenv.error }
    const { parsed: envs } = dotenv;
    return envs;
  }
  setEnvs(env){ 
    console.log(env);
    for (let key in this.config.envs)
      this.config.envs[key] = env[key];
  }
  getEnvs(){ 
    return this.config.envs();
  }
  getDirs(){
    return this.config.dirs();
  }
  getFiles(){
    return this.config.files();
  }
  getWebpack(){
    return new WebpackService(this.config);
  }
  getDocker(){
    return new DockerService(this.config);
  }
  getFileSystem(){
    return this.filesystem;
  }
}

export default Config;