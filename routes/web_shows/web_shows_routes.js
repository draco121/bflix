var express = require('express')//instance of express 
var shows_router = express.Router()//instance of router method
var web_shows = require('../../modules/web_shows/web_shows.js')//instance of webshows module
const fs = require('fs') //file system module instance



//this route sends array of shows back to client
shows_router.get('/fetch',(req,res)=>{
    res.send(web_shows.getShowList())
})

//this route sends array of seasons back to client
shows_router.get('/fetch/:name',(req,res)=>{
    res.send(web_shows.getSeasonList(req.params.name))
})

//this route sends array of episodes back to client
shows_router.get('/fetch/:name/:season',(req,res)=>{
    res.send(web_shows.getEpisodeList(req.params.name,req.params.season))
})

//this route will initiate the stream of the perticular episode
shows_router.get('/stream/:name/:season/:episode',(req,res)=>{

    //getting the file info from the directory
    var f = web_shows.getEpisodeInfo(req.params.name,req.params.season,req.params.episode)
    fileSize = fs.statSync(f.path).size
    
    //building the response
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1

        if (start >= fileSize) {
            res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
            return
        }

        const chunksize = (end - start) + 1
        const file = fs.createReadStream(f.path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': f.mimetype,
        }

        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': f.mimetype,
        }
        res.writeHead(200, head)
        fs.createReadStream(f.path).pipe(res)
    }
})

module.exports = shows_router