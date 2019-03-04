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
          className={`navbar fixed-top navbar-expand-lg navbar-dark ${
            this.state.isAtTop ? "bg-primary" : "bg-dark"
          } ${this.state.isOpen ? "bg-dark" : "bg-primary"}`}
        >
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              Beats Store
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
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Sign up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <i className="fas fa-shopping-cart pr-2" /> Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Checkout
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
