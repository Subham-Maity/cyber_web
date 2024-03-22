import "./messenger.css";
import Message from "./message";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addMessages } from "@/redux/features/jobApp/api";
import { addChatSuccess } from "@/redux/features/jobApp/slice";

export default function Messenger() {
  const { chat } = useAppSelector((s) => s.jobApplication);
  const { userRole, currUser } = useAppSelector((s) => s.persistedReducer.user);
  const { socket } = useAppSelector((s) => s.global);

  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const currentDate = new Date();
    const isoString = currentDate.toISOString();
    const chatBody = {
      chatId: chat?._id,
      text,
      userId: currUser,
      role: userRole,
      timestamp: isoString,
    };
    if (chat) addMessages(dispatch, chatBody, chat.participants, socket);
    setText("");
  };
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  useEffect(() => {
    socket?.on("getMessage", (data: any) => {
      dispatch(addChatSuccess(data.message));
    });
    console.log("getting message ");
  }, [socket]);

  return (
    <>
      {/* <Topbar /> */}
      <div className="messenger">
        {/* <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={""} />
              </div>
            ))}
          </div>
        </div> */}
        <div className="chatBox container-fluid ">
          <div className="chatBoxWrapper container-fluid">
            {true ? (
              <>
                <div className="chatBoxTop">
                  {chat?.messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        message={m.text}
                        time={m.timestamp}
                        own={m.role === userRole}
                      />
                      {/* <div>{m.text}</div> */}
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="text-area"
                    placeholder="write something..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  ></textarea>
                  <button
                    className="chatSubmitButton ms-2"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}
