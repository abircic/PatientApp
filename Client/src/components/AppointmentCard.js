import DropdownStatus from "./DropdownStatus.js";

const AppointmentCard = ({appointment}) => {
  const fromDate = new Date(appointment.fromDate);
  const toDate = new Date(appointment.toDate);
  return(
    <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">From date</th>
      <th scope="col">To date</th>
      <th scope="col">First name</th>
      <th scope="col">Last name</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{fromDate.toLocaleString()}</td>
      <td>{toDate.toLocaleString()}</td>
      <td>{appointment.firstName}</td>
      <td>{appointment.lastName}</td>
      <td><DropdownStatus id={appointment.id} status={appointment.status}/></td>
    </tr>
  </tbody>
</table>
  )
}

export default AppointmentCard