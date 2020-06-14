//all the functions related to movies will be defined here

var common = require('../common/common.js')// instance of the common.js module
var root = require('../../rootdir.js')//to get the root path of the project

var movie = {

            //function to return a list of movies present in the repository
            getMoviesList: ()=>{
                    return common.getContentList(root.rootdir+'/repo/movies/')
            },

            //function to return the info of the selected movie
            getMovieInfo: (name)=>{
                    return common.getFileObj(root.rootdir+'/repo/movies/'+name+'/')

            }

}
module.exports = movie