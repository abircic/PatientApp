import { useState,useContext, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import DropdownList from "../components/DropdownList";
import DateTimePicker from 'react-datetime-picker'
import UserContext from "../context";
import appointmentLogo from "../images/Appointment.jpeg"

const Create = () =>{
  const[formData, setFormData] = useState()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');
  const {user, setUser, doctorId, setDoctorId } = useContext(UserContext)

  useEffect(() => {
    if(!user) {
      navigate("/user/login")
    }
  }, [])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!formData?.fromDate)
    {
      setErrorMessage("Date is required")
      return
    }
    try{
      const request = {fromDate : formData?.fromDate, patientId : user.id, doctorId : doctorId}
      await axios.post('http://localhost:3000/appointment/create',
      request
      )
      navigate("/")
    }
    catch(err)
    {
      if(err.response && err.response.status === 400)
      {
        console.log(err)
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
  return(
    <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src={appointmentLogo} className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
      <form onSubmit= {handleSubmit}>
        <div className="appointment-container">
          <div className="appointment-input-container">
            {/* <!-- DateTime input --> */}
              <div className="form-outline mb-4">
              <DateTimePicker onChange={handleDateChange} value={formData? formData.fromDate : new Date()}/>
              {/* <input type="email" id="username" name="username" onChange={handleChange} required = {true} className="form-control form-control-lg" /> */}
              <div className="dropdown-container">
                <DropdownList/>
              </div>
              {/* <input type="email" id="username" name="username" onChange={handleChange} required = {true} className="form-control form-control-lg" /> */}
            </div>
          </div>
          {/* <!-- Submit button --> */}

          <button type="submit" className="btn btn-outline-success btn-lg btn-block">Create</button>
        </div>
        </form>
        {errorMessage && <div className="error"> {errorMessage} </div>}
      </div>
    </div>
  </div>
</section>
  )
}

export default Create 
