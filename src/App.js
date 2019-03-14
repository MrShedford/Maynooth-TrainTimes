import React, { Component } from 'react';
import './App.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



let id = 0;
function createData(origin, duein, destination, expdepart, exparrival) {
  id += 1;
  return { id, origin, duein, destination, exparrival, expdepart };
}



class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { trainStation: null };
  }

  componentDidMount() {
    fetch('https://thingproxy.freeboard.io/fetch/http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=MYNTH&NumMins=90&format=xml')
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
        let stationInfo = data.getElementsByTagName('objStationData');
        let allData = []
        for (let i = 0; i < stationInfo.length; i++) {
          let stationData = createData(
            stationInfo[i].getElementsByTagName('Origin')[0].innerHTML,
            stationInfo[i].getElementsByTagName('Duein')[0].innerHTML,
            stationInfo[i].getElementsByTagName('Destination')[0].innerHTML,
            stationInfo[i].getElementsByTagName('Exparrival')[0].innerHTML,
            stationInfo[i].getElementsByTagName('Expdepart')[0].innerHTML
          )
          allData.push(stationData)
        }
        this.setState({ trainStation: allData })
      })
  }
  render() {
    let rows;
    const dataPresent = this.state.trainStation;

    if (dataPresent) {
      rows = this.state.trainStation

    } else {
      rows = []
    }



    if (this.state.trainStation !== null) {
      console.log(this.state.trainStation)

    }
    return (
      <div className="App">
        <div className="head">
          Maynooth Transportation Information
      </div>
        <Paper >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Origin</TableCell>
                <TableCell align="center">Due in</TableCell>
                <TableCell align="center">Destination</TableCell>
                <TableCell align="center">Expected Arrival</TableCell>
                <TableCell align="center">Expected Departure</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.origin}</TableCell>
                  <TableCell align="center">{row.duein}</TableCell>

                  <TableCell align="center">{row.destination}</TableCell>
                  <TableCell align="center">{row.exparrival}</TableCell>
                  <TableCell align="center">{row.expdepart}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>


      </div>
    );
  }
}


export default App;
