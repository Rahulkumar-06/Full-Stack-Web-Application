import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const [error,setError] =useState('');
  const [message,setMessage]=useState('');
  const [formData ,setFormData]=useState({
      username : "",
      password : ""
  });

  const handleChange = (e)=>{
      const{name,value} = e.target;
      setFormData ((pre)=>({
        ...pre,
        [name] : value 
  }));
};
const handilsubmit = async (e)=>
  {
     e.preventDefault();
    setError('');
    setMessage('');
    axios.post('http://localhost:8080/register',formData)
      .then(setMessage("Registered Successfully"))
    .catch((err)=>setError(err.message));
  };

  function handlePwd1Change(e) {
    setPwd1(e.target.value);
  }

  function handlePwd2Change(e) {
    const value = e.target.value;
    setPwd2(value);
    setCheck(pwd1 !== value);
  }

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setShowPassword(prev => !prev);
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5">

                    <p className="text-center h1 fw-bold mb-5">Sign up</p>

                    <form className="mx-1 mx-md-4" onSubmit={handilsubmit}>
                      {/* Name Field */}
                      <div className="mb-4">
                        <label htmlFor="name" className="form-label">UserName</label>
                        <input type="text" name="username" onChange={handleChange} id="name" className="form-control" />
                      </div>

                      {/* Email Field */}
                      {/* <div className="mb-4">
                        <label htmlFor="email" className="form-label">Your Email</label>
                        <input type="email" id="email" className="form-control" />
                      </div> */}

                      {/* Password Field */}
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="form-control"
                          value={pwd1}
                          onChange={handlePwd1Change}
                        />
                      </div>

                      {/* Repeat Password */}
                      <div className="mb-4">
                        <label htmlFor="repeat-password" className="form-label">Repeat Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="repeat-password"
                          name="password"
                          onChange ={(e)=>{
                            handleChange(e);
                            handlePwd2Change(e);
                          }}
                          className="form-control"
                          value={pwd2}
        
                        />
                      </div>

                      {/* Toggle Show/Hide */}
                      <div className="mb-3 text-center">
                        <button onClick={togglePasswordVisibility} className="btn btn-secondary btn-sm">
                          {showPassword ? "Hide Password" : "Show Password"}
                        </button>
                      </div>

                      {/* Password Mismatch */}
                      {check && (
                        <p className="text-danger text-center">Password does not match</p>
                      )}

                      {/* Register Button */}
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Register
                        </button>
                      </div>
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      {message && <p style={{ color: 'green' }}>{message}</p>}
                    </form>
                                      
                  <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-success" onClick={() => navigate('/')}>
                      Go To Login
                    </button>
                  </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
