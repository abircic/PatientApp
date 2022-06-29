import { useState,useContext, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import DropdownList from "../components/DropdownList";
import DateTimePicker from 'react-datetime-picker'
import UserContext from "../context";

const Create = () =>{
  const[formData, setFormData] = useState()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');
  const {user, setUser, doctorId, setDoctorId } = useContext(UserContext)
  console.log("Appointment",user)

  useEffect(() => {
    if(!user) {
      navigate("/user/login")
    }
  }, [])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const request = {fromDate : formData?.fromDate, patientId : user.id, doctorId : doctorId}
      await axios.post('http://localhost:3000/appointment/create',
      request
      )
      navigate("/")
    }
    catch(err)
    {
      console.log(err)
      if(err.response && err.response.status === 400)
      {
        setErrorMessage(err.response.data.message)
        //alert(err.response.data.message);
      }
      else{
        setErrorMessage("Oops something went wrong...")
      }
    }
  };
  const handleDateChange = (e) => {
    console.log(e)
    const value = e
    const name = "fromDate"
    setFormData((prevState) => ({
      ...prevState,
      [name]:value
    }))
  }
  return (
    <div className="appointment-form">
    <form onSubmit= {handleSubmit}>
    <DateTimePicker onChange={handleDateChange} value={formData? formData.fromDate : new Date()}/>
    <div className="container mt-2">
      <DropdownList />
    </div>
    <input
        type="submit"
      ></input>
    </form>
      {errorMessage && <div className="error"> {errorMessage} </div>}
    </div>
    
  )
}

export default Create 
