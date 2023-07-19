import './App.css';
import {Auth} from "./components/auth";
import {useRef, useState} from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function App() {
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [room, setRoom] = useState(null);

    const roomInputRef = useRef(null);

    if (!isAuth) {
        return (
            <div>
                <Auth/>
            </div>
        );
    }
    return (
        <div>
            {room ? (
                <div> Chat </div>
            ) : (
                <div className="room">
                    <label> Enter room name:</label>
                    <input ref={roomInputRef}/>
                    <button onClick={() => setRoom(roomInputRef.current.valueOf())}>
                        Enter chat
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
