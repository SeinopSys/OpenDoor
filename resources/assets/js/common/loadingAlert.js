import React from "react";
import { Alert } from 'reactstrap';
import OpenIconic from './openIconic';

const loadingAlert = ({ icon, text }) => (
  <Alert color="primary" fade={false}>
    <OpenIconic icon={icon} /> {text}&hellip;
  </Alert>
);

export default loadingAlert;
