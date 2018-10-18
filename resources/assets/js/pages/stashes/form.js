import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
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
} from "reactstrap";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import * as StashService from "../../services/stash";
import ValidationErrors from "../../common/validationErrors";
import OpenIconic from "../../common/openIconic";
import CountingLabel from "../../common/countingLabel";
import PropTypes from "prop-types";
import * as action from "../../store/actions";
import ConfirmModal from "../../common/modals/confirm";
import { STASH_LABEL_MAX_LENGTH } from "../../common/constants";
import FormPage from "../../common/formPage";
import LoadingAlert from "../../common/loadingAlert";
import BackButton from "../../common/backButon";

const translationNamespaces = [
  "global", "stashes", "validation-attrs"
];

class StashesForm extends FormPage {
  constructor(props) {
    super(props);

    const { params } = this.props.match;

    this.deleteModal = React.createRef();

    this.state = {
      stash: null,
      types: [],
      responseError: {
        isError: false,
        code: "",
        text: ""
      },
      loading: {
        stash: false,
        types: true,
        save: false,
        destroy: false,
      },
      isEditing: !!params.id,
      finished: false,
      actions: {
        destroyed: false,
        stored: false,
        updated: false,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { dispatch, t } = this.props;

    this.props.dispatch(StashService.types())
      .then(({ types }) => {
        this.setLoading({ types: false }, { types });
      })
      .catch(() => {
        this.setLoading({ types: false });
      });

    if (!this.state.isEditing) {
      dispatch(action.updateTitle(t("stashes:form.new_title")));
      this.setState({
        stash: {
          label: "",
          type: "",
        },
      });
    }
    else {
      this.setLoading({ stash: true });
      dispatch(StashService.show(this.props.match.params.id))
        .then(({ stash }) => {
          dispatch(action.updateTitle(t(`stashes:form.edit_title`, { label: stash.label })));
          this.setLoading({ stash: false }, { stash });
        })
        .catch(({ error, statusCode }) => {
          this.setLoading({ stash: false }, {
            responseError: {
              isError: true,
              code: statusCode,
              text: error
            },
          });
        });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { stash } = this.state;
    const { params } = this.props.match;

    this.setLoading({ save: true });
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
      .then(({ stash }) => {
        this.setLoading({ save: false }, {
          finished: true,
          stash,
          actions: {
            stored: !isEditing,
            updated: isEditing,
          },
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
        this.setLoading({ save: false }, {
          validationErrors,
          responseError,
        });
      });
  }

  handleDeleteClick(e) {
    e.preventDefault();

    this.deleteModal.current.getWrappedInstance().open();
  }

  handleDeleteConfirm() {
    this.setLoading({ destroy: true });
    this.props.dispatch(StashService.destroy(this.state.stash.id))
      .then(() => {
        this.setLoading({ destroy: false }, {
          finished: true,
          actions: {
            destroyed: true,
          },
        });
      })
      .catch(({ error, statusCode }) => {
        this.setLoading({ destroy: false }, {
          responseError: {
            isError: true,
            code: statusCode,
            text: error
          }
        });
      });
  }

  render() {
    const { stash, isEditing } = this.state;
    if (this.state.finished) {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      const { actions } = this.state;
      let whereTo = from;
      if (actions.stored)
        whereTo = `/stashes/${stash.id}/balance`;
      return <Redirect to={whereTo} replace />;
    }

    const { t, title } = this.props;
    const { loading, responseError, types } = this.state;
    const isLoading = loading.save || loading.destroy || loading.types || loading.stash;

    return (
      <Row className="justify-content-md-center">
        <Col md="6">
          {loading.stash && <LoadingAlert icon="loop-circular" text={t("stashes:form.loading")} />}
          {responseError.isError &&
          <Alert color="danger">
            <OpenIconic icon="warning" /> {t("overview:stashes.load_error", {
            code: responseError.code,
            text: responseError.text,
          })}
          </Alert>
          }
          {stash &&
          <Fragment>
            <h2>
              <BackButton action={this.goBack} /> {title}
            </h2>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <CountingLabel
                  input="label"
                  label={t("validation:attributes.label")}
                  current={stash.label ? stash.label.length : 0}
                  required={true}
                  min={1}
                  max={STASH_LABEL_MAX_LENGTH}
                />
                <Input
                  type="text"
                  name="label"
                  id="label"
                  required
                  maxLength={STASH_LABEL_MAX_LENGTH}
                  disabled={isLoading || (isEditing && !stash.id)}
                  value={stash.label}
                  onChange={this.handleChange}
                />
                <FormText>
                  {t("stashes:form.text.label", { max: STASH_LABEL_MAX_LENGTH })}
                </FormText>
              </FormGroup>
              {loading.types
                ?
                <LoadingAlert icon="loop-circular" text={t("stashes:form.loading_types")} />
                :
                <FormGroup>
                  <Label for="type">{t("validation:attributes.type")}</Label>
                  <Input
                    type="select"
                    name="type"
                    id="type"
                    required
                    disabled={isLoading || isEditing}
                    value={stash.type}
                    onChange={this.handleChange}
                  >
                    <option value='' className="d-none">{t("global:select_placeholder")}</option>
                    <optgroup label={t("stashes:form.avail_types")}>
                      {types.map(type => {
                        return (
                          <option key={type} value={type}>{t(`stashes:types.${type}`)}</option>
                        );
                      })}
                    </optgroup>
                  </Input>
                  {!loading.types && !types &&
                  <FormFeedback valid={false} className="d-block">
                    <Alert color="info">#TODO</Alert>
                  </FormFeedback>
                  }
                  <FormText className={isEditing ? "d-none" : null}>
                    {t("stashes:form.text.type")}
                  </FormText>
                </FormGroup>
              }

              <Row>
                <Col className="mr-auto">
                  <Button color='success' disabled={isLoading || (isEditing && !stash.id)}>
                    <OpenIconic icon={isEditing ? "check" : "plus"} />
                    {loading.save
                      ? <Fragment>{t("global:" + (isEditing ? "saving" : "creating"))}&hellip;</Fragment>
                      : t("global:" + (isEditing ? "save" : "create"))
                    }
                  </Button>
                </Col>
                <Col className={isEditing ? "text-right" : "d-none"}>
                  <Button
                    type="button"
                    color="danger"
                    disabled={isLoading || (isEditing && !stash.id)}
                    onClick={this.handleDeleteClick}
                  >
                    <OpenIconic icon='trash' />
                    {loading.destroy
                      ? <Fragment>{t("global:deleting")}&hellip;</Fragment>
                      : t("global:delete")
                    }
                  </Button>
                  <ConfirmModal
                    ref={this.deleteModal}
                    title={t("stashes:form.confirm_delete.title", { label: stash.label })}
                    body={t("stashes:form.confirm_delete.body", { label: stash.label })}
                    onConfirm={this.handleDeleteConfirm}
                  />
                </Col>
              </Row>
            </Form>
          </Fragment>
          }
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
