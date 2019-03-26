var defaults = require('defaults');
var transports = require('./transports');
var winston = require('winston');

/**
 * Expose `create`.
 */
 
 
 
const logger = create({ console: true });
export default logger;
// OPTIONS
// EventEmitter {
//   domain: null,
//   _events: {},
//   _eventsCount: 0,
//   _maxListeners: undefined,
//   transports: 
//   { console: 
//       EventEmitter {
//         domain: null,
//         _events: {},
//         _eventsCount: 0,
//         _maxListeners: undefined,
//         silent: false,
//         raw: false,
//         name: 'console',
//         formatter: undefined,
//         level: 'info',
//         handleExceptions: true,
//         exceptionsLevel: 'error',
//         humanReadableUnhandledException: false,
//         json: false,
//         colorize: true,
//         prettyPrint: true,
//         timestamp: false,
//         showLevel: true,
//         label: null,
//         logstash: false,
//         depth: null,
//         align: false,
//         stderrLevels: [Object],
//         eol: '\n',
//         _onError: [Function: bound ] } },
//   _names: [ 'console' ],
//   exceptionHandlers: {},
//   _hnames: [],
//   catchExceptions: [Function: bound ],
//   padLevels: false,
//   levels: 
//   { silly: 0,
//     verbose: 1,
//     debug: 2,
//     info: 3,
//     warn: 4,
//     error: 5,
//     critical: 6,
//     fatal: 7 },
//   id: null,
//   level: 'info',
//   emitErrs: false,
//   stripColors: false,
//   exitOnError: true,
//   profilers: {},
//   rewriters: [],
//   filters: [],
//   silly: [Function],
//   verbose: [Function],
//   debug: [Function],
//   info: [Function],
//   warn: [Function],
//   error: [Function],
//   critical: [Function],
//   fatal: [Function] }


/**
 * Create a logger.
 *
 * @param {Object} options
 * @return {Logger}
 */

function create (options) {
  if (!options) throw new Error('Winston logger must be initialized with options.');

  setColors(); // set global winston colors
  setLevels(winston); // set global winston levels

  var enabled = [];
  Object.keys(options).forEach(function (key) {
    var opts = options[key];
    if (!opts) return; // if the provider is disabled
    if (typeof opts !== 'object') opts = {};

    if (!transports[key]) {
      throw new Error('Failed to find transport ' + key);
    }

    var Transport = transports[key];
    var transport = Transport(opts);
    if (transport) enabled.push(transport);
  });

  var logger = new (winston.Logger)({ transports: enabled });
  setLevels(logger);
  return logger;
}


/**
 * Set Winston levels.
 *
 * @param {Logger} logger
 * @param {Object} levels
 */

function setLevels (logger, levels) {

  levels = defaults(levels, {
    silly: 0,
    verbose: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    critical: 6,
    fatal: 7
  });

  logger.setLevels(levels);
}
function stream (){
  
}
  winston.stream({ start: -1 }).on('log', function(log) {
    console.log(log);
  });

/**
 * Set global Winston levels.
 *
 * @param {Object} colors
 */

function setColors (colors) {

  colors = defaults(colors, {
    silly    : 'magenta',
    verbose  : 'blue',
    debug    : 'cyan',
    info     : 'green',
    warn     : 'yellow',
    error    : 'red',
    critical : 'red',
    fatal    : 'red'
  });

  winston.addColors(colors);
}