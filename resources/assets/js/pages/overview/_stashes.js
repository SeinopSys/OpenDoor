import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardDeck,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
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
    const { t, stashes } = this.props;
    const { isLoading, responseError } = this.state;

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
          {isLoading &&
          <Alert color="primary">
            <OpenIconic icon="loop-circular" /> {t("overview:stashes.loading")}
          </Alert>}
          <CardDeck>
            {!isLoading &&
            <Fragment>
              {stashes.length ?
                stashes.map(stash => (
                  <Card key={stash.id}>
                    <CardBody>
                      <CardTitle>{stash.label}</CardTitle>
                    </CardBody>
                    <CardFooter>
                      <Button tag={Link} to={"/stashes/edit/" + stash.id} color="primary">
                        <OpenIconic icon="pencil" /> {t("global:edit")}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
                : null
              }
              <Card>
                <CardBody>
                  <CardTitle>{t("overview:stashes.add_new.title")}</CardTitle>
                  <CardText>{t("overview:stashes.add_new.body.0")}</CardText>
                  <CardText>{t("overview:stashes.add_new.body.1")}</CardText>
                </CardBody>
                <CardFooter>
                  <Button tag={Link} to="/stashes/new" color="success">
                    <OpenIconic icon="plus" /> {t("overview:stashes.add_new.cta")}
                  </Button>
                </CardFooter>
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
    stashes: state.stashes.list,
  };
};

export default connect(mapStateToProps)(translate(translationNamespaces)(OverviewStashes));
