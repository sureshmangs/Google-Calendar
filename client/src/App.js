import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './components/Navbar';
import Footer from './components/Footer'
import * as actions from './actions/authAction';

class App extends Component {

  componentDidMount() {
    console.log('In App.js calling checkAuth')
    this.props.checkAuth();
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default connect(null, actions)(App);

