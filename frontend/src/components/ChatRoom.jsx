import React, { useState } from 'react'
import Participants from './Participants';
import Messages from './Messages';
import MessageInput from './MessageInput';
const ChatRoom = ({messages,participants,socket}) => {
  //   const [participants] = useState([
  //   { id: 1, name: "Afridi" },
  //   { id: 2, name: "Guest" },
  // ]);

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-xl font-semibold shadow">
        Chat Room
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Participants sidebar */}
        <Participants participants={participants} />

        {/* Chat area */}
        <div className="flex flex-col flex-1 bg-white">
          <Messages messages={messages} />
          <MessageInput socket={socket}/>
        </div>
      </div>
    </div>

  )
}

export default ChatRoom