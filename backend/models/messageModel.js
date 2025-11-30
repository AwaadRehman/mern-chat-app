import mongoose, {model,Schema} from 'mongoose'

const messageSchema = new Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        immutable:true
    }
})

let Message = model('Message',messageSchema)

export default Message