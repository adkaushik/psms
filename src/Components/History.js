import React, { Component } from 'react';
import rps from 'request-promise-native';
import moment from 'moment';

export default class History extends Component {
  constructor(args) {
    super(...args);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getSlotsData();
  }

  renderElements = (valuesList = []) => {
    return valuesList.map((value, i) => {
      const created = moment(new Date(value.createdAt)).format('DD MMM YYYY H:M:s A');
      const updated = moment(new Date(value.updatedAt)).format('DD MMM YYYY H:M:s A');
      return (
        <tr key={i}>
          <td> {value.number} </td>
          <td> {value.amount} </td>
          <td> {created} </td>
          <td> {updated} </td>
        </tr>
      )
    })
  }

  renderNewData = (data) => {
    this.renderElements(data);
  }

  getSlotsData = async () => {
    const options = {
      url: 'http://localhost:5000/history',
      method: 'GET',
      json: true
    };

    try {
      const data = await rps(options);
      this.setState({
        data
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <h3>Parking Slots History</h3>
        <div className="slot">
          <table>
            <thead>
              <tr>
                <th> Vehicle </th>
                <th> Amount </th>
                <th> Time IN </th>
                <th> Time OUT </th>
              </tr>
            </thead>
            <tbody>
              {this.renderElements(this.state.data)}
            </tbody>
          </table>
         </div>
      </div>
    )
  }
}
