import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ data }) => {
  return data.siteInfo ? (
    <section className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-form">
            <h4 className="display-5 mb-3">BeatsStore</h4>
            <input
              className="form-control mb-3 footer-form__input"
              type="text"
              placeholder="Enter Your Email"
            />
            <input
              className="btn btn-sm btn-outline-light"
              type="button"
              value="Subscribe"
            />
          </div>
          <div className="col-md-4 footer-info">
            <div className="footer-contact">
              <p>Phone: {data.siteInfo.phone}</p>
              <p>Email: {data.siteInfo.email}</p>
              <p>Address: {data.siteInfo.address}</p>
            </div>
            <div className="footer-social">
              <Link to="/" className="fab fa-facebook-square" />
              <Link to="/" className="fab fa-instagram" />
              <Link to="/" className="fab fa-twitter-square" />
              <Link to="/" className="fab fa-snapchat-square" />
              <Link to="/" className="fab fa-youtube" />
              <Link to="/" className="fab fa-soundcloud" />
            </div>
          </div>
          <div className="col-md-4 footer-links">
            <h4 className="display-5 mb-3">Additional Links</h4>
            <Link to="/">About</Link>
            <Link to="/">Services</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Contact</Link>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default Footer;
