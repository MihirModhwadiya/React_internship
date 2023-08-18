import React, { useContext } from 'react'
import { AuthContext } from '../../../Auth/AuthContext/AuthContext';
import { ChatContext } from '../ChatContext/ChatContext';

const Message = ({message}) => {
    const {isAuth} = useContext(AuthContext);
    const {data} = useContext(ChatContext);
// console.log(message);

  return (
    <div>Message</div>
  )
}

export default Message