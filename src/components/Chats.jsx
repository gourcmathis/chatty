import { useEffect } from "react";
import { useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = async (user) => {
    await dispatch({ type: "CHANGE_USER", payload: user.userInfo });
    {
      if (data.chatId !== null && user.notif !== null) {
        console.log(data.chatId);
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".notif"]: null,
        });
      }
    }
  };
  const truncate = (str, max) => {
    return str.length > max ? str.substring(0, max) + "..." : str;
  };

  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1])}
            >
              {chat[1].userInfo && (
                <img src={chat[1].userInfo.photoURL} alt="profil picture" />
              )}
              <div className="userChatInfo">
                <span className="title">
                  {chat[1].userInfo && chat[1].userInfo.displayName}
                </span>

                <p className={chat[1].notif && `lastMsgNotif`}>
                  {chat[1].lastMessage &&
                    truncate(chat[1].lastMessage?.text, 15)}
                </p>
              </div>
              {chat[1].notif && <span className="notif">{chat[1].notif}</span>}
            </div>
          ))}
    </div>
  );
};

export default Chats;
