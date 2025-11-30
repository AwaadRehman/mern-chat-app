import Message from "../models/messageModel.js"

async function sendMessage(req,res){
    let content = req.body.content
    let userId = req.user.id
    console.log(userId)
    if(!content){
        res.json({success:false,message:"Invalid Message"})
    }
    let message =await Message.create({content,sender:userId})
    res.status(201).json({success:true,message:"Message Created",message})
}
export default sendMessage