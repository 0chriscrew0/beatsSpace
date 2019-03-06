import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-page d-flex align-items-center my-4">
      <div className="container">
        <div className="register-wrapper mx-auto mt-5 p-4">
          <h2 className="text-secondary">Register</h2>
          <form>
            <input
              type="email"
              className="form-control my-3"
              id="email"
              placeholder="Enter email"
            />

            <input
              type="text"
              className="form-control my-3"
              id="username"
              placeholder="Create a username"
            />

            <input
              type="password"
              className="form-control my-3"
              id="password"
              placeholder="Create a password"
            />

            <input
              type="password"
              className="form-control my-3"
              id="password2"
              placeholder="Retype Password"
            />

            <button type="submit" className="btn btn-block btn-outline-primary">
              Submit
            </button>

            <div className="register mt-5">
              <p>Already have an account?</p>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
