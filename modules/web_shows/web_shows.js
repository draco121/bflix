//all the functions for web shows will be defined here

var common = require('../common/common.js')// instance of the common.js module
var root = require('../../rootdir.js')//to get the root path of the project

var  web_shows = {

    //function to fetch the list of shows and return it
    getShowList: ()=>{
        return common.getContentList(root.rootdir+'/repo/web_shows/')
    },
    
    //function to fetch the list of seasons of the perticular show
    getSeasonList: (name)=>{
        return common.getContentList(root.rootdir+'/repo/web_shows/'+name+'/')
    },

    //function to get the list of episodes of the provided season of show
    getEpisodeList: (name,season)=>{
        return common.getContentList(root.rootdir+'/repo/web_shows/'+name+'/'+season+'/')
    },

    //function to get the info of the episode file
    getEpisodeInfo: (name,season,episode)=>{
        return common.getFileObj(root.rootdir+'/repo/web_shows/'+name+'/'+season+'/'+episode+'/')
    }
}

module.exports = web_shows