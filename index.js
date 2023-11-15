const cors=require('cors')
const socketIo=require('socket.io');
const http=require('http')
const express=require('express');
const app=express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
const server = http.createServer(app);
const io = socketIo(server);
/*const corsParams={
    origin: '*',
    methods: ['GET', 'POST','OPTIONS'],
    allowedHeaders: ['Content-Type'],
    withCredentials:true
}*/
    /*const io = require('socket.io')({
    cors: {
        origin: 'https://socketfront.vercel.app',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    },
});*/
//app.use(cors(corsParams))

const PORT=5000
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

server.listen(PORT,()=>{
    console.log(`Server is working on port:${5000}`)
})