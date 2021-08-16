const express = require('express');
const http = require('http');
const socketIo = require('socket.io')

const app = express();

const server = http.createServer(app);

const io = socketIo(server)

server.listen(3000, () => {
  console.log('👂 Listenning on port 3000')
})

app.use(express.static(__dirname + '/public'))

const historico = [];

io.on('connection', (socket) => {
  console.log("nova conexão")

  historico.forEach(linha => {
    socket.emit('desenhar', linha)
  })

  socket.on('desenhar', (linha) => {
    historico.push(linha)
    io.emit('desenhar', linha)
  })
})