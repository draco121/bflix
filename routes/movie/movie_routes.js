var express = require('express')//instance of express 
var movie_router = express.Router()//instance of router method
var movies = require('../../modules/movies/movie.js')//instance of movie module
const fs = require('fs') //file system module instance


//this route sends array of movies back to client
movie_router.get('/fetch', (req, res) => {
    res.send(movies.getMoviesList())
})

//this route sends array of movies back to client
movie_router.get('/stream/:name', (req, res) => {

    //getting the file info from the directory
    const f = movies.getMovieInfo(req.params.name)
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

module.exports = movie_router