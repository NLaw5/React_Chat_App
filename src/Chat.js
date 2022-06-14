import React, {useState, useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import './Chat.css'

function Chat({socket, username, room, exitRoom}) {

  const [currentMessage, setCurrentMessage] = useState("")
  const [listOfMessages, setListOfMessages] = useState([])

  const sendMessage= async() => {
    if(currentMessage !== "")
    {
       //We need to include the actual message (keep track of the message)
       //Keep track of the name of the user
       //Keep the time of the user

       //We're going to send this message to our socket io server
       const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        //We could prob use one of the time plugins that I used in weatherdata
        time:  new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
       }

       //Need to create a socket.io event and 
       await socket.emit("send_message", messageData)
       setListOfMessages((list) => [...list, messageData]);
       setCurrentMessage("")
    }
  }

  useEffect(() => {
    console.log("In client use Effect")
    socket.on("receive_message", (data) => {
        console.log(data)
        //Appending the data to the end of our messageList, creating a new ListOfMessages
        setListOfMessages((list) => [...list, data]);
    })
  }, [socket])


  return (
    <>
        <div className="chat-window">
            {/* Divide our chat into three divs:
            First div is our chat header 

            Second div is our chat body where the messages are displayed

            Third div is where we send our messages, aka the input to write our messages */}
            <div className="chat-header">
                <p>Live Chat - {username}</p>
            </div>
            <div className="chat-body">
                {/* Need to set height for ScrollToBottom, css is in app.css */}
                <ScrollToBottom className="message-container">
                    {listOfMessages.map((element)=>{
                        return <div className="message" id={username === element.author ? "you" : "other"}>
                                <div>
                                    <div className="message-content">
                                        <p>{element.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{element.time}</p>                               
                                        <p id="author">{element.author}</p>
                                    </div>
                                </div>

                            </div>
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="Type your message here..." 
                    onChange={(e) => setCurrentMessage(e.target.value)} 
                    onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}
                    value={currentMessage}
                />
                {/* Arrow icon, just an html symbol */}
                <button onClick={sendMessage}>&#9658;</button>
            </div>
            <button className="exitRoom" onClick={() => exitRoom((target) => !target)}>Exit Chat Room</button>
        </div>
    </>
  )
}

export default Chat