import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex p-2 items-center shadow-sm ">
      <img
        alt="User"
        className="h-5 text-center"
        src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
      />
      <span className="font-bold px-1">{name}</span>
      <span>{message}</span>
    </div>
  );
};

export default ChatMessage;
