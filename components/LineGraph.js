import React from 'react'
import {Line,Bar} from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function LineGraph(props) {
  const data = {
    labels: props.label.map( l => l.substr(0,10)) ,
    datasets: [
      {
        label: 'Covid  Data',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(51,102,102,0.4)',
        borderColor: 'rgba(51,153,255,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(51,153,255,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(51,153,255,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.yAxis
      }
    ]
  };
      return (
        <div  
          style={{
            width:'900px',
            height: '900px',
            margin: '50px auto '
          }}
          >
            
            <Line data={data}  />


        </div>
    )
}
export default LineGraph;

