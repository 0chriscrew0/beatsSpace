import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  state = {
    isAtTop: true,
    isOpen: false
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 0) {
      this.setState({ isAtTop: false });
    } else {
      this.setState({ isAtTop: true });
    }
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <nav
          className={`navbar fixed-top navbar-expand-lg navbar-dark  ${
            window.location.pathname === "/"
              ? `${
                  this.state.isOpen ? "bg-dark navbar-shadow" : "transparent"
                } ${
                  this.state.isAtTop ? "transparent" : "bg-dark navbar-shadow"
                } `
              : "bg-dark navbar-shadow"
          }`}
        >
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <h4
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={this.state.isOpen ? this.handleClick : null}
              >
                BeatsStore
              </h4>
            </NavLink>

            <button
              onClick={this.handleClick}
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li
                  className="nav-item"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="nav-item"
                >
                  <NavLink className="nav-link" to="/register">
                    Sign up
                  </NavLink>
                </li>
                <li
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="nav-item"
                >
                  <NavLink className="nav-link" to="/cart">
                    <i className="fas fa-shopping-cart pr-2" /> Cart
                  </NavLink>
                </li>
                <li
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="nav-item"
                >
                  <NavLink className="nav-link" to="/user/dashboard">
                    Account
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
