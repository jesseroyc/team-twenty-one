import path from 'path';
import DockerService from './docker/Service';
import WebpackService from './webpack/Service';
import FileSystemService from './filesystem/Service';
/**
 * Top Level Config Parent
 */
class Config {
  constructor(){
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
    this.envs = setupEnvs();
    this.dirs = setupDirs();
    this.files = setupFiles();
    function setupEnvs(){
      const dotenv = require('dotenv').config();
      if (dotenv.error) { throw dotenv.error }
      const { parsed: envs } = dotenv;
      return envs;
    }
    function setupDirs(){
      return {
        mode:     path.resolve(__dirname,'../build'),
        root:     path.resolve(__dirname,'..'),
        src:      path.resolve(__dirname,'../server'),
        srcPub:   path.resolve(__dirname,'../public'),
        build:    path.resolve(__dirname,'../build'),
        buildPub: path.resolve(__dirname,'../build'),
        dist:     path.resolve(__dirname,'../dist'),
        distPub:  path.resolve(__dirname,'../dist'),
      };
    }
    function setupFiles(){
      const serverFileName = 'index.js';
      const clientFileName = 'client.js';
      return {
        serverName:  serverFileName,
        clientName:  clientFileName,
        srcServer:   path.resolve(__dirname,'../server/' + serverFileName),
        buildServer: path.resolve(__dirname,'../build/' + serverFileName),
        distServer:  path.resolve(__dirname,'../dist/' + serverFileName),
        webpack: path.resolve(__dirname,'../webpack.config.js'),
      };
    }
  }
  getEnvs(){ 
    return this.envs;
  }
  getDirs(){
    return this.dirs;
  }
  getFiles(){
    return this.files;
  }
  setEnvs(env){
    if(env)
      for (let key in this.envs)
        this.envs[key] = env[key];
  }
  setDirs(dirs){
    if(dirs)
      for (let key in this.dirs)
        this.dirs[key] = dirs[key];
  }
  setFiles(files){
    if(files)
      for (let key in this.files)
        this.files[key] = files[key];
  }
  getWebpack(){
    const config = {
      envs: this.getEnvs(),
      dirs: this.getDirs(),
      files: this.getFiles(),
    };
    return new WebpackService(config);
  }
  getDocker(){
    const config = {
      envs: this.getEnvs(),
      dirs: this.getDirs(),
      files: this.getFiles(),
    };
    return new DockerService(config);
  }
  getFileSystem(){
    return FileSystemService;
  }
}

export default Config;