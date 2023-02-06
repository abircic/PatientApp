import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Registration() {
  const [formData, setFormData] = useState();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/user/register',
        formData,
      );
      navigate('/user/login');
    } catch (err) {
      if (err.response.status === 400) {
        setErrorMessage(err.response.data.message);
        // alert(err.response.data.message);
      } else {
        setErrorMessage('Oops something went wrong...');
      }
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
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
              {/* <!-- FirstName input --> */}
              <div className="form-outline mb-4">
                <input type="text" id="firstName" name="firstName" onChange={handleChange} required className="form-control form-control-lg" />
                <label className="form-label">First name</label>
              </div>
              {/* <!-- LastName input --> */}
              <div className="form-outline mb-4">
                <input type="text" id="lastName" name="lastName" onChange={handleChange} required className="form-control form-control-lg" />
                <label className="form-label">Last name</label>
              </div>
              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input type="email" id="username" name="username" onChange={handleChange} required className="form-control form-control-lg" />
                <label className="form-label">Email address</label>
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-4">
                <input type="password" id="password" name="password" onChange={handleChange} required className="form-control form-control-lg" />
                <label className="form-label">Password</label>
              </div>

              {/* <!-- Type input --> */}

              <div className="user-type-container">
                <input type="radio" className="btn-check" value="1" id="option1" name="type" onChange={handleChange} />
                <label className="btn btn-outline-success" htmlFor="option1">Doctor</label>

                <input type="radio" className="btn-check" value="2" id="option2" name="type" onChange={handleChange} />
                <label className="btn btn-outline-danger" htmlFor="option2">Patient</label>
              </div>

              {/* <!-- Submit button --> */}
              <button type="submit" className="btn btn-primary btn-lg btn-block">Sign up</button>

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
}

export default Registration;
