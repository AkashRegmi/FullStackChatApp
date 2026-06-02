export default function MessageList() {
  const messages = [
    {
      sender: "John",
      message: "Hello",
    },
    {
      sender: "You",
      message: "Hi",
    },
  ];

  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.sender}</strong>

          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
}