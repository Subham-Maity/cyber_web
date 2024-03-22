import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({
  conversation,
  currentUser,
}: {
  conversation: any;
  currentUser: any;
}) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        // src={
        //   user?.profilePicture
        //     ? PF + user.profilePicture
        //     : PF + "person/noAvatar.png"
        // }
        alt=""
      />
      <span className="conversationName">shiva</span>
    </div>
  );
}
