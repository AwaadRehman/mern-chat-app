import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({setToken}) => {
    const [registerUser,setRegisterUser] = useState({username:'',password:''})
    const navigate = useNavigate()
    function handleChange(e){
        const {name,value} = e.target
        setRegisterUser({...registerUser,[name]:value})
        console.log(registerUser)
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(!registerUser) return
        const res = await fetch('http://localhost:3000/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(registerUser)
        })
        const data = await res.json()
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
          Register User
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
              value={registerUser.username}
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
              value={registerUser.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            onSubmit={handleSubmit}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md 
             hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
