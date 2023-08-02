import { useNavigate } from "react-router-dom";

import "./Login.css";

const LoginP = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/categories");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignIn();
  };

  return (
    <div className="form-container">
      <p className="title">Login</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="" />
          <div className="forgot">
            <a rel="noopener noreferrer" href="#">
              Forgot Password ?
            </a>
          </div>
        </div>
        <button className="sign" type="submit">
          Sign in
        </button>
      </form>
      <div className="social-message">
        <div className="line"></div>
        <p className="message">Login with social accounts</p>
        <div className="line"></div>
      </div>
      <div className="social-icons">{/* Sosyal medya ikonları */}</div>
      <p className="signup">
        Don t have an account?
        <a rel="noopener noreferrer" href="#" className="">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginP;
