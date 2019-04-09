import path from "path";
import chokidar from 'chokidar';
import Config from './Config.js';
import Docker from 'dockerode';
/**
 * Top Level Service Parent
 * Developed this after how much time was spent in the terminal
 * and maintaining project. May refactor into an npm package for
 * future projects.
 */
class Service {
  
  constructor(){
    // Member Function Binds - Optimization
    this.updateEnv = this.updateEnv.bind(this);
    this.build = this.build.bind(this);
    this.dist = this.dist.bind(this);
    this.start = this.start.bind(this);
    this.deploy = this.deploy.bind(this);
    this.tests = this.tests.bind(this);
    this.buildMongo = this.buildMongo.bind(this);
    this.buildNode = this.buildNode.bind(this);
    this.clean = this.clean.bind(this);
    this.usage = this.usage.bind(this);
    // Member Variables
    this.config = new Config();
  }
  updateEnv(updateEnvs){
    this.config.setEnvs(updateEnvs);
    
    const fs = this.config.getFileSystem();
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
  
  build() {
    
    const envMode = {
      NODE_ENV:'development',
      SERVER_PORT:8080
    };
    
    this.updateEnv(envMode);
    
    const dirs = this.config.getDirs();
    const webpack = this.config.getWebpack();
    
    chokidar.watch(dirs.src, { persistent: true }).on('ready', () => {
      process.stdout.write(`Bundling development server with watch: \n\n ${dirs.src}\n`);
      webpack.bundleServer();
    }).on('change', (event, path) => {
      webpack.bundleServer();
    });
  }
  
  dist(){
    
    const envMode = {
      NODE_ENV:'production',
      SERVER_PORT:80
    };
    
    this.updateEnv(envMode);
    
    const fs = this.config.getFileSystem();
    const dirs = this.config.getDirs();
    const webpack = this.config.getWebpack();
    
    process.stdout.write(`Bundling distribution server: \n\n ${dirs.src}\n`);
    webpack.bundleServer();
    updatePublic();
    
    async function updatePublic () {
      await Promise.all([
        fs.copyDir(dirs.srcPub, dirs.distPub),
      ]);
    }
  }
  
  start(){

    const time = new Date().toTimeString();
    process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
    
    const envMode = {
      NODE_ENV:'development',
      SERVER_PORT:8080
    };
    
    this.updateEnv(envMode);

    process.env = this.config.getEnvs();
    
    const app = require('../build/server.js');
  }
  
  deploy(){
    this.buildNode();
    this.buildMongo();
  }
  
  tests(){
    // should have been implemented before starting...
    // runs transpiled tests in current directory
    // should transpile code to test folder with watch maintaining project structure (not webpack)
    // run test files and output status to console
    // "babel:start": "./node_modules/.bin/babel --ignore anyValue ./src --out-dir ./dev",
    // "babel:watch": "nodemon --exec './node_modules/.bin/babel --ignore anyValue ./src --out-dir ./dev' --delay 2"
  }
  
  buildNode(){
    const Docker = require('dockerode');
    const docker = new Docker();
    const dirs = this.config.getDirs();
    
    docker.buildImage({
      context: dirs.root,
      src: [
        'Dockerfile',
        '.env',
        'process.yml',
        'package.json',
        '/dist'],
      },
      { t:'node' },
      function (err, stream) {
        if(err) return console.error(err);
        stream.pipe(process.stdout);
      }
    );
  }
  
  buildMongo(){
    const Docker = require('dockerode');
    const docker = new Docker();
    const dirs = this.config.getDirs();
    
    docker.buildImage({
      context: dirs.root + '/mongo',
      src: [
        'Dockerfile',
        'run.sh',
        'set_mongodb_password.sh'
      ],
      },
      { t: 'mongo' },
      function (err, stream) {
        if(err) return console.error(err);
        stream.pipe(process.stdout);
      }
    );
  }
    //   docker.run('ubuntu',['bash','run.sh'],process.stdout,{
    //     'Hostname': '0.0.0.0',
    //     'HostConfig': {
    //       "PortBindings": {
    //         "27017/tcp": [
    //           {
    //             "HostPort": '27017'
    //           }
    //         ]
    //       }
    //     },
    //     'Image':'mongo',
    //     'ExposedPorts':{
    //       '27017/tcp':{}
    //     }
    //   },function(err,data,container){
    //     if(err)console.error(err);
    //     cb();
    //   });
    // }
  clean(cb){
    const Docker = require('dockerode');
    const docker = new Docker();
    
    console.log('Cleaning containers, images, and volumes.');
    
    let process = true;
    stopContainers(function(contId){
      console.log("Container " + contId + " was stopped.");
      removeContainers(function(contId){
        console.log("Container " + contId + " was removed.");
        removeVolumes(function(voluName){
          console.log("Volume " + voluName + " was removed.");
          removeImages(function(imgID){
            console.log("Image " + imgID + " was removed.");
            removeNetworks(function(netId){
              if(process === true) cb();
              process = false;
            });
          });
        });
      });
    });
    
    function removeNetworks(cb){
      docker.listNetworks({all:true},function (err, networks) {
        if(err) return console.error(err);
        networks.forEach(function(networkInfo){
          docker.getVolume(networkInfo.Id).remove({force:true})
          .then(function(){
            cb(networkInfo.Id);
          }).catch(function(){
            cb(networkInfo.Id);
          });
        });
      });
    }
    
    function removeVolumes(cb){
      docker.listVolumes({all:true},function (err, data) {
        if(err) return console.error(err);
        data.Volumes.forEach(function(volumeInfo){
          docker.getVolume(volumeInfo.Name).remove({force:true})
          .then(function(){
            cb(volumeInfo.Name);
          }).catch(function(){
            cb(volumeInfo.Name);
          });
        });
      });
    }
    
    function removeImages(cb){
      docker.listImages({all:true},function (err, images) {
        if(err) return console.error(err);
        images.forEach(function(imageInfo){
          docker.getImage(imageInfo.Id).remove({force:true})
          .then(function(){
            cb(imageInfo.Id);
          }).catch(function(){
            cb(imageInfo.Id);
          });
        });
      });
    }
    
    function stopContainers(cb){
      docker.listContainers({all:true},function (err, containers) {
        if(err) return console.error(err);
        containers.forEach(function (containerInfo) {
          docker.getContainer(containerInfo.Id).stop({force:true})
          .then(function(){
            cb(containerInfo.Id);
          }).catch(function(){
            cb(containerInfo.Id);
          });
        });
      });
    }
    
    function removeContainers(cb){
      docker.listContainers({all:true},function (err, containers) {
        if(err) return console.error(err);
        containers.forEach(function (containerInfo) {
          docker.getContainer(containerInfo.Id).remove({force:true})
          .then(function(){
            cb(containerInfo.Id);
          }).catch(function(){
            cb(containerInfo.Id);
          });
        });
      });
    }
  }
  
  usage(){
    process.stdout.write(
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
      + "\n"
    );
  }
}

switch(process.argv[2]) {
    
  case 'build': new Service().build();
    break;
    
  case 'dist': new Service().dist();
    break;
    
  case 'start': new Service().start();
    break;
    
  case 'deploy': new Service().deploy();
    break;
    
  case 'test': new Service().tests();
    break;

  case 'clean': new Service().clean(()=>{});
    break;
    
  default: new Service().usage();
}