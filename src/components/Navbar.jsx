import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { auth } from "../firebase";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const disconnect = () => {
    signOut(auth);
  };

  return (
    <div className="navbar">
      <span className="logo">Chatty</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="Profil picture" />
        <span>{currentUser.displayName}</span>
        <button onClick={disconnect}>
          <FiLogOut />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
