import React from "react";

const MessageItem = ({ message }) => {
  const isUser = message.sender === "user";

  console.log(message)
 

  return (
    <div
      className={`flex flex-col max-w-xs px-3 py-2 rounded-lg shadow ${
        isUser
          ? "bg-blue-500 text-white self-end ml-auto"
          : "bg-gray-200 text-gray-800"
      }`}
    >
      {/* Sender name */}
      <span className="text-xs font-semibold mb-1 opacity-80">
        {message.sender?.username}
      </span>

      {/* Message text */}
      <span>{message.content}</span>
    </div>
  );
};

export default MessageItem;