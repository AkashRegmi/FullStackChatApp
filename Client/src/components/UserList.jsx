// src/components/UserList.jsx

const UserList = ({ users }) => {
  return (
    <div>
      <h3>Users</h3>

      {users.length === 0 ? (
        <p>No users</p>
      ) : (
        users.map((user, index) => (
          <div key={index}>{user}</div>
        ))
      )}
    </div>
  );
};

export default UserList;