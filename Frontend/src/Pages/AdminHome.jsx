import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Users from "../Components/Users";

const AdminHome = () => {
  return (
    <div>
          <Navbar />
          <Search/>
          <Users />
          <Footer/>
    </div>
  )
}

export default AdminHome
