import React, { Fragment } from "react";
import { DropdownItem } from "reactstrap";
import { translate } from 'react-i18next';
import * as AuthService from "../services/auth";
import { connect } from "react-redux";
import OpenIconic from "./openIconic";
import { compose } from "recompose";

const translationNamespaces = [
  "global",
];

class NavExtendSessionLink extends React.Component {
  constructor(props){
    super(props);

    this.state = { extending: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.dispatch(AuthService.extendSession());
  }

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <DropdownItem onClick={this.handleClick}>
          <OpenIconic icon="timer" /> {t("global:nav.extend")}
        </DropdownItem>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const enhance = compose(
  connect(mapStateToProps),
  translate(translationNamespaces, { withRef: true }),
);
export default enhance(NavExtendSessionLink);
