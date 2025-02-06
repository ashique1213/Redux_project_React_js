import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Users from "../Components/Users";
import Footer from "../Components/Footer";

const AdminHome = () => {
  const [users, setUsers] = useState([]); // Store all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/adminside/users/")
      .then((response) => {
        setUsers(response.data.user_list);
        setFilteredUsers(response.data.user_list);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching users.");
        setLoading(false);
      });
  }, []);

  // Filter users based on search input
  const handleSearch = (query) => {
    if (!query) {
      setFilteredUsers(users); // Reset to full list if empty
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Search onSearch={handleSearch} />
        <div className="flex-grow">
          {loading ? <div>Loading...</div> : error ? <div>{error}</div> : <Users userData={filteredUsers} />}
        </div>
      <Footer />
    </div>

  );
};

export default AdminHome;
