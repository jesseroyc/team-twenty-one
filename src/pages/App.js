import React, { Component } from 'react';
import logo from '../logo.svg';
import Chart from 'react-google-charts';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    // for each
    //chartData["time value"] = [tempEle,moisEle,humiEle,presEle];
    this.state = { chartData : [
        ['Time', 'Temperature', 'Moisture', 'Humidity', 'Pressure'],
        [1,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [2,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [3,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [4,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [5,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [6,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [7,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [8,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [9,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [10,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [11,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [12,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [13,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [14,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
      ]
    };
  }
  
  componentDidMount() {
    setInterval(() => {
      this.setState({ chartData: [
        ['Time', 'Temperature', 'Moisture', 'Humidity', 'Pressure'],
        [1,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [2,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [3,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [4,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [5,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [6,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [7,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [8,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [9,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [10,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [11,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [12,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [13,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        [14,Math.floor(Math.random() * Math.floor(100)), Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100)),Math.floor(Math.random() * Math.floor(100))],
        ]
      });
    }, 900);
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