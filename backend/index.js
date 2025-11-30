import express from 'express'
import mongoose from 'mongoose'
import {createServer} from 'http'
import {Server} from 'socket.io'
import authRouter from './routes/authRouter.js'
import chatRouter from './routes/chatRouter.js'
import Message from './models/messageModel.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173",
        methods:['GET','POST']
    }
})
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const port = 3000
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb+srv://awaad:awaad@cluster0.yqcsqog.mongodb.net/?appName=Cluster0')
app.use(authRouter)
app.use(chatRouter)
app.use(express.static(path.join(__dirname, '../frontend/dist')))
app.use((req,res) =>{
    res.sendFile(path.join(__dirname, '../frontend/dist', "index.html"))
})

io.on('connection',(socket) =>{
    console.log('A user connected:',socket.id)
    socket.join('globalRoom')
    socket.on('sendMessage',async (messageData) =>{
        const newMessage =await Message.create({
            sender:messageData.sender,
            content:messageData.content
        })
        const populatedMessage = await newMessage.populate('sender','username')
        io.to('globalRoom').emit("newMessage",populatedMessage)
    })
    socket.on('disconnect',() =>{
        console.log('user disconnected:',socket.id)
    })
})

httpServer.listen(port,'0.0.0.0', () =>{
    console.log('Listening on Port',port)
})

// app.listen(port,() =>{
//     console.log("Listening on Port",port)
// })