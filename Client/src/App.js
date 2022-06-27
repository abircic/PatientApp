import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboards";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Nav from "./components/Nav"
const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path="/user/login" element={<Login></Login>}></Route>
        <Route path="/user/register" element={<Registration></Registration>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
