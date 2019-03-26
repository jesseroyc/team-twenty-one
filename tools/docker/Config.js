class Config {
  constructor(config){
    // Member Function Binds - Optimization
    this.example = this.example.bind(this);
    // Member Variables
    this.envs = config.envs;
    this.dirs = config.dirs;
    this.files = config.files;
  }
  example(){
    
  }
}

export default Config;