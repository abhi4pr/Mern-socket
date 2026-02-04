import { useEffect, useRef, useState } from "react";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const messagesDummyData = [
    {
      _id: "680f571ff10f3cd28382f094",
      senderId: "680f5116f10f3cd28382ed02",
      receiverId: "680f50e4f10f3cd28382ecf9",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      seen: true,
      createdAt: "2025-04-28T10:23:27.844Z",
    },
    {
      _id: "680f5726f10f3cd28382f0b1",
      senderId: "680f50e4f10f3cd28382ecf9",
      receiverId: "680f5116f10f3cd28382ed02",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      seen: true,
      createdAt: "2025-04-28T10:23:34.520Z",
    },
    {
      _id: "680f5729f10f3cd28382f0b6",
      senderId: "680f5116f10f3cd28382ed02",
      receiverId: "680f50e4f10f3cd28382ecf9",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      seen: true,
      createdAt: "2025-04-28T10:23:37.301Z",
    },
    {
      _id: "680f572cf10f3cd28382f0bb",
      senderId: "680f50e4f10f3cd28382ecf9",
      receiverId: "680f5116f10f3cd28382ed02",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      seen: true,
      createdAt: "2025-04-28T10:23:40.334Z",
    },
    {
      _id: "680f573cf10f3cd28382f0c0",
      senderId: "680f50e4f10f3cd28382ecf9",
      receiverId: "680f5116f10f3cd28382ed02",
      image: "../assets/pic1.png",
      seen: true,
      createdAt: "2025-04-28T10:23:56.265Z",
    },
    {
      _id: "680f5745f10f3cd28382f0c5",
      senderId: "680f5116f10f3cd28382ed02",
      receiverId: "680f50e4f10f3cd28382ecf9",
      image: "../assets/pic2.png",
      seen: true,
      createdAt: "2025-04-28T10:24:05.164Z",
    },
    {
      _id: "680f5748f10f3cd28382f0ca",
      senderId: "680f5116f10f3cd28382ed02",
      receiverId: "680f50e4f10f3cd28382ecf9",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      seen: true,
      createdAt: "2025-04-28T10:24:08.523Z",
    },
  ];

  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src="../assets/pic1.png" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          martin johnson
          <span className="w-2 h-2 rounded-full bg-screen-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={"../assets/arrow_icon.png"}
          className="md:hidden max-w-7"
        />
        <img src="../assets/help_icon.png" className="max-md:hidden max-w-5" />
      </div>
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-auto px-4 pb-6">
        {messagesDummyData.map((msg) => {
          const isMe = msg.senderId === "680f5116f10f3cd28382ed02";

          return (
            <div
              key={msg._id}
              className={`flex items-end gap-2 mb-4 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <>
                  <img
                    src="../assets/avatar_icon.png"
                    className="w-8 h-8 rounded-full mt-1"
                    alt=""
                  />
                  <p className="text-gray-500">
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </>
              )}

              {msg.image ? (
                <img
                  src={msg.image}
                  className="max-w-[260px] rounded-xl object-cover"
                />
              ) : (
                <p
                  className={`px-3 py-2 rounded-2xl max-w-[70%] text-sm
              ${
                isMe
                  ? "bg-violet-600/90 rounded-br-none"
                  : "bg-zinc-700/90 rounded-bl-none"
              }`}
                >
                  {msg.text}
                </p>
              )}

              {isMe && (
                <>
                  <img
                    src="../assets/pic1.png"
                    className="w-8 h-8 rounded-full mt-1"
                    alt=""
                  />
                  <p className="text-gray-500">
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </>
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            type="text"
            placeholder="send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image">
            <img
              src="../assets/gallery_icon.svg"
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img src="../assets/send_button.svg" className="w-7 cursor-pointer" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src="../assets/logo.png" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime</p>
    </div>
  );
};

export default ChatContainer;
