// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
        secure: false,
      },
    },
  },
};
