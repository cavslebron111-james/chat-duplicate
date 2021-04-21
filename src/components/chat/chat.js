import React,{useEffect,useState} from 'react'
import io from 'socket.io-client';
import queryString from 'query-string';
import TextContainer from '../TextContainer/TextContainer';

import './chat.css';
import InfoBar from '../infobar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;
function chat({location}) {
    const [name,setname] = useState('');
    const [room,setroom] = useState('');
    const [users, setUsers] = useState('');
    const [message,setmessage]=useState('');
    const [messages,setmessages]=useState([]);
    

  
    const ENDPOINT = "localhost:5000";
    useEffect(()=>{
        const {name,room} = queryString.parse(location.search)
           //console.log('location',location.search);
           //console.log('data',data);
         socket = io(ENDPOINT);
        
        setname(name);
        setroom(room);
        console.log('socket',socket);
        
        socket.emit('join',{name,room},()=>{

        });
          return ()=>{
              socket.emit('diconnect');
              socket.off();
          }
        
    },[ENDPOINT,location.search]);

     useEffect(()=>{
         socket.on('message',(message)=>{
            setmessages(messages => [ ...messages, message ]);
         });
         socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
     },[]);

     const sendMessage = (event)=>{
        event.preventDefault();
        if(message){
             socket.emit('sendMessage',message,()=> setmessage(''));
         
            }
     }
  console.log(message,messages)
    return (
        <div className="outerContainer">
        <div className="container">
         <InfoBar room={room}/>
        <Messages messages={messages} name={name} />
        
       
        <Input message={message} setmessage={setmessage} sendMessage={sendMessage}/>
        </div>
        <TextContainer users={users}/>
            
        </div>
    )
}

export default chat
