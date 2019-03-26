import chokidar from 'chokidar';
import Config from './Config.js';

/**
 * Top Level Service Parent
 */
class Service {
  
  constructor(){
    // Member Function Binds - Optimization
    this.bundleBuild = this.bundleBuild.bind(this);
    this.bundleDist  = this.bundleDist.bind(this);
    this.startLocal  = this.startLocal.bind(this);
    this.startDist   = this.startDist.bind(this);
    this.startTests  = this.startTests.bind(this);
    this.cleanDocker = this.cleanDocker.bind(this);
    // Member Variables
    this.config = new Config();
    this.fs = this.config.getFileSystem();
  }
  updateEnv(updateEnvs){
    this.config.setEnvs(updateEnvs);
    
    const fs = this.fs;
    const dirs = this.config.getDirs();
    const envs = this.config.getEnvs();
    
    const production = dirs.dist;
    const development = dirs.build;
    
    if (envs.NODE_ENV === 'production')
      dirs['mode'] = production;
    if (envs.NODE_ENV === 'development') 
      dirs['mode'] = development;
    this.config.setDirs(dirs);
    
    let text = [];
    for (let key in updateEnvs) {
      envs[key] = updateEnvs[key];
    }
    for (let key in envs) {
      if (envs.hasOwnProperty(key)) {
        text.push(key + '=' + envs[key]);
      }
    }
    text = text.join('\n');
    (async (text) => {
      await fs.writeFile(dirs.root + '/.env',text);
    })(text);
  }
  
  bundleBuild() {
    
    const devMode = {
      NODE_ENV:'development',
      SERVER_PORT:8080
    };
    
    this.updateEnv(devMode);
    
    const fs = this.config.getFileSystem();
    const dirs = this.config.getDirs();
    const webpack = this.config.getWebpack();
    
    chokidar.watch(dirs.src, { persistent: true }).on('ready', () => {
      console.log(`Starting server bundle watch at: \n\n ${dirs.src}\n`);
      webpack.bundleServer();
      updatePublic();
    }).on('change', (event, path) => {
      webpack.bundleServer();
      updatePublic();
    });
    
    async function updatePublic () {
      await Promise.all([
        fs.copyDir(dirs.srcPub, dirs.buildPub),
      ]);
    }
  }
  
  bundleDist(){
    
    const devMode = {
      NODE_ENV:'production',
      SERVER_PORT:80
    };
    
    this.updateEnv(devMode);
    
    const fs = this.config.getFileSystem();
    const dirs = this.config.getDirs();
    const webpack = this.config.getWebpack();
    
    chokidar.watch(dirs.src, { persistent: true }).on('ready', () => {
      console.log(`Starting server bundle watch at: \n\n ${dirs.src}\n`);
      webpack.bundleServer();
      updatePublic();
    }).on('change', (event, path) => {
      webpack.bundleServer();
      updatePublic();
    });
    
    async function updatePublic () {
      await Promise.all([
        fs.copyDir(dirs.srcPub, dirs.distPub),
      ]);
    }
  }
  
  startLocal(){

  }
  
  startDist(){

  }
  
  startTests(){

  }
  
  cleanDocker(){

  }
  
  usage(){
    console.log(
        "\n Isomorphic Tools\n"
      + "\n  Example:\n"
      + "\n     babel-node tools/Service build\n"
      + "\n  Usage:\n"
      + "\n     babel-node tools/Service <command>\n"
      + "\n  Commands:\n"
      + "\n     build    |  watches src and bundles file to build directory of root"
      + "\n     dist     |  watches src and bundles file to dist directory of root"
      + "\n     start    |  watches build and runs server file in build directory of root"
      + "\n     deploy   |  clears and uses docker-compose to deploy"
      + "\n     test     |  watches test files and run test files in src directory of root"
      + "\n     clean    |  clears docker containers, images and volumes"
      + "\n"
    );
  }
}
// old npm commands
    // "babel:start": "./node_modules/.bin/babel --ignore anyValue ./src --out-dir ./dev",
    // "babel:watch": "nodemon --exec './node_modules/.bin/babel --ignore anyValue ./src --out-dir ./dev' --delay 2",
    // "dev:copy": "cp -r ./src/server/view/public ./dev/server/view/public && cp -r ./src/server/view/public ./build",
    // "dev:start": "NODE_ENV=development && node ./dev/server/server.js",
    // "rm:cont": "docker container rm $(docker container ls -aq) -f",
    // "rm:imag": "docker rmi $(docker images -aq) -f",
    // "rm:volu": "docker system prune --volumes -f"
switch(process.argv[2]) {
    
  case 'build': new Service().bundleBuild();
    break;
    
  case 'dist': new Service().bundleDist();
    break;
    
  case 'start': new Service().startLocal();
    break;
    
  case 'deploy': new Service().startDist();
    break;
    
  case 'test': new Service().startTest();
    break;
    
  case 'clean': new Service().cleanDocker();
    break;

  default: new Service().usage();
}