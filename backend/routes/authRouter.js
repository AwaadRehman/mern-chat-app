import express from 'express'
import authRegister from '../controllers/authRegister.js'
import authLogin from '../controllers/authLogin.js'

const authRouter  = express.Router()

authRouter.post('/register',authRegister)
authRouter.post('/login',authLogin)

export default authRouter