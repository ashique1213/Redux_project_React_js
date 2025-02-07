import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Users = ({ userData }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); 
  
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId); 
    setShowModal(true); 
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/adminside/delete/${userToDelete}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setShowModal(false); 
        toast.success("User deleted successfully!"); 
      
        setTimeout(() => {
          window.location.reload(); 
        }, 2000);
        return;
      }
      
      const data = await response.text(); 
      const jsonData = data ? JSON.parse(data) : {}; 

      toast.error(jsonData.error || "Failed to delete user"); 
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user"); 
    }
  };

  const handleCancel = () => {
    setShowModal(false); 
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
                    <button
                      onClick={() => navigate(`/edituser/${user.id}`)}
                      className="bg-blue-950 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteClick(user.id)} 
                      className="bg-red-900 text-white px-3 py-1 rounded"
                    >
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-900 text-white rounded-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Users;
