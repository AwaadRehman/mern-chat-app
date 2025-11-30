import express from 'express'
import Message from '../models/messageModel.js'
import sendMessage from '../controllers/sendMessage.js'
import jwtAuthMiddleware from '../middlewares/jwtMiddleware.js'
import User from '../models/userModel.js'

const chatRouter = express.Router()
chatRouter.get('/message', jwtAuthMiddleware,async (req,res) =>{
    let messages = await Message.find().populate('sender','username').sort({createdAt:1})
    res.status(200).json({success:true,message:"All messages retreived",messages})
})
chatRouter.get('/participant',jwtAuthMiddleware,async(req,res) =>{
    let users = await User.find()
    res.status(200).json({success:true,message:'All Participants retreived',participants:users})
})
chatRouter.post('/message/send',jwtAuthMiddleware,sendMessage)

export default chatRouter