import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";

const Profile = () => {
  const {userName, userEmail} = useSelector((state) => state.auth)
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[80vh] bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-6 text-center">
          <div className="flex justify-center">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 bg-[#0A1931] shadow-md"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{userName }</h2>
          <p className="text-gray-500">{userEmail }</p>
          <div className="mt-6">
            <button className="bg-[#0A1931] text-white px-5 py-2 rounded-full shadow-lg hover:bg-blue-950 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
