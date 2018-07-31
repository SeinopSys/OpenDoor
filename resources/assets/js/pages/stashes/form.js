import React, { Fragment } from "react";
import {
  Row,
  Col,
  Alert,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Label,
  Input,
  Button,
  Badge,
} from "reactstrap";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import * as StashService from "../../services/stash";
import ValidationErrors from "../../common/validationErrors";
import OpenIconic from "../../common/openIconic";
import CountingLabel from "../../common/countingLabel";
import PropTypes from "prop-types";
import * as action from "../../store/actions";

const translationNamespaces = [
  "global", "stashes", "validation-attrs"
];

class StashesForm extends React.Component {
  constructor(props) {
    super(props);

    const { params } = this.props.match;

    this.labelMaxLength = 64;
    this.state = {
      stash: {
        label: '',
        type: '',
      },
      types: [],
      responseError: {
        isError: false,
        code: "",
        text: ""
      },
      isLoading: false,
      isEditing: !!params.id,
      redirectBack: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { isEditing } = this.state;
    const { label } = this.state.stash;
    const endpoint = isEditing ? "edit" : "new";
    this.props.dispatch(action.updateTitle(this.props.t(`stashes:form.${endpoint}_title`, { label })));

    this.props.dispatch(StashService.types())
      .then(({ types }) => {
        this.setState({
          isLoadingTypes: false,
          types,
        });
      })
      .catch(() => {
        this.setState({
          isLoadingTypes: false
        });
      });

    if (this.state.isEditing)
      this.props.dispatch(StashService.show(this.props.match.id))
        .then(() => {
          this.setState({
            isLoading: false,
          });
        })
        .catch(({ error, statusCode }) => {
          this.setState({
            responseError: {
              isError: true,
              code: statusCode,
              text: error
            },
            isLoading: false
          });
        });
  }

  componentWillUnmount(){
    this.props.dispatch(action.updateTitle());
  }

  handleSubmit(e) {
    e.preventDefault();

    const { stash } = this.state;
    const { params } = this.props.match;

    this.setState({
      isLoading: true
    });
    this.submit(stash, params.id);
  }

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      stash: {
        ...this.state.stash,
        [key]: value,
      }
    });
  }

  submit(stash, id = null) {
    const { isEditing } = this.state;

    this.props.dispatch(StashService[isEditing ? "update" : "store"](stash, id))
      .then(() => {
        this.setState({
          isLoading: false,
          redirectBack: true,
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
          isLoading: false,
          isLoadingTypes: true,
        });
      });
  }

  render() {
    const { t, title } = this.props;
    const { isLoading, isLoadingTypes, isEditing, responseError, stash, types } = this.state;

    // TODO CountingLabel
    return (
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>{ title }</h2>
          {responseError.isError &&
          <Alert color="danger">
            <OpenIconic icon="warning" /> {t("overview:stashes.load_error", {
            code: responseError.code,
            text: responseError.text,
          })}
          </Alert>
          }
          {isLoading &&
          <Alert color="info">
            <OpenIconic icon="loop-circular" /> {t("stashes:form.loading")}
          </Alert>
          }

          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <CountingLabel
                input="label"
                label={t("validation-attrs:label")}
                current={stash.label ? stash.label.length : 0}
                max={this.labelMaxLength}
              />
              <Input
                type="text"
                name="label"
                id="label"
                required
                maxLength={this.labelMaxLength}
                disabled={isEditing && isLoading}
                value={stash.label}
                onChange={this.handleChange}
              />
              <FormText>
                {t("stashes:form.text.label", { max: this.labelMaxLength })}
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="type">{t("validation-attrs:type")}</Label>
              <Input
                type="select"
                name="type"
                id="type"
                required
                disabled={isLoadingTypes || (isEditing && isLoading)}
                value={stash.type}
                onChange={this.handleChange}
              >
                <option value='' className="d-none">{t('global:select_placeholder')}</option>
                <optgroup label={t('stashes:form.avail_types')}>
                {types.map(type => {
                  return (
                    <option key={type} value={type}>{t(`stashes:types.${type}`)}</option>
                  );
                })}
                </optgroup>
              </Input>
              {!isLoadingTypes && !types &&
                <FormFeedback valid={false} className="d-block">
                </FormFeedback>
              }
              <FormText>
                {t("stashes:form.text.type")}
              </FormText>
            </FormGroup>

            <Button color='success' disabled={this.state.isLoading}>
              <OpenIconic icon={isEditing?'check':'plus'} />
              {this.state.isLoading
                ? <Fragment>{t("global:"+(isEditing?'saving':'creating'))}&hellip;</Fragment>
                : t("global:"+(isEditing?'save':'create'))
              }
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

StashesForm.propTypes = {
  stash: PropTypes.object,
};

const mapStateToProps = state => (
  { title: state.nav.title }
);

export default connect(mapStateToProps)(translate(translationNamespaces)(StashesForm));
