import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () =>{ 
  const[formData, setFormData] = useState()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e)=>{
    e.preventDefault()
  try{
    const request = {username: formData.username, password:formData.password}
    const response = await axios.post('http://localhost:3000/user/login',
      request
    )
    localStorage.setItem("id", response.data.id)
    localStorage.setItem("type", response.data.type)
    localStorage.setItem("username", formData.username)
    //navigate("/appointment/fetch")
    navigate("/")
  }
  catch(err)
  {
    if(err.response && err.response.status === 400)
    {
      setErrorMessage(err.response.data.message)
      //alert(err.response.data.message);
    }
    else{
      console.log(err)
      setErrorMessage("Oops something went wrong...")
    }
  }
  }

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]:value
    }))
  }
  return(
    <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
      <form onSubmit= {handleSubmit}>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input type="email" id="username" name="username" onChange={handleChange} required = {true} className="form-control form-control-lg" />
            <label className="form-label">Email address</label>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <input type="password" id="password" name="password" onChange={handleChange} required = {true} className="form-control form-control-lg" />
            <label className="form-label">Password</label>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>

        </form>
        {errorMessage && <div className="error"> {errorMessage} </div>}
      </div>
    </div>
  </div>
</section>
  )
}
export default Login 
