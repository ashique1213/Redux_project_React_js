import React from "react";

const Users = () => {
  const userData = [
    { id: 1, username: "JohnDoe", email: "john@example.com" },
    { id: 2, username: "JaneSmith", email: "jane@example.com" },
  ];

  return (
    <div className="users flex justify-center">
      <div className="overflow-x-auto mt-10 mb-10 p-5 max-w-[1000px] w-full rounded-lg bg-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-lg">
              <th className="p-2">ID</th>
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id} className="border-t font-bold">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <button className="bg-blue-950 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                </td>
                <td className="p-2">
                  <button className="bg-red-900 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
