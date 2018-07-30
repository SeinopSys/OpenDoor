import React from "react";
import { connect } from "react-redux";
import Header from "./mainHeader";
import Footer from "./mainFooter";
import GithubCorner from "./githubCorner";
import { Container } from "reactstrap";
import PropTypes from "prop-types";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
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
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Main);
