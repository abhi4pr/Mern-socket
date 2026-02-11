import { useEffect, useRef, useState, useContext } from "react";
import { formatMessageTime } from "../lib/utils";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState("");

  const scrollEnd = useRef();

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() == "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || "../assets/pic1.png"}
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id)}
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
        {messages?.map((msg, index) => {
          return (
            <div
              key={index}
              className={`flex items-end gap-2 mb-4 ${
                msg.senderId === authUser._id ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar + timestamp — only for incoming messages (left side) */}
              {msg.senderId !== authUser._id && (
                <div className="flex flex-col items-center">
                  <img
                    src={selectedUser.profilePic || "../assets/avatar_icon.png"}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </div>
              )}

              {/* Message bubble */}
              {msg.image ? (
                <img
                  src={msg.image}
                  className="max-w-[260px] rounded-xl object-cover"
                  alt="shared image"
                />
              ) : (
                <p
                  className={`px-3 py-2 rounded-2xl max-w-[70%] text-sm break-words
        ${
          msg.senderId === authUser._id
            ? "bg-violet-600/90 rounded-br-none" // my message
            : "bg-zinc-700/90 rounded-bl-none" // incoming
        }`}
                >
                  {msg.text}
                </p>
              )}

              {/* For my own messages – small time below or on right */}
              {msg.senderId === authUser._id && (
                <p className="text-xs text-gray-500 self-end mb-1 ml-2">
                  {formatMessageTime(msg.createdAt)}
                </p>
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
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key == "Enter" ? handleSendMessage(e) : null)}
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src="../assets/gallery_icon.svg"
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img
          onClick={handleSendMessage}
          src="../assets/send_button.svg"
          className="w-7 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img
        src={authUser.profilePic || "../assets/avatar.png"}
        className="max-w-16"
      />
      <p className="text-lg font-medium text-white">Chat anytime</p>
    </div>
  );
};

export default ChatContainer;
