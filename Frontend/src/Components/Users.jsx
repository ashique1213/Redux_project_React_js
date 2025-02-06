import React from "react";

const Users = ({ userData }) => {

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/adminside/delete/${userId}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });      
  
      if (response.ok) {
        alert("User deleted successfully");
        window.location.reload(); // Refresh user list
        return;
      }
  
      const data = await response.text(); // Read response as text first
      const jsonData = data ? JSON.parse(data) : {}; // Parse only if there's content
  
      alert(jsonData.error || "Failed to delete user");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred");
    }
  };
  
  
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
            {userData.length > 0 ? (
              userData.map((user) => (
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
                    <button onClick={() => handleDelete(user.id)} className="bg-red-900 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
