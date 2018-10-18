import React from "react";
import { connect } from "react-redux";
import Header from "./mainHeader";
import Footer from "./mainFooter";
import GithubCorner from "./githubCorner";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { APP_NAME } from "./constants";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, authenticating } = this.props;

    if (authenticating)
      return null;

    return (
      <Container>
        <Helmet>
          <title>{title ? `${title} - ${APP_NAME}` : APP_NAME}</title>
        </Helmet>
        <GithubCorner repoName='SeinopSys/OpenDoor' />
        <Header />
        <main>
          {this.props.children}
        </main>
        <Footer />
      </Container>
    );
  }
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authenticating: state.authenticating,
    title: state.nav.title,
  };
};

export default connect(mapStateToProps)(Main);
