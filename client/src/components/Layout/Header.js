import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/userActions";

class Header extends Component {
  state = {
    isAtTop: true,
    isOpen: false,
    links: [
      {
        name: "Beats",
        url: "/beats",
        public: true
      },
      {
        name: "Cart",
        url: "/user/cart",
        public: false
      },
      {
        name: "Account",
        url: "/user/dashboard",
        public: false
      },
      {
        name: "Login",
        url: "/login",
        public: true
      },
      {
        name: "Logout",
        public: false
      }
    ]
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

  logout = () => {
    this.props.dispatch(logoutUser()).then(response => {
      console.log(response);
      if (response.payload.success) {
        this.props.history.push("/login");
      }
    });
  };

  cartLink = (item, index) => {
    const user = this.props.user.userData;

    return (
      <li
        className="nav-item"
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
        key={index}
      >
        <NavLink className="nav-link" to={item.url}>
          <span className="cart-amount">
            {user.cart ? user.cart.length : 0}{" "}
          </span>
          {item.name}
        </NavLink>
      </li>
    );
  };

  defaultLink = (item, index) => (
    <li
      className="nav-item"
      data-toggle="collapse"
      data-target=".navbar-collapse.show"
      key={index}
    >
      {item.name === "Logout" ? (
        <div className="nav-link" onClick={() => this.logout()}>
          {item.name}
        </div>
      ) : (
        <NavLink className="nav-link" to={item.url}>
          {item.name}
        </NavLink>
      )}
    </li>
  );

  showLinks = () => {
    let links = [];

    if (this.props.user.userData) {
      this.state.links.forEach(item => {
        if (!this.props.user.userData.isAuth) {
          if (item.public) {
            links.push(item);
          }
        } else {
          if (item.name !== "Login") {
            links.push(item);
          }
        }
      });
    }

    return links.map((item, index) => {
      if (item.name !== "Cart") {
        return this.defaultLink(item, index);
      } else {
        return this.cartLink(item, index);
      }
    });
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
            <NavLink className="navbar-brand" to="/" exact={true}>
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
              <ul className="navbar-nav ml-auto">{this.showLinks()}</ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(withRouter(Header));
