/*
* @Author: Kasper Sebb' brandt
* @Date:   2018-09-30 00:45:39
* @Last Modified by:   Kasper Sebb' brandt
* @Last Modified time: 2018-10-20 19:29:36
*/
const koa = require('koa');
const Router = require('koa-router');
const convert = require('koa-convert');
const http2 = require('http2');
const compress = require('koa-compress');
const ORM = require('koa-orm');

// Make nice with requiring the local librarie
require('app-module-path').addPath(__dirname);

// common required middleware by children
// @TODO feature detect and add if needed inside children
const bodyParser = require('koa-better-body');
const cors = require('koa2-cors');

/**
 * config options
 * {
 *   routerHook,
 *   keyOptions
 * }
 */

module.exports = async function(config) {  
  const app = new koa();
  const router = new Router();
  const orm = ORM(config.database);

app.use(orm.middleware)

  config.routerHook && await config.routerHook(router);

  app
    .use(cors())
    .use(compress({
      filter: function (content_type) {
        return /json/i.test(content_type)
      },
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    }))
    .use(convert(bodyParser()))
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(config.port || 9999);

  console.log('started on port:' + config.port);

  if (config.keyOptions) {
    http2
      .createSecureServer(config.keyOptions, app.callback())
      .listen(config.httpsPort || 9999);
  }
}