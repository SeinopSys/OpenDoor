import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardColumns,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  CardLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import * as StashService from "../../services/stash";
import OpenIconic from "../../common/openIconic";
import LoadingAlert from "../../common/loadingAlert";

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
          {isLoading && <LoadingAlert icon="loop-circular" text={t("overview:stashes.loading")} />}
          <CardColumns>
            {!isLoading &&
            <Fragment>
              {stashes.length ?
                stashes.map(stash => (
                  <Card key={stash.id}>
                    <CardHeader tag='h5'>
                      {stash.label}
                    </CardHeader>
                    <CardBody>
                      <CardText>
                        <strong>Type:</strong> {t(`stashes:types.${stash.type}`)}
                      </CardText>
                      {stash.balances.length > 0
                        ? (<CardText tag="ul">
                          {stash.balances.map(balance => (
                            <li key={balance.id}>{balance.readable}</li>
                          ))}
                        </CardText>)
                        : <CardText className="font-italic">{t("overview:stashes.no_balance")}</CardText>
                      }
                    </CardBody>
                    <CardFooter>
                      <CardLink tag={Link} to={`/stashes/${stash.id}/balance`} className="text-success">
                        <OpenIconic icon="dollar" /> {t("overview:stashes.manage_balance")}
                      </CardLink>
                      <CardLink tag={Link} to={`/stashes/edit/${stash.id}`} className="text-primary">
                        <OpenIconic icon="pencil" /> {t("global:edit")}
                      </CardLink>
                    </CardFooter>
                  </Card>
                ))
                : null
              }
              <Card className="bg-success text-white">
                <CardHeader tag='h5'>
                  {t("overview:stashes.add_new.title")}
                </CardHeader>
                <CardBody>
                  <CardText>{t("overview:stashes.add_new.body.0")}</CardText>
                  <CardText>{t("overview:stashes.add_new.body.1")}</CardText>
                </CardBody>
                <CardFooter className="bg-white text-center">
                  <CardLink tag={Link} to="/stashes/new" className="text-success">
                    <OpenIconic icon="plus" /> {t("overview:stashes.add_new.cta")}
                  </CardLink>
                </CardFooter>
              </Card>
            </Fragment>
            }
          </CardColumns>
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
