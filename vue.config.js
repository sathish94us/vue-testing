function isDev() {
    const isD = process.env.NODE_ENV;
    console.log("isDev: ", isD);
    return isD;
}

module.exports = {
  publicPath: isDev() === 'production'
    ? '/'
    : '/',
  assetsDir: 'static',
  devServer: {
    // Paths
    proxy: {
      '^/posts' : {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true
      }
    },
  }
}
