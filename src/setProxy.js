const config = require('./config.js');
const proxy = require('http-proxy-middleware');
const port = 3001

module.exports = function (app) {
    app.use(
        proxy('/api', {
            target: config.default.address + ':' + port,
            changeOrigin: true,
        })
    );
};