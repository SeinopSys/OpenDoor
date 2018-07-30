import React from "react";
import PropTypes from "prop-types";

class PageHeading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-header text-center">
        <h1>{this.props.heading}</h1>
      </div>
    );
  }
}

PageHeading.propTypes = {
  heading: PropTypes.string.isRequired
};
export default PageHeading;
