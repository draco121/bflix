const express = require('express')
const fs = require('fs')
const Path = require('path')
const app = express()
const PrivateIPAddress = require('ip').address();// fetches system's private ip address on which server is running.
var mimetype=''

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.static('assets/client/'))


app.get('/show/:type', function(req, res) {
    var temp
    var type = req.params.type
    if(type == 'movie')
    { 
        temp = fs.readdirSync('./repo/'+type+'/')
        
    }
    res.send(temp)
})

app.get('/stream/:type/:name', function(req, res) {
    var type = req.params.type
    var name = req.params.name
    var path=""
    var ext=""
    if(type == 'movie')
    { 
        var temp = fs.readdirSync('./repo/'+type+'/'+name+'/')
        path = './repo/'+type+'/'+name+'/'+temp[0]
        ext = Path.extname(temp[0])
        if(ext=='.flv'){mimetype='video/x-flv'}
        if(ext=='.mp4'){mimetype='video/mp4'}
        if(ext=='.mov'){mimetype='video/quicktime'}
        if(ext=='.avi'){mimetype='video/x-msvideo'}
        if(ext=='.wmv'){mimetype='video/x-ms-wmv'}
        if(ext=='.mkv'){mimetype='video/x-matroska'}
    }
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1

        if(start >= fileSize) {
            res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
            return
        }

        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': mimetype,
        }

        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
})

app.listen(4321, function () {
    console.clear()
    console.log('=======================================  SERVER 2.0  ===================================\n\n')
    console.log('your local stream server is now running add the movies to "/repo/movies/" directory\n and connect your phone or any other device via wifi \n open url http://'+PrivateIPAddress+':4321 \n enjoy \n made by rajeev chourey\n\n')
    console.log('========================================================================================\n\n')
})




