import React, { Component } from "react";
import { connect } from "react-redux";

import { authenticateUser } from "../actions/userActions";
import Spinner from "../components/Utils/Spinner";

export default function(ComposedClass, reload, admin = null) {
  class AuthRoute extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.dispatch(authenticateUser()).then(response => {
        let user = this.props.user.userData;

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
        return <Spinner />;
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
