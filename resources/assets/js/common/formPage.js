import React from 'react';

class FormPage extends React.Component {
  constructor(props){
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  setLoading(data, etc) {
    this.setState({
      loading: {
        ...this.state.loading,
        ...data
      },
      ...etc
    });
  }

  goBack() {
    this.setState({
      finished: true,
    });
  }
}

export default FormPage;
