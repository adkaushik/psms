import React, { Component } from 'react';
import rps from 'request-promise-native';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Parking Space Management System</h1>
          {this.props.children}
       </div>
    );
  }
}
