import Config  from './Config.js';

class Service {
  constructor(dockerConfig){
    // Member Function Binds - Optimization
    this.example = this.example.bind(this);
    // Member Variables
    this.dockerConfig = new Config(dockerConfig);
  }
  example(){
    
  }
}

export default Service;