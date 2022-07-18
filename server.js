const { https } = require('firebase-functions');
const { default: next } = require('next');

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  conf: { distDir: '.next' },
  hostname: 'localhost',
  port: 3000
})

const nextjsHandle = server.getRequestHandler();
exports.nextServerAlpha = https.onRequest((req, res) => {
  return server.prepare()
    .then(() => {
      return nextjsHandle(req, res);
    });
});