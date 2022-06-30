import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboards";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Nav from "./components/Nav"
import Appointment from "./pages/Appointment";
import  UserContext  from "./context";
import { useState } from "react";
import UpdatePassword from "./pages/UpdatePassword";
const App = () => {

  const [user, setUser] = useState(null)
  const [doctorId, setDoctorId] = useState(null)
  const value = {user, setUser, doctorId, setDoctorId}

  return (
    <div className="app">
      <UserContext.Provider value={value}>
      <BrowserRouter>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/user/login" element={<Login/>}></Route>
        <Route path="/user/register" element={<Registration></Registration>}></Route>
        <Route path="/user/updatePassword" element={<UpdatePassword></UpdatePassword>}></Route>
        <Route path="/appointment/create" element={<Appointment></Appointment>}></Route>
      </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}

export default App;
