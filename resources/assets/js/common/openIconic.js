import React from "react";
import PropTypes from "prop-types";

const OpenIconic = ({ icon, title }) => {
  return (<span className={`oi oi-${icon} sr-hidden`} title={title} aria-hidden="true" />);
};

OpenIconic.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default OpenIconic;
