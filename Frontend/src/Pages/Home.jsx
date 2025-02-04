import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Users from '../Components/Users'
import Search from '../Components/Search'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Search />
      <Users />
      <Header />
      <Footer/>
    </div>
  )
}

export default Home
