import React, { useState } from "react";

const MessageInput = ({socket}) => {
  const [messageInput,setMessageInput] = useState({content:''})
  let token = localStorage.getItem('token')
  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/message/send',{
      method:'POST',
      headers:{
        'authorization':`Bearer ${token}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify(messageInput)
    })
    const data =await res.json()
    console.log(data)
    if(data.success){
      socket.emit('sendMessage',data.message)
      setMessageInput({content:''})
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-4 bg-white border-t border-gray-200"
    >
      <input
        type="text"
        value={messageInput.content}
        name="content"
        onChange={(e) => setMessageInput({content:e.target.value})}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md 
                   hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
