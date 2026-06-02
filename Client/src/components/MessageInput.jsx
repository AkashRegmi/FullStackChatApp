import { useState } from "react";

export default function MessageInput() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log(message);
    setMessage("");
  };

  return (
    <div className="input-box">
      <input value={message} onChange={(e) => setMessage(e.target.value)} />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
