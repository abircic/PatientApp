import axios from 'axios';
import {
  useRef, useState, useEffect, useContext,
} from 'react';
import UserContext from '../context';

function Dropdown(props) {
  return (
    <div className="form-group">

      <select
        className="form-control"
        name={props.name}
        onChange={props.onDropdownChange}
      >
        <option defaultValue>Select doctor</option>
        {props.options.map((item, index) => (
          <option key={index} value={item.id}>
            {item.firstName}
            {' '}
            {item.lastName}
          </option>
        ))}
      </select>
    </div>
  );
}

function DropdownList() {
  const [name, setName] = useState(null);
  const [list, setList] = useState(null);
  const isInitalMount = useRef(true);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (isInitalMount.current) {
      isInitalMount.current = false;
      async function fetchData() {
        const response = await axios.get('http://localhost:3000/user/fetchDoctors');
        setList(response.data.result);
      }
      fetchData();
    }
  }, []);

  const onDropdownChange = (e) => {
    userContext.setDoctorId(e.target.value);
    setName(e.target.value);
  };

  return (
    <div>
      <Dropdown
        name={name}
        options={list || []}
        onDropdownChange={onDropdownChange}
      />
    </div>
  );
}

export default DropdownList;
