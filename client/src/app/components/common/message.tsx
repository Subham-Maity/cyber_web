import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addMessages } from "@/redux/features/jobApp/api";
import { addChatSuccess } from "@/redux/features/jobApp/slice";
import Message from "@/app/components/dashboard/candidate/chat/message";
import { queryToGpt } from "@/redux/features/jobPost/api";

export default function Messenger() {
  const [chat, setChat] = useState([
    {
      message: "how i can help you",
      role: "gpt",
    },
  ]);
  const { userRole, currUser } = useAppSelector((s) => s.persistedReducer.user);
  const { socket } = useAppSelector((s) => s.global);
  const { jobPost } = useAppSelector((s) => s.jobPost);

  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: any) => {
    if (!currUser) return;
    e.preventDefault();
    setChat((prev) => [...prev, { message: text, role: "candidate" }]);
    const query = `${text} for the job description ${jobPost?.description} and primary skills required is ${jobPost?.primarySkills}`;
    const response = await queryToGpt(dispatch, currUser, query);
    setChat((prev) => [...prev, { message: response.text, role: "gpt" }]);

    setText("");
  };
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    socket?.on("getMessage", (data: any) => {
      dispatch(addChatSuccess(data.message));
    });
    console.log("getting message ");
  }, [socket]);
  const date = new Date();

  return (
    <>
      {/* <Topbar /> */}
      <div className="messenger">
        <div className="chatBox container-fluid">
          <div className="chatBoxWrapper container-fluid">
            {true ? (
              <>
                <div className="chatBoxTop">
                  {chat?.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        message={m.message}
                        time={date}
                        own={m.role === userRole}
                      />
                      {/* <div>{m.text}</div> */}
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    cols={30}
                    className="text-area"
                    placeholder="write something..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  ></textarea>
                  <button
                    className="chatSubmitButton ms-2"
                    onClick={handleSubmit}
                  >
                    Ask
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
