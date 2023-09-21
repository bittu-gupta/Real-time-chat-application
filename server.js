const express = require('express')
const app = express()
const http = require('http')

const PORT = process.env.PORT || 2000

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })


});