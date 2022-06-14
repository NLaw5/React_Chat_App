import './App.css';
import io from 'socket.io-client'
import {useState} from "react"
import Chat from "./Chat"

//Declare our socket variable and its connection
const socket = io.connect("http://localhost:8080")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if(username !== "" && room !== "")
    {
      //function in our back-end for our socket
      socket.emit("join_room", room)
      setShowChat(!showChat)
    }
  }

  return (
    <div className="App">
      {
        showChat ? (<Chat socket={socket} username={username} room={room} exitRoom={setShowChat}/>) : (      
          <div className="joinChatContainer">
            <h3>Join A Chat</h3> 
            <input type="text" placeholder="Enter your Name here" onChange={(e) => setUsername(e.target.value)}/>
            <input type="text" placeholder="Room Id" onChange={(e) => setRoom(e.target.value)}/>
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        )
      }
    </div>
  );
}

export default App;
