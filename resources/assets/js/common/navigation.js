import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import NavLink from "./navLink";
import NavLogoutLink from "./navLogoutLink";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import OpenIconic from "./openIconic";
import Gravatar from "react-gravatar";

const translationNamespaces = [
  "login", "register", "global",
];

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.state = {
      isOpen: false,
      isDropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  dropdownToggle() {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  }

  render() {
    const { t, isAuthenticated, user } = this.props;

    return (
      <Navbar expand="sm" light>
        <NavbarBrand tag={Link} to='/'>
          <img src="/img/logo.svg" className="d-inline-block align-top brand-logo" alt="OpenDoor logo" />
          <span className="d-none d-sm-inline-block brand-name">OpenDoor</span>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        {isAuthenticated
          ?
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className="mr-auto">
              <NavItem>
                <NavLink to="/">
                  <OpenIconic icon="dashboard" />
                  {t("global:nav.overview")}
                </NavLink>
              </NavItem>
            </Nav>
            <Nav navbar>
              <Dropdown toggle={this.dropdownToggle} isOpen={this.state.isDropdownOpen} inNavbar>
                <DropdownToggle nav caret>
                  <Gravatar email={user.email} size={24} /> {user.name}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem tag={NavLogoutLink} />
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
          :
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink to="/login">
                  <OpenIconic icon="account-login" />
                  {t("login:log_in")}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/register">
                  <OpenIconic icon="person" />
                  {t("register:sign_up")}
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        }
      </Navbar>
    );
  }
}

Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(translate(translationNamespaces)(Page));
