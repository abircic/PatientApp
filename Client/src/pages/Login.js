import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import UserContext from "../context"

const Login = () =>{ 
  const[formData, setFormData] = useState()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');

  const { setUser} = useContext(UserContext)
  const handleSubmit = async (e)=>{
     e.preventDefault()
    try{
      const response = await axios.post('http://localhost:3000/user/login',
        formData
      )
      setUser({id:response.data.id, type : response.data.type, username : formData.username})
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
  return (
    <div className="login-form">
    <form onSubmit= {handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={handleChange}
        required = {true}
      ></input>
      <label htmlFor="password">Password</label>
       <input
        id="password"
        name="password"
        type="password"
        onChange={handleChange}
        required = {true}
      ></input>
      <input
        type="submit"
      ></input>
    </form>
      {errorMessage && <div className="error"> {errorMessage} </div>}
    </div>
    
  )
}

export default Login 
