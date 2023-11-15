//const cors=require('cors')
const io = require('socket.io')({
    cors: {
        origin: 'https://socketfront.vercel.app',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    },
});

io.listen(5000);
const users={}

io.on("connection",socket=>{
     console.log("new User")
   // socket.emit("chat-message","Hi There")
    socket.on('new-user',name=>{
       users[socket.id] =name
        socket.broadcast.emit('user-connected',name)
    })
    socket.on('send-chat-message',message=>{
        console.log(message)
        socket.broadcast.emit('chat-message',{message:message,name:users[socket.id],id:socket.id})
    })
    socket.on('disconnect',()=>{

        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
    })

})