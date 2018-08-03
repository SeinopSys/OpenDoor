import React from "react";
import { Button } from "reactstrap";
import OpenIconic from "./openIconic";
import { translate } from "react-i18next";

const BackButton = ({ t, action }) => (
  <Button color="primary" onClick={action} title={t("global:back")}>
    <OpenIconic icon="arrow-thick-left" alone />
  </Button>
);

export default translate()(BackButton);
