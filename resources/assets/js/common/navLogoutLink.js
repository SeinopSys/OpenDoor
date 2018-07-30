import React from "react";
import NavLink from "./navLink";
import ConfirmModal from "./modals/confirm";
import { translate } from 'react-i18next';
import * as actions from "../store/actions";
import { connect } from "react-redux";

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

  handleClick(){
    this.modal.current.getWrappedInstance().open();
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <NavLink href="#" onClick={this.handleClick}>
          {t("global:nav.log_out")}
        </NavLink>
        <ConfirmModal ref={this.modal} body={t("global:nav.log_out_confirm")} onConfirm={this.handleConfirm} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(translate(translationNamespaces, { withRef: true })(NavLogoutLink));
