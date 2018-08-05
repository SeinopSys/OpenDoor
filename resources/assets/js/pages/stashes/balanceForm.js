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
  Badge,
  ListGroup,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as StashService from "../../services/stash";
import * as BalanceService from "../../services/balance";
import ValidationErrors from "../../common/validationErrors";
import OpenIconic from "../../common/openIconic";
import { translate } from "react-i18next";
import * as action from "../../store/actions";
import FormPage from "../../common/formPage";
import LoadingAlert from "../../common/loadingAlert";
import BackButton from "../../common/backButon";
import ConfirmModal from "../../common/modals/confirm";

const translationNamespaces = [
  "global", "stashes", "validation-attrs"
];


class StashBalanceForm extends FormPage {
  constructor(props) {
    super(props);

    const { params } = this.props.match;

    this.state = {
      stash: null,
      currencies: [],
      balance: {
        amount: 0,
        currency: "",
      },
      responseError: {
        isError: false,
        code: "",
        text: ""
      },
      loading: {
        stash: false,
        currencies: true,
        save: false,
        destroyBalance: false,
      },
      destroyingBalanceId: null,
      finished: false,
      actions: {
        newBalance: false,
        updated: false,
      },
      validationErrors: new ValidationErrors,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddBalance = this.handleAddBalance.bind(this);
  }

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      balance: {
        ...this.state.balance,
        [key]: value,
      }
    });
  }

  handleAddBalance(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { stash, balance } = this.state;

    this.setLoading({ newBalance: true });
    dispatch(StashService.addBalance(balance, stash.id))
      .then(({ stash }) => {
        this.setLoading({ newBalance: false }, { stash });
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
        this.setLoading({ newBalance: false }, {
          validationErrors,
          responseError,
        });
      });
  }

  handleDestroyBalance(balanceId) {
    const { dispatch } = this.props;

    this.setLoading({ destroyBalance: true }, {
      destroyingBalanceId: balanceId,
    });
    dispatch(BalanceService.destroy(balanceId))
      .then(({ stash }) => {
        this.setLoading({ destroyBalance: false }, { stash });
      })
      .catch(({ error, statusCode }) => {
        this.setLoading({ destroyBalance: false }, {
          responseError: {
            isError: true,
            code: statusCode,
            text: error
          },
        });
      });
  }

  componentDidMount() {
    const { dispatch, t } = this.props;
    this.setLoading({ stash: true, currencies: true });

    this.props.dispatch(BalanceService.currencies())
      .then(({ currencies }) => {
        this.setLoading({ currencies: false }, { currencies });
      })
      .catch(() => {
        this.setLoading({ currencies: false });
      });

    this.props.dispatch(StashService.show(this.props.match.params.id))
      .then(({ stash }) => {
        this.setLoading({ stash: false }, { stash });
        const { label } = stash;
        dispatch(action.updateTitle(t(`stashes:balance_form.title`, { label })));
      })
      .catch(({ error, statusCode }) => {
        this.setLoading({ stash: false }, {
          responseError: {
            isError: true,
            code: statusCode,
            text: error
          }
        });
      });
  }

  render() {
    const { stash } = this.state;
    if (this.state.finished && !this.state.actions.updated) {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      return <Redirect to={from} replace />;
    }

    const { t, title } = this.props;
    const { loading, responseError, currencies, balance, validationErrors, destroyingBalanceId } = this.state;
    const isLoading = loading.currencies || loading.stash;
    let balances;
    if (stash)
      balances = stash.balances;

    return (
      <Row className="justify-content-md-center">
        <Col md="6">
          {responseError.isError &&
          <Alert color="danger">
            <OpenIconic icon="warning" /> {t("overview:stashes.load_error", {
            code: responseError.code,
            text: responseError.text,
          })}
          </Alert>
          }
          {loading.stash && <LoadingAlert icon="loop-circular" text={t("stashes:form.loading")} />}
          {loading.currencies && <LoadingAlert icon="loop-circular" text={t("stashes:form.loading")} />}
          {!isLoading &&
          <h2>
            <BackButton action={this.goBack} /> {title}
          </h2>
          }
          {balances &&
          <ListGroup className="mb-3">
            {balances.map(b => {
              const ref = React.createRef();
              const currency = t(`currencies:${b.currency}`);
              return (
                <Form
                  key={b.id}
                  onSubmit={(e) => { e.preventDefault(); ref.current.getWrappedInstance().open(); }}
                  inline
                  className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{currency}</strong>
                    <Badge pill color="dark" className="ml-2">{b.readable}</Badge>
                  </div>
                  <Button color='link' className="btn-sm text-danger" disabled={loading.destroyBalance}>
                    <OpenIconic icon="trash" />
                    {loading.destroyBalance && destroyingBalanceId === b.id
                      ? <Fragment>{t("global:deleting")}&hellip;</Fragment>
                      : t("global:delete")
                    }
                  </Button>
                  <ConfirmModal
                    ref={ref}
                    title={t('stashes:balance_form.delete_modal.title', { currency })}
                    body={t('stashes:balance_form.delete_modal.body', { currency, amount: b.readable })}
                    onConfirm={() => this.handleDestroyBalance(b.id)}
                  />
                </Form>
              );
            })}
          </ListGroup>
          }

          {!isLoading &&
          <Form onSubmit={this.handleAddBalance}>
            <h3>{t("stashes:balance_form.add_title")}</h3>
            <FormGroup>
              <Label for="value">{t("validation:attributes.amount")}</Label>
              <Input
                type="number"
                name="amount"
                id="amount"
                min="0"
                step="0.01"
                disabled={isLoading || !currencies}
                value={balance.amount}
                onChange={this.handleChange}
                required
              />
              {validationErrors.has("amount") &&
              <FormFeedback valid={false} className="d-block">
                {validationErrors.get("amount").map((el, i) => {
                  return (
                    <p key={i}>{el}</p>
                  );
                })}
              </FormFeedback>
              }
            </FormGroup>
            <FormGroup>
              <Label for="currency">{t("validation:attributes.currency")}</Label>
              <Input
                type="select"
                name="currency"
                id="currency"
                disabled={isLoading || !currencies}
                value={balance.currency}
                onChange={this.handleChange}
                required
              >
                <option value='' className="d-none">{t("global:select_placeholder")}</option>
                <optgroup label={t("stashes:balance_form.avail_currencies")}>
                  {currencies.map((currency, i) => (
                    <option key={i} value={currency}>{t(`currencies:${currency}`)}</option>
                  ))}
                </optgroup>
              </Input>
              {validationErrors.has("currency") &&
              <FormFeedback valid={false} className="d-block">
                {validationErrors.get("currency").map((el, i) => {
                  return (
                    <p key={i}>{el}</p>
                  );
                })}
              </FormFeedback>
              }
            </FormGroup>

            <Button color='success' disabled={loading.newBalance}>
              <OpenIconic icon="plus" />
              {loading.newBalance
                ? <Fragment>{t("global:adding")}&hellip;</Fragment>
                : t("global:add")
              }
            </Button>
          </Form>
          }
        </Col>
      </Row>
    );
  }
}

StashBalanceForm.propTypes = {
  stash: PropTypes.object,
};

const mapStateToProps = state => (
  { title: state.nav.title }
);

export default connect(mapStateToProps)(translate(translationNamespaces)(StashBalanceForm));
