const Chat = () => {
  return (
    <>
      <div className="chat-block">
        <div className="chat-body"></div>
      </div>
      <div className="chat-inputs position-fixed bottom-0 d-flex flex-column align-items-end p-3">
        <input
          type="text"
          placeholder="Message"
          className="form-control shadow-none"
        />
      </div>
    </>
  );
};

export default Chat;
