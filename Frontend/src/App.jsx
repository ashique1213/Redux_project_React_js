import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import store, { persistor } from './redux/store'; // Import the persistor from store
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import AdminHome from './Pages/AdminHome';
import AddNewUser from './Pages/AddNewUser';

const App = () => {
  return (
    <Provider store={store}> {/* Wrap the app with Redux Provider */}
      <PersistGate loading={null} persistor={persistor}> {/* Wrap with PersistGate */}
        <Router> {/* Enable routing */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/adminhome" element={<AdminHome />} />
            <Route path="/addnewuser" element={<AddNewUser />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;