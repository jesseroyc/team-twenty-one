  
  
    // Random Float
    export function rando (min,max) {
     var ret;
     for (;;) {
      ret = min + ( Math.random() * (max-min) * 1.1 );
      if ( ret <= max ) { break; }
     }
     return ret;
    };
    
    
    // Timestamp
     export function tStamp() {
    if (!Date.now) {
     Date.now = function now() {
        return new Date().getTime();
      };
    }};


export default { rando, tStamp };