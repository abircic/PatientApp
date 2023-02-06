import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboards';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Nav from './components/Nav';
import Appointment from './pages/Appointment';
import UserContext from './context';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  const [user, setUser] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const value = {
    user, setUser, doctorId, setDoctorId,
  };

  return (
    <div className="app">
      <UserContext.Provider value={value}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Registration />} />
            <Route path="/user/updatePassword" element={<UpdatePassword />} />
            <Route path="/appointment/create" element={<Appointment />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
