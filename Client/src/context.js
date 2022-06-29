import { createContext } from "react"

const UserContext = createContext({
  user : { id: null, username: null, type : null },
  setUser : ()=>{},
  doctorId:null,
  setDoctorId: () => {}
})
export default UserContext