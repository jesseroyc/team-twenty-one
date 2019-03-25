import WebpackService from './webpack/Service';

// TO DO 
// bundle development to build
// bundle production to dist
// watch /build
// copy assets over
// assemble manifest from bundle
// clean up design so that:
// webpack/service <- webpack/config <- tools/service <- tools/config

const webpackService = new WebpackService();
webpackService.bundleServer();