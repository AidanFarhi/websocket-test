const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connect', socket => {

    // This broadcasts to the user
    socket.emit('message', 'Welcome to ChatCord')

    // Broadcast when user connects

    // This broadcasts to everyone EXCEPT user
    socket.broadcast.emit('message', 'A user has joined the chat')

    // When client disconnects
    socket.on('disconnect', ()=> {
        // Broadcasts to everyone on server
        io.emit('message', 'A user has left the chat')
    })
    
    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit('message', msg)
    })
})  

const PORT = process.env.PORT || 3000
server.listen(PORT, ()=> console.log(`Server running on PORT: ${PORT}`))

