import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardDeck,
  CardBody,
  CardTitle,
  Alert,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import * as StashService from "../../services/stash";
import ValidationErrors from "../../common/validationErrors";
import OpenIconic from "../../common/openIconic";

const translationNamespaces = [
  "global", "overview"
];

class OverviewStashes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stashes: [],
      responseError: {
        isError: false,
        code: "",
        text: ""
      },
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.dispatch(StashService.list())
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

  render() {
    const { t } = this.props;
    const { isLoading, stashes, responseError } = this.state;

    return (
      <Row>
        <Col>
          <h2>{t("overview:stashes.title")}</h2>
          {responseError.isError &&
          <Alert color="danger">
            <OpenIconic icon="warning" /> {t("overview:stashes.load_error", {
            code: responseError.code,
            text: responseError.text,
          })}
          </Alert>
          }
          <CardDeck>
            {isLoading
              ?
              <Card color="primary" className="text-white">
                <CardBody>
                  <OpenIconic icon="loop-circular" /> {t("overview:stashes.loading")}
                </CardBody>
              </Card>
              :
              <Fragment>
                {stashes.length ?
                  stashes.map(stash => (
                    <Card key={stash.id} color="secondary" className="text-white">
                      <CardBody>{stash.name}</CardBody>
                    </Card>
                  ))
                  : null
                }
                <Card color="success" className="text-white">
                  <CardBody>
                    <CardTitle>{t("overview:stashes.add_new.title")}</CardTitle>
                    <p>{t("overview:stashes.add_new.body.0")}</p>
                    <p>{t("overview:stashes.add_new.body.1")}</p>
                    <Button tag={Link} to="/stashes/new" color="dark" className="text-success">
                      <OpenIconic icon="plus" /> {t("overview:stashes.add_new.cta")}
                    </Button>
                  </CardBody>
                </Card>
              </Fragment>
            }
          </CardDeck>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stashes: state.stashes,
  };
};

export default connect(mapStateToProps)(translate(translationNamespaces)(OverviewStashes));
