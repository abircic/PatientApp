import axios from 'axios'
import { useRef, useState, useEffect } from 'react'

const Dropdown = (props) => (
  <div className="form-group">
    <select
      className="form-control"
      name={props.name}
      onChange={props.onDropdownChange}
    >
      <option defaultValue>{props.status}</option>
      {props.options.map((item, index) => (
        <option key={index} value={item.id}>
          {item}
        </option>
      ))}
    </select>
  </div>
)
const DropdownStatus = (props) => {
  const [name, setName] = useState(null)
  const [list, setList] = useState(null)
  const isInitalMount = useRef(true)
  useEffect(() => {
    if(isInitalMount.current){
      isInitalMount.current = false
      async function fetchData()
      {
          setList(["scheduled","rescheduled","missed","canceled","done"])
      }
      fetchData()
    }
  }, [])

  const onDropdownChange = (e) => {
    const request = { status:e.target.value, id: props.id}
    async function sendRequest()
    {
        const response = await axios.put('http://localhost:3000/appointment/update', request)
    }
    sendRequest()
  }

  return (
    <div>
      <Dropdown
        name={name}
        options={list ? list : []}
        onDropdownChange={onDropdownChange}
        status={props.status}
      />
    </div>
  )
}

export default DropdownStatus