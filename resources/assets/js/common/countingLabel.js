import React from "react";
import {
  Label,
  Col,
  Badge,
} from 'reactstrap';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';

class CountingLabel extends React.Component {
  render() {
    const { label, current, min, max, input, required, ...rest } = this.props;


    const [ hasMax, hasMin ] = [!!max, !!min];
    let hideCounter = false;
    let color = 'success';
    let info;
    if (hasMin){
      if (current >= min || !required)
        hideCounter = !hasMax;
      else {
        info = current - min;
        color = null;
      }
    }
    if (hasMax && !info) {
      if (current > max)
        color = 'danger';
      info = `${current}/${max}`;
    }
    return (
      <Label for={input} className="row" {...rest}>
        <Col className="mr-auto">{label}</Col>
        <Col className={'text-right'+(hideCounter ? ' d-none' : '')}>
          <Badge color={color}>{info}</Badge>
        </Col>
      </Label>
    );
  }
}

CountingLabel.propTypes = {
  label: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  max: requiredIf(PropTypes.number, props => typeof props.min !== 'number'),
  min: requiredIf(PropTypes.number, props => typeof props.max !== 'number'),
  required: PropTypes.bool,
};

export default CountingLabel;
