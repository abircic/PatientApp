import logo from "../images/logo.jpeg"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../context"
import { DropdownButton, Dropdown } from "react-bootstrap"
const Nav = () =>{
  const {user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const Logout = ()=>{
    setUser(null)
    navigate("/user/login")
  }
  return(
    // <!-- Navbar -->
    <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor:"#d1ebff"}}>
      {/* <!-- Container wrapper --> */}
      <div className="container-fluid">
    
        {/* <!-- Navbar brand --> */}
        <div className="logo-container" onClick={() => navigate('/')}>
        <img src={logo} alt="logo"/>
      </div>
        <a className="navbar-brand" onClick={() => navigate('/')} href="#">Patient app</a>
    
        {/* <!-- Toggle button --> */}
        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars"></i>
        </button>
    
        {/* <!-- Collapsible wrapper --> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    
            {/* <!-- Link --> */}
            {user ? 
                <>
                <li className="nav-item">
                <a className="nav-link" type = "button" onClick={() => navigate("/")}>Dashboard</a>
                </li>
                {/* <DropdownButton title="Dropdown" id="input-group-dropdown-2" align="end">
                  <Dropdown.Item onClick={() => navigate("/user/updatePassword")}>Update password</Dropdown.Item>
                </DropdownButton> */}
                <li className="nav-item">
                  <a className="nav-link" type = "button" onClick={() => navigate("/user/updatePassword")}>Update password</a>
                </li>
                <div className="user-info-container">
                <li className="nav-item">
                  <a className="nav-link" style={{fontWeight:"bold"}}>{user?.type === 1 ? "Doctor": "Patient"}</a>
                  </li>
                  <li className="nav-item">
                  <a className="nav-link" style={{fontWeight:"bold"}}>{user?.username}</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" type = "button" onClick={() => Logout()}>LogOut</a>
                  </li>
                </div>
                </>
                :
                <>
                <li className="nav-item">
                <a className="nav-link" type = "button" onClick={() => navigate("/user/login")}>Login</a>
              </li><li className="nav-item">
                  <a className="nav-link" type = "button" onClick={() => navigate("/user/register")}>Registration</a>
                </li>
                </>}
        
          </ul>
        </div>
      </div>
      {/* <!-- Container wrapper --> */}
    </nav>
    // <!-- Navbar -->
    
  )
}
export default Nav 