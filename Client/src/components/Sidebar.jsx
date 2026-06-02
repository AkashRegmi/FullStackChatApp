export default function Sidebar() {
  const users = [
    {
      id: 1,
      name: "John",
      online: true,
    },
    {
      id: 2,
      name: "Jane",
      online: false,
    },
  ];

  return (
    <div className="sidebar">
      <h2>Chats</h2>

      {users.map((user) => (
        <div
          key={user.id}
          className="user-item"
        >
          <span>{user.name}</span>

          {user.online ? "🟢" : "⚪"}
        </div>
      ))}
    </div>
  );
}