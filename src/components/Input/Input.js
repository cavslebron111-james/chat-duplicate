import React from 'react';

import './Input.css';

const Input = ({ setmessage, sendMessage, message,settype }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setmessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : settype(event)}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;