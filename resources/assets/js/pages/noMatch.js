import React from "react";
import { connect } from "react-redux";
import * as action from "../store/actions";

class NoMatch extends React.Component {
  componentDidMount() {
    this.props.dispatch(action.updateTitle('404'));
  }

  componentWillUnmount(){
    this.props.dispatch(action.updateTitle());
  }

  render() {
    return <h1>404</h1>;
  }
}

export default connect()(NoMatch);
