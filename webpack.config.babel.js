import HtmlWebpackPlugin from 'html-webpack-plugin';

export default mode => {
  if (mode === 'production') {
    return {
      mode,
      module: {
        rules: [
          {
            loader: 'babel-loader',
            test: /\.js$/
          }
        ]
      }
    };
  }

  return {
    devServer: {
      hot: true
    },
    mode,
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin()]
  };
};
