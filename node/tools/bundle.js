import webpack from 'webpack';
import ProgressPlugin  from 'webpack/lib/ProgressPlugin';
import config  from  './webpack.config';

const compiler = webpack(config);

compiler.apply(new ProgressPlugin(function (percentage, msg, current, active, modulepath) {
  if (process.stdout.isTTY && percentage < 1) {
    process.stdout.cursorTo(0);
    modulepath = modulepath ? ' …' + modulepath.substr(modulepath.length - 30) : '';
    current = current ? ' ' + current : '';
    active = active ? ' ' + active : '';
    process.stdout.clearLine(1);
  } else if (percentage === 1) {
    process.stdout.write('\n');
    console.log('webpack: done.');
  }
}));

compiler.run(function (err, stats) {
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: true,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');
})