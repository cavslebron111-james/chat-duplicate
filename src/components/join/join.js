import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import './join.css';

function join() {
    const [name,setname] = useState('');
    const [room,setroom] = useState('');
   
   
   
    return (
        <div className="joinOutercontainer">
        <div className="joinInnercontainer">
        <h1 className="heading">join</h1>
        <div><input placeholder="name" className="joininput" type="text" onChange={(event)=>setname(event.target.value)} /></div>
        <div><input placeholder="room" className="joininput mt-20" type="text" onChange={(event)=>setroom(event.target.value)} /></div>
        
        
        <Link onClick={event =>(!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
       <button className="button mt-20" type='submit'>sign</button>
        
       </Link>
        </div>
            
        </div>
    )
}

export default join
