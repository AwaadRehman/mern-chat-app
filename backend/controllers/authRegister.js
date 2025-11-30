import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
async function authRegister(req,res){
    try{
        const {username,password} = req.body
    
        let userExists = await User.findOne({username})
        if(userExists){
           return res.json({success:false,message:"User already Registered"})
        }
        let hashedPassword = await bcrypt.hash(password,10)
        let user = await User.create({username,password:hashedPassword})
        let token = jwt.sign({id:user._id},'awaad',{expiresIn:'1h'})
        res.status(201).json({success:true,message:"User Registered",user:user.username,token})
    }catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Sever Error"})

    }
}

export default authRegister