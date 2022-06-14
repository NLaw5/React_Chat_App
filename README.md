# React Chat App

## Description

This react app showcases the ability for two users to create a room of the same ID and chat using socket.io functionalities. The socket.io functionalities from server-side are found here "[https://github.com/NLaw5/express_server_React_Chat_App]". This app contains two components: App and Chat. 

### App Component 
The App component allows users to enter their username and a room id, while also forming our connection to our express server using **const socket = io.connect("http://localhost:8080")**

Any connection to the server side will be done through our socket object, where we can use the function **emit** to access any of our server-side socket functions that is declared.

The app also contains a child component called Child, where messagging will take place between two users of the same room id. Props that will be sent to the child are: 
- **socket**
- **username**
- **room id**
- **showChat** (acts as a toggle to either display the Chat component or the Join Room View

### Chat Component
This Chat component will receive a list of props. There are two main functions in this component:
- useEffect (whenever our client receives messages, useEFfect will access the "receve_mesasge" socket function to grab any messages and add them to an array of listOfMessages
- sendMessage (an async function in which we create an object to hold our mesasgeData and send that messageData to our server via the socket function "send_message")

## Plugins used:
- socket.io-client
- react-scroll-to-bottom
