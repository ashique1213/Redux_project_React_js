import Home from './Pages/Home'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Profile from './Pages/Profile'
import Login from './Pages/Login'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/profile" element={ <Profile/> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
