import path from 'path';
import webpackService from './webpack/Service';
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs';
import chokidar from 'chokidar';

// TO DO
// assemble manifest from bundle
// add webpack.config to watch
// clean up design so that:
// webpack/service <- webpack/config <- tools/service <- tools/config

const watchDirectory = path.resolve(__dirname,'../src');
const publicSrcDir   = path.resolve(__dirname,'../src/view/public');
const publicBuildDir = path.resolve(__dirname,'../build/public');

/**
 * Watcher deffinition
 * https://github.com/paulmillr/chokidar
 */
chokidar.watch(watchDirectory, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  ignoreInitial: false
}).on('ready', () => {
  console.log(`Starting server bundle watch at: \n\n ${watchDirectory}\n`);
  webpackService.bundleServer();
  updatePublic();
}).on('change', (event, path) => {
  webpackService.bundleServer();
  updatePublic();
});

/**
 * Node filesystem update
 */ 
async function updatePublic () {
  await Promise.all([
    copyDir(publicSrcDir, publicBuildDir),
  ]);
}