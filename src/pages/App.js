import React, { Component } from 'react';
import logo from '../logo.svg';
import Chart from 'react-google-charts';
import './App.css';
import 'isomorphic-fetch';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { chartData : [['Time', 'Temperature', 'Moisture', 'Humidity', 'Pressure']] };
  }
  
  componentDidMount() {

    setInterval(() => {
      
      fetch('http://www.team-twenty-one.com/record')
      .then((responseText) => responseText.text())
      .then((response) => {
        let tmp = JSON.parse(response);
        console.log(tmp);
        let a = []; for(let prop in tmp){a.push(tmp[prop])}
        console.log(a);
        tmp = transpose(a);
        console.log(tmp);
        console.log(['Time', 'Temperature', 'Moisture', 'Humidity', 'Pressure'],...tmp);
        this.setState({ chartData: [
          ['Time', 'Temperature', 'Moisture', 'Humidity', 'Pressure'],
            ...tmp,
            ]
        });
      });
      
      function transpose(a) {

        var w = a.length || 0;
        var h = a[0] instanceof Array ? a[0].length : 0;

        if(h === 0 || w === 0) { return []; }
          var i, j, t = [];
          
        for(i=0; i<h; i++) {
          t[i] = [];
          for(j=0; j<w; j++) {
            t[i][j] = a[j][i];
          }
        }
        return t;
      }
    }, 5000);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={this.state.chartData}
            options={{
              chartArea: {
                width: '85%',
                height: '85%',
              },
              pointSize: 5,
              animation: {
                duration: 1000,
                easing: 'in'
              },
              vAxis: {
                viewWindow: {
                  max: -10,
                  min: 100,
                },
              },
              hAxis: {
                viewWindow: {
                  max: 100,
                  min: -10,
                },
              },
              legend: { position: 'right' },
              title: 'Temperature, Moisture, Humidity, Pressure and Time',
              subtitle: 'Plant Hub',
            }}
          />
        </header>
      </div>
    );
  }
}

export default App;