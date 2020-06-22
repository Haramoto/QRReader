module.exports = {
  publicPath: '',
  configureWebpack: {
    devtool: 'source-map',
  },
  transpileDependencies: ['vuetify'],
  pwa: {
    workboxOptions: {
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /.+(\/|.html)$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'qr-reader-html-cache',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 90,
            },
          },
        },
        {
          urlPattern: /.+\.(js|css|woff)$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'qr-reader-dependent-cache',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 90,
            },
          },
        },
        {
          urlPattern: /.+\.(png)$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'qr-reader-image-cache',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 7,
            },
          },
        },
      ],
    },
  },
};
