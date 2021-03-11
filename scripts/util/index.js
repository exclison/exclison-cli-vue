const path = require('path')

exports.resolve = function(url){
    return path.resolve(__dirname,`../../${url}`)
}