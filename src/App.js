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
        <div>
          <Chat room={room}/>
        </div>
      ) : (
        <div className="lobby-container">
        <div className="background"></div>
        <div className="room">
          <label className='room-name'>Room name</label>
          <input className="box-input" ref={roomInputRef}/>
          <div className='get-in' onClick={() => setRoom(roomInputRef.current.value)}>
            GET IN
          </div>
        </div>
        <button className="sign-out" onClick={signOutUser}></button>
        </div>
      )}
    </>
  );
 }

export default App;
