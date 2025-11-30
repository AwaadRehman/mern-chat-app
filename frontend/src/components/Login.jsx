import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setToken}) => {
    const [loginUser,setLoginUser] = useState({username:'',password:''})
    const navigate = useNavigate()
    function handleChange(e){
        const {name,value} = e.target
        setLoginUser({...loginUser,[name]:value})
    }
    async function handleSubmit(e){
        e.preventDefault()
        const res = await fetch('http://localhost:3000/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(loginUser)
        })
        const data=await  res.json()
        console.log(data)
        if(data.success){
            localStorage.setItem('token',data.token)
            setToken(data.token)
            navigate('/')
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={loginUser.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginUser.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            // onSubmit={handleSubmit}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        {/* Optional: link to register */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;