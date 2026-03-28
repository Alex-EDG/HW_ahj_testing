const webpack = require('../node_modules/webpack');
const WebpackDevServer = require('../node_modules/webpack-dev-server');
const config = require('../webpack.dev');

const server = new WebpackDevServer(webpack(config), {});
server.listen(8080, 'localhost', (err) => {
  if (err) {
    return;
  }
  if (process.send) {
    process.send('ok');
  }
});
