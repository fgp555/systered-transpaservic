module.exports = {
  transpileDependencies: true, // Esto asegura que las dependencias se transpilen correctamente
  configureWebpack: {
    resolve: {
      fallback: {
        https: require.resolve("https-browserify"),
        http: require.resolve("stream-http"),
      },
    },
  },
};
