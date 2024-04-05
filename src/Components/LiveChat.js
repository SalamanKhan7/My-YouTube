import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState();
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.message);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(20) + "🚀!",
        })
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="w-full ml-3 p-2 h-[400px] border border-black bg-gray-50 rounded-lg overflow-y-scroll flex flex-col-reverse">
        {chatMessages.map((c, index) => (
          <ChatMessage name={c.name} message={c.message} key={index} />
        ))}
      </div>
      <form
        className="flex border border-black w-full ml-3 p-1 bg-gray-50 rounded-md "
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "Salaman Khan",
              message: liveMessage,
            }),
            setLiveMessage("")
          );
        }}
      >
        <input
          className="px-2 m-1 border border-black w-72 text-lg"
          value={liveMessage}
          placeholder="chat..."
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button className="px-2 mx-2 m-1 border border-gray-300 rounded-sm bg-gray-200">
          Submit
        </button>
      </form>
    </>
  );
};

export default LiveChat;
