// src/setupProxy.js
// Fixes "allowedHosts[0] should be a non-empty string" error in react-scripts 5.x

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
