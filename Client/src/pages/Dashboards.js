import UserContext from "../context"
import { useState, useContext, useEffect } from "react"
import axios from "axios"
import AppointmentCard from "../components/AppointmentCard"
import { useNavigate, Link } from "react-router-dom"

const Dashboard = () =>{
  const [appointments, setAppointments] = useState(null)
  const {user, setUser} = useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

console.log("Dashboard",user)
  useEffect(() => {
    if(!user) {
      navigate("/user/login")
    }
    async function fetchData() {
      try {
        var response = await axios.get(`http://localhost:3000/appointment/fetch?id=${user.id}&type=${user.type}`)
        setAppointments(response.data.appointments)
      }
      catch(err)
      {
        setErrorMessage("Oops something went wrong...")
      }
    }
    fetchData()
  }, [])
  return (
    <div className="dashboard">
    <h1>My Appointments </h1>
    <h2>Username: {user?.username}</h2>
    <h3>Type:{user?.type === 1 ? "Doctor": "Patient"}</h3>
    <Link to="/appointment/create">Create appointment</Link>

    <div className="appointent-container">
      {appointments && appointments?.sort((a,b) => new Date(a.fromDate) - new Date(b.fromDate))
      .map(x => (<AppointmentCard appointment = {x} key={x.fromDate}/>))}
    </div>
  </div>  )
}
export default Dashboard 