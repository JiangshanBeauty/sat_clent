
// ref: https://umijs.org/config/

const {router} = require('./src/pages/router');



export default {
  history: 'hash',
  hash:true,
  treeShaking: true,
  publicPath:'./',
  routes: router,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'sat_client',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  theme: {
    // "@primary-color": "#1DA57A"
  },
  devServer: {
    open: true
  }
}
