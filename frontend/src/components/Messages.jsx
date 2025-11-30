import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => (
        <MessageItem key={msg._id} message={msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;