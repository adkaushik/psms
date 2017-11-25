import React, { Component } from 'react';
import rps from 'request-promise-native';

class App extends Component {
  constructor(args) {
    super(...args);

    this.state = {
      data: [],
      remainingSlots: 10
    };
  }

  componentDidMount() {
    this.getSlotsData();
  }

  renderElements = (valuesList = []) => {
    return valuesList.map((value, i) => <li key={i+1}>Slot {i + 1} : <span> {value} </span> </li>)
  }

  renderNewData = (data) => {
    this.renderElements(data);
  }

  getSlotsData = async () => {
    const options = {
      url: 'http://localhost:5000',
      method: 'GET',
      json: true
    };

    try {
      const { data = [], limit = 10 } = await rps(options);
      this.setState({
        data,
        remainingSlots: limit - data.length
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <h1>Parking Space Management System</h1>
        <h3>Parking Slots</h3>
        <h5>Remaining Slots: {this.state.remainingSlots}</h5>
        <div className="slot">
           <ul>
             {this.renderElements(this.state.data)}
          </ul>
         </div>
       </div>

    );
  }
}

export default App;
