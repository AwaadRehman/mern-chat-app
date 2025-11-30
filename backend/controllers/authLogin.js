import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
async function authLogin(req,res){
    const {username,password} = req.body

    let userExists =await User.findOne({username})
    if(!userExists){
        return res.json({success:false,message:"User Not Found"})
    }
    let user = await bcrypt.compare(password,userExists.password)
    if(!user){
        return res.json({success:false,message:"Wrong Password"})
    }
    let token = jwt.sign({id:userExists._id},'awaad',{expiresIn:'1h'})
    res.status(200).json({success:true,message:'User Logged In',user:userExists.username,token})
}

export default authLogin