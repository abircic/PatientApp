import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Registration = () =>{
  const[formData, setFormData] = useState()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e)=>{
     e.preventDefault()
    try{
      await axios.post('http://localhost:3000/user/register',
        formData
      )
      navigate("/user/login")
    }
    catch(err)
    {
      if(err.response.status === 400)
      {
        setErrorMessage(err.response.data.message)
        //alert(err.response.data.message);
      }
      else{
        setErrorMessage("Oops something went wrong...")
      }
    }
  };
  
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]:value
    }))
  }
  return (
    <div className="registration-form">
    <form onSubmit= {handleSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={handleChange}
        required = {true}
      ></input>
      <label htmlFor="lastName">Last name</label>
       <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={handleChange}
        required = {true}
      ></input>
      <label htmlFor="type">Type</label>
      <div>
        <input type="radio" value="1" name="type" onChange={handleChange}/> Doctor
        <input type="radio" value="2" name="type" onChange={handleChange}/> Patient
      </div>
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

export default Registration 