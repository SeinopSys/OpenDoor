import React from 'react';
import PropTypes from 'prop-types';
import { sessionCountdown } from '../utils';

class RelativeTime extends React.Component {
  constructor(props) {
    super(props);

    this.state = { flipper: false };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ flipper: !this.state.flipper }), this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { translation, date } = this.props;
    return <span>{translation(sessionCountdown(date))}</span>;
  }
}

RelativeTime.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  interval: PropTypes.number.isRequired,
  translation: PropTypes.func.isRequired,
};

export default RelativeTime;
