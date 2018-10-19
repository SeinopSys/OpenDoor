import React from "react";
import PropTypes from "prop-types";

const OpenIconic = ({ icon, title, alone }) => {
  return (<span className={`oi oi-${icon+(alone?' oi-alone':'')} sr-hidden`} title={title} aria-hidden="true" />);
};

OpenIconic.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string,
  alone: PropTypes.bool,
};

export default OpenIconic;
