import React, { Fragment } from "react";
import { DropdownItem } from "reactstrap";
import ConfirmModal from "./modals/confirm";
import { translate } from 'react-i18next';
import * as actions from "../store/actions";
import { connect } from "react-redux";
import OpenIconic from "./openIconic";
import { compose } from "recompose";

const translationNamespaces = [
  "global",
];

class NavLogoutLink extends React.Component {
  constructor(props){
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.modal = React.createRef();
  }

  handleConfirm(){
    this.props.dispatch(actions.authLogout());
  }

  handleClick(e){
    e.preventDefault();
    this.modal.current.getWrappedInstance().open();
  }

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <DropdownItem onClick={this.handleClick}>
          <OpenIconic icon="account-logout" /> {t("global:nav.log_out")}
        </DropdownItem>
        <ConfirmModal ref={this.modal} body={t("global:nav.log_out_confirm")} onConfirm={this.handleConfirm} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const enhance = compose(
  connect(mapStateToProps),
  translate(translationNamespaces, { withRef: true }),
);
export default enhance(NavLogoutLink);
