import { connect } from "react-redux";
import React from "react";
import { translate } from "react-i18next";

const translationNamespaces = [
  "global",
];

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
      <h1>{t("global:nav.overview")}</h1>
    );
  }
}

export default connect()(translate(translationNamespaces)(Page));
