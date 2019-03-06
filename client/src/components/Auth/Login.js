import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page d-flex align-items-center my-4">
      <div className="container">
        <div className="login-wrapper mx-auto mt-5 p-4">
          <h2 className="py-3">Login</h2>
          <form>
            <input
              type="email"
              className="form-control my-3"
              placeholder="Email"
            />

            <input
              type="password"
              className="form-control my-3"
              placeholder="Password"
            />

            <button type="submit" className="btn btn-block btn-outline-primary">
              Submit
            </button>

            <div className="register mt-5">
              <p>Don't have an account?</p>
              <Link
                to="/register"
                className="btn btn-info"
                id="register-button"
              >
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
