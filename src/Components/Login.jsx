import axios from "axios";
import { useState } from "react";
import { Link , useNavigate }from "react-router-dom";
function Login(){
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    axios.post('http://localhost:8080/login',formData,{ withCredentials: true})
      .then(() => {
  setMessage("Logged In Successfully");
  navigate("/cards");
})
    .catch((err)=>setError(err.message));
  };


    return(
      <>
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Sign In</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">UserName</label>
              <input name="username" onChange={handleChange} type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" onChange={handleChange}
                type={passVisible ? "text" : "password"} 
                className="form-control" 
              />
            </div>

            <div className="d-flex justify-content-between mb-3">
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setPassVisible(true)}
              >
                Show
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setPassVisible(false)}
              >
                Hide
              </button>
            </div>

            <button className="btn btn-primary w-100" type="submit">Sign In</button>
             {error && <p style={{ color: 'red' }}>{error}</p>}
             {message && <p style={{ color: 'green' }}>{message}</p>}
          </form>

          <div className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/register" className ="text-primary">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default Login;