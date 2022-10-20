import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [time, setTime] = useState(Date.now());

  const ref = useRef();

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " min";
    }
    return "Just now";
  }

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    ref.current?.scrollIntoView({ behavior: "smooth" });
    return () => {
      clearInterval(interval);
    };
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="profil picture"
        />
        <span className="sendingDate">
          {timeSince(new Date(message.date.seconds * 1000))}
        </span>
      </div>
      <div className="messageContent">
        {message.img && <img src={message.img} alt="photo" />}
        {message.text && <p>{message.text}</p>}
      </div>
    </div>
  );
};

export default Message;
