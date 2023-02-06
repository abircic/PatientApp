import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context';

function UpdatePassword() {
  const [formData, setFormData] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  const username = localStorage.getItem('username');
  useEffect(() => {
    if (!id || !username) {
      navigate('/user/login');
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = { username, oldPassword: formData.oldPassword, newPassword: formData.newPassword };
      const response = await axios.put(
        'http://localhost:3000/user/updatePassword',
        request,
      );
      if (!response.data.success) {
        setErrorMessage(response.data.message);
      }
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.message);
      } else {
        console.log(err);
        setErrorMessage('Oops something went wrong...');
      }
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input type="password" id="oldPassword" name="oldPassword" onChange={handleChange} required className="form-control form-control-lg" />
                <label className="form-label">Old password</label>
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-4">
                <input type="password" id="newPassword" name="newPassword" onChange={handleChange} required className="form-control form-control-lg" />
                <label className="form-label">New password</label>
              </div>

              {/* <!-- Submit button --> */}
              <button type="submit" className="btn btn-primary btn-lg btn-block">Update password</button>

            </form>
            {errorMessage && (
            <div className="error">
              {' '}
              {errorMessage}
              {' '}
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
  return (
    <div className="updatePassword-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldPassword">Old Password</label>
        <input
          id="oldPassword"
          name="oldPassword"
          type="password"
          onChange={handleChange}
          required
        />
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          onChange={handleChange}
          required
        />
        <input
          type="submit"
        />
      </form>
      {errorMessage && (
      <div className="error">
        {' '}
        {errorMessage}
        {' '}
      </div>
      )}
    </div>

  );
}

export default UpdatePassword;
