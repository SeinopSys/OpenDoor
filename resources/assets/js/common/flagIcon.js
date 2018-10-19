import React from "react";
import PropTypes from "prop-types";

const countryMap = country => ({ en: 'us' })[country] || country;

const FlagIcon = ({ country, title, squared }) => {
  return (<span className={`flag-icon flag-icon-${countryMap(country)+(squared?' flag-icon-squared':'')} sr-hidden`} title={title} aria-hidden="true" />);
};

FlagIcon.propTypes = {
  country: PropTypes.string.isRequired,
  title: PropTypes.string,
  squared: PropTypes.bool,
};

export default FlagIcon;
