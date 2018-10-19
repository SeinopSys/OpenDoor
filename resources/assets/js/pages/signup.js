import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Alert,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as AuthService from "../services/auth";
import PageHeading from "../common/pageHeading";
import { translate } from "react-i18next";
import OpenIconic from "../common/openIconic";
import ValidationErrors from "../common/validationErrors";
import * as action from "../store/actions";
import CountingLabel from "../common/countingLabel";
import {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../common/constants";
import { compose } from "recompose";
const translationNamespaces = [
  "login", "validation-attrs",
];

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      responseError: {
        isError: false,
        code: "",
        text: "",
      },
      isLoading: false,
      validationErrors: new ValidationErrors,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { credentials } = this.state;

    this.setState({
      isLoading: true
    });
    this.submit(credentials);
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

  submit(credentials) {
    this.props.dispatch(AuthService.register(credentials))
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
    this.props.dispatch(action.updateTitle(this.props.t("signup:sign_up")));
  }

  componentWillUnmount(){
    this.props.dispatch(action.updateTitle());
  }

  render() {
    const { t, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to='/' replace />;
    }

    const { credentials, responseError, validationErrors } = this.state;
    const passwordsDiffer = credentials.password !== credentials.password_confirmation;

    const encourage = [
      t("signup:log_in_pls.0"),
      t("signup:log_in_pls.1"),
    ];

    return (
      <Row className="justify-content-md-center">
        <Col md="4">
          <PageHeading heading={t("signup:sign_up")} />

          <p className="text-center">{encourage[0]}<Link to="/login">{t("signup:log_in_link")}</Link>{encourage[1]}</p>

          {responseError.isError &&
          <Alert color="danger">
            {responseError.text}
          </Alert>
          }

          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <CountingLabel
                for="name"
                current={credentials.name.length}
                min={USERNAME_MIN_LENGTH}
                max={USERNAME_MAX_LENGTH}
                label={t("validation:attributes.name")}
                required={true}
              />
              <Input
                type="text"
                name="name"
                id="name"
                maxLength={USERNAME_MAX_LENGTH}
                pattern={`^.{${USERNAME_MIN_LENGTH},}`}
                invalid={validationErrors.has('name')}
                value={credentials.name}
                onChange={this.handleChange}
                required
                autoFocus
              />
              {validationErrors.has('name') &&
              <FormFeedback valid={false}>
                {validationErrors.get('name').map((el,i) => {
                  return (
                    <p key={i}>{el}</p>
                  );
                })}
              </FormFeedback>
              }
              <FormText color="muted">
                {t("signup:specs.name", { min: USERNAME_MIN_LENGTH, max: USERNAME_MAX_LENGTH })}
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="email">{t("validation:attributes.email")}</Label>
              <Input
                type="email"
                name="email"
                id="email"
                invalid={validationErrors.has('email')}
                value={credentials.email}
                onChange={this.handleChange}
                required
              />
              {validationErrors.has('email') &&
              <FormFeedback valid={false}>
                {validationErrors.get('email').map((el,i) => {
                  return (
                    <p key={i}>{el}</p>
                  );
                })}
              </FormFeedback>
              }
              <FormText color="muted">
                {t("signup:specs.email")}
              </FormText>
            </FormGroup>
            <FormGroup>
              <CountingLabel
                for="password"
                current={credentials.password.length}
                min={PASSWORD_MIN_LENGTH}
                max={PASSWORD_MAX_LENGTH}
                label={t("validation:attributes.password")}
                required={true}
              />
              <Input
                type="password"
                name="password"
                id="password"
                pattern={`^.{${PASSWORD_MIN_LENGTH},}`}
                invalid={validationErrors.has('password')}
                value={credentials.password}
                onChange={this.handleChange}
                required
                maxLength={PASSWORD_MAX_LENGTH}
              />
              {validationErrors.has('password') &&
              <FormFeedback valid={false}>
                {validationErrors.get('password').map((el,i) => {
                  return (
                    <p key={i}>{el}</p>
                  );
                })}
              </FormFeedback>
              }
              <FormText color="muted">
                {t("signup:specs.password", { min: PASSWORD_MIN_LENGTH })}
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="password_confirmation">{t("validation:attributes.password_confirmation")}</Label>
              <Input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                invalid={passwordsDiffer}
                value={credentials.password_confirmation}
                onChange={this.handleChange}
                required
                maxLength={PASSWORD_MAX_LENGTH}
              />
              {passwordsDiffer &&
              <FormFeedback valid={false} className="d-block">
                {t("signup:error.password_mismatch")}
              </FormFeedback>
              }
            </FormGroup>

            <Button color='primary' disabled={this.state.isLoading}>
              <OpenIconic icon="person" />
              {this.state.isLoading
                ? <Fragment>{t("signup:signing_up")}&hellip;</Fragment>
                : t("signup:sign_up")
              }
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

Signup.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const enhancer = compose(
  connect(mapStateToProps),
  translate(translationNamespaces),
);
export default enhancer(Signup);
