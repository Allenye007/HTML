const webpackConfig = require('./webpack.config')

const webpack = require('webpack')

webpack(webpackConfig).run((err, state) => {
    if(state) {
        console.log('编译成功~~')
    } else {
        console.log(err)
    }
})
