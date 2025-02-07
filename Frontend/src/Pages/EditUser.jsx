import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
  const { userId } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "" });

  useEffect(() => {
    // Fetch user details
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/adminside/update/${userId}/`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFormData({ username: data.username, email: data.email });
        } else {
          toast.error("User not found");
          navigate("/adminhome"); 
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("An error occurred while fetching user details");
      }
    };
    fetchUser();
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.username.trim()) {
      toast.error("Username cannot be empty.");
      return;
    }
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/adminside/update/${userId}/`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("User updated successfully");
        setTimeout(() => {
          navigate("/adminhome"); 
        }, 2000);
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An error occurred while updating the user");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen p-0 bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl">
          <h2 className="text-xl font-semibold text-center mb-4">Edit User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-2 rounded-lg hover:bg-blue-900"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer /> 
    </>
  );
};

export default EditUser;
