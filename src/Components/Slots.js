import React, { Component } from 'react';
import rps from 'request-promise-native';

export default class Slots extends Component {
  constructor(args) {
    super(...args);

    this.state = {
      data: [],
      slotsOccupied: 0
    };
  }

  componentDidMount() {
    this.getSlotsData();
  }

  renderElements = (valuesList = []) => {
    return valuesList.map((value, i) => <li key={i+1}>Slot {i + 1} : <span> {value.number} </span> </li>)
  }

  renderNewData = (data) => {
    this.renderElements(data);
  }

  getSlotsData = async () => {
    const options = {
      url: 'http://localhost:5000/',
      method: 'GET',
      json: true
    };

    try {
      const data = await rps(options);
      console.log(data);
      this.setState({
        data,
        slotsOccupied: data.length
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <h3>Parking Slots</h3>
        <h5>Slots Occupied: {this.state.slotsOccupied}</h5>
        <div className="slot">
           <ul>
             {this.renderElements(this.state.data)}
          </ul>
         </div>
      </div>
    )
  }
}
