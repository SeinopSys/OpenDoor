import React from "react";
import {
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import Stashes from "./stashes";

const translationNamespaces = [
  "global",
];

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
      <Row>
        <Col>
          <h1>{t("global:nav.overview")}</h1>
          <Stashes />
        </Col>
      </Row>
    );
  }
}

export default connect()(translate(translationNamespaces)(Overview));
