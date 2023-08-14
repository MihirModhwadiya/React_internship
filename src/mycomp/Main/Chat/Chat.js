import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-header">
        {/* Chat header content */}
      </div>
      <div className="chat-messages">
        {/* Chat messages */}
      </div>
      <div className="chat-input">
        <input type="text" className="form-control"/>
      </div>
    </div>
  );
};

export default Chat;
