import React from "react";
import {
  Label,
  Col,
  Badge,
} from 'reactstrap';
import PropTypes from 'prop-types';

class CountingLabel extends React.Component {
  render() {
    const { label, current, max, input, ...rest } = this.props;
    return (
      <Label for={input} className="row" {...rest}>
        <Col className="mr-auto">{label}</Col>
        <Col className="text-right">
          <Badge color="info">{current}/{max}</Badge>
        </Col>
      </Label>
    );
  }
}

CountingLabel.propTypes = {
  label: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default CountingLabel;
