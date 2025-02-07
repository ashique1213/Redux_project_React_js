import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Profile = () => {
  const { userName, userEmail, userId } = useSelector((state) => state.auth); 
  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  console.log(profileImage)

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/profile/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileImage(data.profile_image || "https://i.pravatar.cc/150?img=3");
        } else if (response.status === 401) {
          console.error("Unauthorized, redirecting to login...");
          navigate("/login");
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfileImage("https://i.pravatar.cc/150?img=3");
      }
    };
    if (userId) {
      fetchProfile();
    }
  }, [navigate, userId]);

  const handleEditProfileImage = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); 
    }
  };

  const handleSubmitImage = async () => {
    if (!selectedImage) {
      console.error("No image selected");
      return;
    }

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/update/${userId}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfileImage(data.profile_image); 
        setSelectedImage(null); 
        console.log("Updated Image:", data.profile_image);
      } else {
        console.error("Failed to update profile image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[80vh] bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-6 text-center">
          <div className="flex justify-center">
          <img
              src={selectedImage || profileImage} 
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 bg-[#0A1931] shadow-md object-cover"
            />

          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4 capitalize">{userName}</h2>
          <p className="text-gray-500">{userEmail}</p>

          <div className="mt-6">
            <button
              onClick={handleEditProfileImage}
              className="bg-[#0A1931] text-white px-5 py-2 rounded-full shadow-lg hover:bg-blue-950 transition"
            >
              Edit Profile Image
            </button>
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange} 
            />
          </div>

          {/* Show submit button only if an image is selected */}
          {selectedImage && (
            <div className="mt-4">
              <button
                onClick={handleSubmitImage}
                className="bg-red-950 text-white px-5 py-2 rounded-full shadow-lg hover:bg-red-900 transition"
              >
                Upload & Save
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
