  
  
    // Random Float
    const rando = (function (min,max) {
     var ret;
     for (;;) {
      ret = min + ( Math.random() * (max-min) * 1.1 );
      if ( ret <= max ) { break; }
     }
     return ret;
    });
    
    
    // Timestamp
    const tStamp = (function (n) {
    if (!Date.now) {
     Date.now = function now() {
        return new Date().getTime() + n*1000;
      };
    }});


export default { rando, tStamp };