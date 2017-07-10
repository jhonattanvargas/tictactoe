'use strict'
const express = require('express')
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const game = require('./object/game.js')
var players = new Array()
var online = new Array()
var baton
var port = 8080
var lastStart = ""
server.listen(port,()=>{
  console.log(`Server runing on ${port}.`)
})

app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')

})

const showPlayers = () =>{
  players.forEach((item,i)=>{
    console.log(`player online: ${item}`)
  })
}

io.on('connection', (socket) => {
  online.push(socket.id)//put in total online
  io.sockets.emit('online',{online: online.length})
  if(players.length<2){ //only for two first players
    players.push(socket.id)
    console.log(`added ${socket.id}, total connections : ${players.length}`)
  }
  console.log(`connection open from ${socket.id}`)
  showPlayers()

  socket.on('disconnect',() =>{
    players = players.filter(item => item != socket.id) //Remove a player when is disconnect
    online = online.filter(item => item != socket.id)//Remove for total online
    io.sockets.emit('online',{online: online.length})
    console.log(`connection close from ${socket.id}, total connections : ${players.length}`)
    showPlayers()
  })
  //when play start from a signal of client
  socket.on('start',()=>{
    if(players.length >= 2){//two or more players, only two first can play
      game.init()

      switch (lastStart) {
        case players[0]: lastStart = players[1]
          break;
        case players[1]: lastStart = players[0]
        default: lastStart = players[0]
      }

      baton  = lastStart
      io.sockets.emit('table',game.getTable())
      io.sockets.emit('turn',lastStart)
    }
  })

  socket.on('play',(data)=>{
    //if player one
    if(baton == players[0]){
      if(playX(data.i,data.j)){
        io.sockets.emit('table',game.getTable())
      }else{
        socket.emit('celdError')
      }
    //if player two
    }else if(baton == players[1]){
      if(playO(data.i,data.j)){
        io.sockets.emit('table',game.getTable())
      }else{
        socket.emit('celdError')
      }
    }
    //if end game
    if(game.isEnd()){
      switch(game.getWin()){
        case 1  :
          io.sockets.emit('win',{win:players[0],positionWin:game.getPositionWin(1),player:1,table:game.getTable()})
        break;
        case -1 :
          io.sockets.emit('win',{win:players[1],positionWin:game.getPositionWin(-1),player:-1,table:game.getTable()})
        break;
        default : io.sockets.emit('deadEnd',{table:game.getTable()})
      }
    }else{
      //switch the baton
      switch (baton) {
        case players[0]:
          baton = players[1]
          break;
        case players[1]:
          baton = players[0]
        break;
        default:
      }
      io.sockets.emit('turn',baton)
    }
  })



})
