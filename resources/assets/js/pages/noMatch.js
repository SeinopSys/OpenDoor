import React from 'react';
import { connect } from "react-redux";

const NoMatch = () => <h1>404</h1>;

export default connect()(NoMatch);
