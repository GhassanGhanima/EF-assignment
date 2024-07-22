const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader',   // Translates CSS into CommonJS
          'sass-loader'   // Compiles Sass to CSS
        ],
      },
    ],
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // Custom middleware setup
      // Example: Adding a custom middleware
      middlewares.unshift((req, res, next) => {
        console.log('Custom Middleware');
        next();
      });

      // Returning the middlewares array
      return middlewares;
    },
  },
};
