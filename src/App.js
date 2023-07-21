import './App.css';
import {Auth} from "./components/auth/Auth";
import {useRef, useState} from "react";
import Cookies from "universal-cookie";
import {Chat} from "./components/chat/Chat";
import {signOut} from "firebase/auth";
import {auth} from './firebase-config';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);
  const signOutUser = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
  return (
    <>
      {room ? (
        <Chat room={room}/>
      ) : (
        <div className="room">
          <label> Enter room name:</label>
          <input ref={roomInputRef}/>
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter chat
          </button>
        </div>
      )}
    <div className="sign-out">
      <button onClick={signOutUser}>Sign Out</button>
    </div>
    </>
  );
}

export default App;
