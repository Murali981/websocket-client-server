import { useEffect, useState } from "react";

import "./App.css";
/// WebSocket comes from a native browser API no need to import this...

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null); //// We have initialized a socket variable...
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080"); //// We are creating a new websocket connection....
    socket.onopen = () => {
      //// Whenever the socket is open then you will set the state variable....
      /// Whenever the socket is open you can see the message as connected...
      console.log("Connected");
      setSocket(socket); /// only when the socket is open then only we will set the socket variable....
    };
    socket.onmessage = (message) => {
      console.log("Received message", message.data);
      setLatestMessage(message.data);
    };

    return () => {
      socket.close(); //// Cleaning up the connection as we are closing the socket connection....
    };
  }, []);

  if (!socket) {
    return <div>Connecting to socket server...</div>;
  }

  return (
    <>
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          socket.send(message);
        }}
      >
        Send
      </button>
      {latestMessage}
    </>
  );
}

export default App;
