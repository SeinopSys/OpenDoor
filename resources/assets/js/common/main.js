import React from "react";
import { connect } from "react-redux";
import Header from "./mainHeader";
import Footer from "./mainFooter";
import GithubCorner from "./githubCorner";
import LoadingBar from 'react-redux-loading-bar';
import { Container } from "reactstrap";
import PropTypes from "prop-types";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <LoadingBar />
        <Container>
          <GithubCorner repoName='SeinopSys/OpenDoor' />
          <Header />
          <main>
            {this.props.children}
          </main>
          <Footer />
        </Container>
      </div>
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
    isAuthenticated: state.Auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Main);
