import React, { Component } from "react";
import { connect } from "react-redux";

import { authenticateUser } from "../actions/userActions";

export default function(ComposedClass, reload, admin = null) {
  class AuthRoute extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.dispatch(authenticateUser()).then(response => {
        let user = this.props.user.userData;
        console.log(user);

        if (!user.isAuth) {
          if (reload) {
            this.props.history.push("/login");
          }
        } else {
          if (admin && !user.isAdmin) {
            this.props.history.push("/user/dashboard");
          } else {
            if (reload === false) {
              this.props.history.push("/user/dashboard");
            }
          }
        }

        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading) {
        return <div className="auth-loader">Loading...</div>;
      }
      return (
        <div>
          <ComposedClass {...this.props} user={this.props.user} />
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  return connect(mapStateToProps)(AuthRoute);
}
