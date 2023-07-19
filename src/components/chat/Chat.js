import {useState} from "react";
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {auth, database} from "../../firebase-config";

export const Chat = (props) => {
  const {room} = props;

  const [newMessage, setNewMessage] = useState("");

  const messagesReference = collection(database, "messages");

  const handleSubmit = async (event) => {
    // this prevents the page from reloading while submitting the form
    event.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesReference, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};