import './App.css';
import {Auth} from "./components/auth/Auth";
import {useRef, useState} from "react";
import Cookies from "universal-cookie";
import {Chat} from "./components/chat/Chat";

const cookies = new Cookies();

function App() {
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [room, setRoom] = useState(null);

    const roomInputRef = useRef(null);

    if (!isAuth) {
        return (
            <div>
                <Auth setIsAuth={setIsAuth}/>
            </div>
        );
    }
    return (
        <div>
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
        </div>
    );
}

export default App;
