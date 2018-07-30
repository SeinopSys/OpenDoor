import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Main from "../common/main";


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Main>
        <Component {...props} />
      </Main>
    ) : (
      <Redirect to={{
        pathname: "/login",
        state: { from: props.location }
      }} />
    )
  )} />
);


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
