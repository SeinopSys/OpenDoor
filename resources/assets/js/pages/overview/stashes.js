import React from "react";
import {
  Row,
  Col,
  Card,
  CardColumns,
  CardBody,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import * as StashService from "../../services/stash";
import ValidationErrors from "../../common/validationErrors";
import OpenIconic from "../../common/openIconic";

const translationNamespaces = [
  "global", "overview"
];

class Stashes extends React.Component {
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
    const { isLoading, stashes } = this.state;

    return (
      <Row>
        <Col>
          <h2>{t("overview:stashes.title")}</h2>
          {isLoading
            ?
            <Alert color="primary" className="border border-primary">
              <OpenIconic icon="loop-circular" /> {t("overview:stashes.loading")}
            </Alert>
            :
            (stashes.length
                ?
                <CardColumns>
                  {stashes.map(stash => (
                    <Card key={stash.id}>
                      <CardBody>{stash.name}</CardBody>
                    </Card>
                  ))}
                </CardColumns>
                :
                <Alert color="info" className="border border-info">
                  <OpenIconic icon="info" /> {t("overview:stashes.empty")}
                </Alert>
            )
          }
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

export default connect(mapStateToProps)(translate(translationNamespaces)(Stashes));
