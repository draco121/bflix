/* all the common functions used by movies
 module an webshows module will be defined 
defined here*/


const fs = require('fs') //file system module instance
const path = require('path') //path module instance
const tree = require("directory-tree")
const root = require('../../rootdir.js')


var fileobj = { 'path':'', 'mimetype':'' } //object declaration for file props

var common = {

    //function to get all the content inside the given directory, returns array of directories inside the given directory
    getContentList: (arg)=>{
         return tree.DirectoryTree(arg)  
    },

    //function to get the information of the requested stream file, returns an object of type fileobj
    getFileProp: (dir,name)=>{
        var files = fs.readdirSync(dir)
        for(file of files)
        { 
            parts = file.split('.')
            if(parts[0]==name)
            {
            var ext = parts[1]
            fileobj.path = dir+'/'+file
            if(ext==='flv'){
                fileobj.mimetype='video/x-flv'
                break;
            }
            else if(ext==='mp4'){
                fileobj.mimetype='video/mp4'
                break;
            }
            else if(ext=='mov'){
                fileobj.mimetype='video/quicktime'
                break;
            }
            else if(ext==='avi'){
                fileobj.mimetype='video/x-msvideo'
                break;
            }
            else if(ext==='wmv'){
                fileobj.mimetype='video/x-ms-wmv'
                break;
            }
            else if(ext==='mkv'){
                fileobj.mimetype='video/x-matroska'
                break;
            }
        }
        }
        return fileobj
    }

}
module.exports = common
