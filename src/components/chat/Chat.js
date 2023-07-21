import {useEffect, useState} from "react";
import {addDoc, collection, onSnapshot, query, serverTimestamp, where, orderBy} from 'firebase/firestore';
import {auth, database} from "../../firebase-config";
import './Chat.css';

export const Chat = (props) => {
  const {room} = props;
  const [newMessage, setNewMessage] = useState("");
  const messagesReference = collection(database, "messages");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // this query will retrieve the message sent in a specific room to the user
    const queryMessages = query(messagesReference,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unSubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id});
      });
      setMessages(messages);
    });
    return () => unSubscribe();
  }, []);


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
      <div className="header">
        <h1>{room}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user}</span>
            {message.text}
          </div>
        ))}
      </div>
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