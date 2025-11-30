import { useState } from "react";
import { io } from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";

const socket = io("http://localhost:3000");

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("newMessage"); // cleanup when component unmounts
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem(token));
    };

    if (token) {
      async function getMessages() {
        let res = await fetch("http://localhost:3000/message", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        let data = await res.json();
        setMessages(data.messages);
        console.log(data);
      }
      getMessages();
      socket.on("newMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
      async function getParticipants() {
        let res = await fetch("http://localhost:3000/participant", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        let data = await res.json();
        console.log(data);
        setParticipants(data.participants);
      }
      getParticipants();
    }

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      socket.off("newMessage");
    };
  }, [token]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <div className="h-screen">
                <ChatRoom
                  socket={socket}
                  messages={messages}
                  participants={participants}
                />
              </div>
            ) : (
              <p>
                Account Required{" "}
                <Link to={"/register"} className="text-blue-700 underline">
                  Register
                </Link>{" "}
                or{" "}
                <Link to={"/login"} className="text-blue-700 underline">
                  Login
                </Link>
              </p>
            )
          }
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </>
  );
}

export default App;
