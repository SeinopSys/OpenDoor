import React from "react";
import { Link } from "react-router-dom";
import { NavLink as ReactStrapNavLink } from "reactstrap";
import PropTypes from "prop-types";

class NavLink extends React.Component {
  render() {
    const isActive = this.context.router.route.location.pathname === this.props.to;

    const { href } = this.props;
    const tag = href === '#' ? 'a' : Link;

    return (
      <ReactStrapNavLink tag={tag} active={isActive} {...this.props}>
        {this.props.children}
      </ReactStrapNavLink>
    );
  }
}

NavLink.contextTypes = {
  router: PropTypes.object,
};
NavLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
};

export default NavLink;
