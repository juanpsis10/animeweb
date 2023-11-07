const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://anilist.co",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
