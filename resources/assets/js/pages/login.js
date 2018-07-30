import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import PropTypes from "prop-types";
import * as AuthService from "../services/auth";
import PageHeading from "../common/pageHeading";
import { translate } from "react-i18next";
import OpenIconic from "../common/openIconic";
import ValidationErrors from "../common/validationErrors";

const translationNamespaces = [
  "login", "validation-attrs",
];

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email: "",
        password: "",
      },
      responseError: {
        isError: false,
        code: "",
        text: "",
      },
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      credentials: {
        ...this.state.credentials,
        [key]: value,
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { credentials } = this.state;
    this.setState({
      isLoading: true
    });
    this.submit(credentials);
  }

  submit(credentials) {
    this.props.dispatch(AuthService.login(credentials))
      .then(() => {
        this.setState({
          isLoading: false,
        });
      })
      .catch(({ error, validationErrors, statusCode }) => {
        let responseError = {};
        if (!validationErrors) {
          responseError = {
            isError: true,
            code: statusCode,
            text: error
          };
          validationErrors = new ValidationErrors;
        }
        this.setState({
          validationErrors,
          responseError,
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  render() {
    const { t, isAuthenticated } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (isAuthenticated) {
      return <Redirect to={from} replace />;
    }

    const { credentials } = this.state;

    const encourage = [
      t("login:reg_pls.0"),
      t("login:reg_pls.1"),
    ];

    return (
      <Row className="justify-content-md-center">
        <Col md="4">
          <PageHeading heading={t("login:log_in")} />

          <p>{encourage[0]}<Link to="/register">{t("login:reg_link")}</Link>{encourage[1]}</p>

          {this.state.responseError.isError &&
          <Alert color="danger">
            {this.state.responseError.text}
          </Alert>
          }

          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="email">{t("validation-attrs:email")}</Label>
              <Input
                type="email"
                name="email"
                id="email"
                required
                value={credentials.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">{t("validation-attrs:password")}</Label>
              <Input
                type="password"
                name="password"
                id="password"
                required
                value={credentials.password}
                onChange={this.handleChange}
              />
            </FormGroup>

            <Button color='primary' disabled={this.state.isLoading}>
              <OpenIconic icon="key" />
              {this.state.isLoading
                ? <Fragment>{t("login:authenticating")}&hellip;</Fragment>
                : t("login:log_in")
              }
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(translate(translationNamespaces)(Login));
