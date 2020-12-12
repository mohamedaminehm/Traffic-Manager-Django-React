import React, { Component, Fragment } from 'react';
import { Bar , Line } from 'react-chartjs-2';
import Axios from 'axios';
import './styles.css';
import { Col } from 'reactstrap';





const data2 = {
    labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016'],
    datasets: [
      {
        label: 'accidents',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [8924, 8466, 9351, 8878, 7969, 7225, 7218]
      },
      {
        label: 'tués',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,0,0,0.4)',
        borderColor: 'rgba(255,0,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,0,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,0,0,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1208, 1485, 1623, 1505 , 1565, 1407,1446]
      },
      {
        label: 'Blessées',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,255,0,0.4)',
        borderColor: 'rgba(0,255,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0,255,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0,255,0,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [12495, 12595, 14147, 13539, 12350, 10882,11034]
      }
    ]
  };

export class Chart extends Component {
    state = {
        contries :[],
        accL : [],
        deadL :[],
        injuredL :[],

    };
    
    componentDidMount(){
        Axios.get("api_acc/accident")
            .then(response =>{
                const data = response.data;
                data.forEach(element => {
                    const { governorate , accidents , dead , injured } = element ;
                    this.setState({
                        contries : this.state.contries.concat(governorate),
                        accL : this.state.accL.concat(accidents),
                        deadL : this.state.deadL.concat(dead),
                        injuredL : this.state.injuredL.concat(injured)

                    })
                    
                })
            })
    };
    render() {
        const data = {
            labels : this.state.contries,
            datasets : [
                {
                    label : 'accidents',
                    backgroudColor : 'rgb(75,192,192,1)',
                    borderColor : 'rgb(0,0,0,1)',
                    borderWidth : 2,
                    data : this.state.accL
                },
                {
                    label : 'dead',
                    backgroudColor : 'rgb(75,192,192,1)',
                    borderColor : 'rgb(0,255,0,1)',
                    borderWidth : 2,
                    data : this.state.deadL
                },
                {
                    label : 'injured',
                    backgroudColor : 'rgb(75,192,192,1)',
                    borderColor : 'rgb(0,255,255,1)',
                    borderWidth : 2,
                    data : this.state.injuredL
                },
            ]
        };
        return (
            <div>
                <div>
                    <Col xs="12" sm="12" md="12" lg="6">
                    <Bar
                        data={data}
                        options={{
                            width : 300,
                            title:{
                            display:true,
                            text:'Victimes of Traffic accidents in March 2014',
                            fontSize:20
                            },
                            legend:{
                            display:true,
                            position:'right'
                            }
                        }}
                    className = "chartContainer"/>
                    </Col>   
                
                <Col xs="12" sm="12" md="12" lg="6">
                    <h2>statistiques des accidents entre 2010 et 2016</h2>
                    <Line data={data2} />
                    </Col>
                </div> 
                
            </div>
        );
    }
}

export default Chart;
