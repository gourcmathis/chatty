import Message from "./Message";
import { Scrollbars } from "react-custom-scrollbars";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {data.user.uid !== currentUser.uid && (
        <Scrollbars className="scroll">
          {messages.map((msg) => (
            <Message message={msg} key={msg.id} />
          ))}
        </Scrollbars>
      )}
    </div>
  );
};

export default Messages;
