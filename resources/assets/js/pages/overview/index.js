import React from "react";
import {
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import Stashes from "./_stashes";
import * as action from "../../store/actions";

const translationNamespaces = [
  "global",
];

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(action.updateTitle(this.props.t("global:nav.overview")));
  }

  componentWillUnmount() {
    this.props.dispatch(action.updateTitle());
  }

  render() {
    const { title } = this.props;
    return (
      <Row>
        <Col>
          <h1>{title}</h1>
          <Stashes />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => (
  {
    title: state.nav.title,
  }
);

export default connect(mapStateToProps)(translate(translationNamespaces)(Overview));
