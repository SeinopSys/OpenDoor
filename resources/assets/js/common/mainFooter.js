import React from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import { translate } from "react-i18next";

const translationNamespaces = [
  "global",
];

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;

    return (
      <Container tag="footer">
        <Row>
          <Col>
            <p>
              {t("global:footer.thanks_to")}:
            </p>
            <ul className="inline-list">
              <a href="https://laravel.com/">Laravel</a>
              <a href="https://getbootstrap.com/">Bootstrap 4</a>
              <a href="https://reactjs.org/">React</a>
              <a href="https://redux.js.org/">Redux</a>
              <a href="https://useiconic.com/open">Open Iconic</a>
              <a href="https://github.com/sumityadavbadli/react-laravel-with-jwt-auth/">react-laravel-with-jwt-auth</a>
              <a href="https://haveibeenpwned.com/Passwords">HaveIBeenPwned</a>
              <a href="https://currencylayer.com/">CurrencyLayer API (Free)</a>
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default translate(translationNamespaces)(Footer);
