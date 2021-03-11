"use strict";

const Webpack = require("webpack");
const { getProConfig } = require("./baseconfig.js");

const webpackConfig = getProConfig();
const compiler = Webpack(webpackConfig);

const pro = ()=>{
    compiler.run((err, stats) => {
        if(err){
            console.error(err)
        }
    });
}

module.exports = pro

