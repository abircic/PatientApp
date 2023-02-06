import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';

function Dropdown(props) {
  return (
    <div className="form-group">
      <select
        className="form-control"
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
  );
}
function DropdownStatus(props) {
  const [list, setList] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const isInitalMount = useRef(true);
  useEffect(() => {
    if (isInitalMount.current) {
      isInitalMount.current = false;
      async function fetchData() {
        setList(['scheduled', 'rescheduled', 'missed', 'canceled', 'done']);
      }
      fetchData();
    }
  }, []);

  const onDropdownChange = async (e) => {
    const request = { status: e.target.value, id: props.id };
    try {
      await axios.put('http://localhost:3000/appointment/update', request);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err);
        setErrorMessage(err.response.data.message);
        // alert(err.response.data.message);
      } else {
        setErrorMessage('Oops something went wrong...');
      }
    }
  };

  return (
    <>
      <div>
        <Dropdown
          options={list || []}
          onDropdownChange={onDropdownChange}
          status={props.status}
        />
      </div>
      <div>
        {errorMessage && (
        <div className="error">
          {' '}
          {errorMessage}
          {' '}
        </div>
        )}
      </div>
    </>
  );
}

export default DropdownStatus;
