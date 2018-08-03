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
        destroy: false,
      },
      isEditing: !!params.id,
      finished: false,
      actions: {
        updated: false,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
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

  handleExistingChange(e, balanceId) {
    let targetBalance;
    const { balances } = this.state.stash;
    const newBalances = [];
    const { name, value } = e.target;
    balances.forEach(b => {
      if (b.id !== balanceId)
        newBalances.push(b);
      else newBalances.push({
        ...b,
        [name]: value,
      });
    });
    this.setState({
      ...this.state,
      stash: {
        ...this.state.stash,
        balances: newBalances,
      },
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
    const { loading, isEditing, responseError, currencies, balance } = this.state;
    const isLoading = loading.save || loading.currencies || loading.stash;
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
          {!isLoading && balances.length > 0 &&
          <Form onSubmit={this.handleSubmit}>
            {balances.map(b => {
              const amountId = "amount-" + b.id;
              return (
                <Fragment key={b.id}>
                  <h3>{t(`currencies:${b.currency}`)}</h3>
                  <Input type="hidden" name="id[]" value={b.id} />
                  <FormGroup>
                    <Label for={amountId}>{t("validation:attributes.currency")}</Label>
                    <Input
                      type="number"
                      name="amount[]"
                      id={amountId}
                      min="0"
                      step="0.01"
                      value={b.amount}
                      onChange={e => this.handleExistingChange(e, b.id)}
                    />
                  </FormGroup>
                </Fragment>
              );
            })}

            <Button color='success' disabled={isLoading}>
              <OpenIconic icon={isEditing ? "check" : "plus"} />
              {loading.save
                ? <Fragment>{t("global:saving")}&hellip;</Fragment>
                : t("global:save")
              }
            </Button>
          </Form>
          }

          <Form onSubmit={this.handleAddBalance}>
            <h3>{t("stashes:balance_form.add_title")}</h3>
            <FormGroup>
              <Label for="amount">{t("validation:attributes.amount")}</Label>
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
            </FormGroup>
            <FormGroup>
              <Label>{t("validation:attributes.currency")}</Label>
              <Input
                type="select"
                name="currency"
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
            </FormGroup>

            <Button color='success' disabled={isLoading}>
              <OpenIconic icon="plus" />
              {loading.save
                ? <Fragment>{t("global:adding")}&hellip;</Fragment>
                : t("global:add")
              }
            </Button>
          </Form>
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
