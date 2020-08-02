//all the functions for web shows will be defined here

var common = require('../common/common.js')// instance of the common.js module
var root = require('../../rootdir.js')//to get the root path of the project

var  web_shows = {

    //function to fetch the list of shows and return it
    getShowList: ()=>{
        return common.getContentList(root.rootdir+'/repo/web_shows/')
    },

    getEpisodeInfo:(name)=>{
        return common.getFileProp(root.rootdir+'/repo/web_shows/',name)
    }
}

module.exports = web_shows