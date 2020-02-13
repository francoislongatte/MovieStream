const path = require('path');

module.exports = {
    paths: function (paths, env) {   
        paths.appIndexJs = path.resolve(__dirname, 'src/client');
        paths.appSrc = path.resolve(__dirname, 'src/client');
        // paths.appBuild =  path.resolve(__dirname, './src/build');
        paths.appPublic = path.resolve(__dirname, './src/public');
        paths.appHtml = path.resolve(__dirname, './src/public/index.html');
        console.log(paths);
        return paths;
    },

}