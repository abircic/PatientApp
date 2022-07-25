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
  const id = localStorage.getItem("id")
  const username = localStorage.getItem("username")
  const type = localStorage.getItem("type")
  useEffect(() => {
    if(!id || !username || !type) {
      navigate("/user/login")
    }
    async function fetchData() {
      try {
        var response = await axios.get(`http://localhost:3000/appointment/fetch?id=${id}&type=${type}`)
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
    <h1 style={{fontSize : 30, marginTop: 20, textDecoration: "underline"}}>My appointments </h1>
    {type == 2 && <button type="button" className="btn btn-outline-success" onClick={() => navigate("/appointment/create")}>Create appointment</button>}
    <div className="appointent-container">
      {appointments && appointments?.sort((a,b) => new Date(a.fromDate) - new Date(b.fromDate))
      .map(x => (<AppointmentCard appointment = {x} key={x.fromDate}/>))}
    </div>
  </div>  )
}
export default Dashboard 