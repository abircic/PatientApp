
const AppointmentCard = ({appointment}) => {
  return(
    <div className="appointment-card">
      <h3>From date: {appointment.fromDate}</h3>
      <h3>To date:{appointment.toDate}</h3>
      <h3>First name: {appointment.firstName}</h3>
      <h3>Last name: {appointment.lastName}</h3>
      <h3>Status: {appointment.status}</h3>
      <br/>
    </div>
  )
}

export default AppointmentCard