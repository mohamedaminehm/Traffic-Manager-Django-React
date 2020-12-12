import React, { Component ,useState, useEffect} from 'react';
import { fetchDailyData } from '../api/index';
import { Line, Bar } from 'react-chartjs-2';

import './Chart.css';

const Chart = ( {data : {confirmed , recovered , deaths } , country } ) => {
    const [dailyData, setDailyData]= useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData  (await fetchDailyData());
        }

        

        fetchAPI();
    }, [setDailyData]);

    

    const lineChart = (
        dailyData.length 
        ? (
        <Line 
        data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
                data:dailyData.map(( { confirmed } )=> confirmed ),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,

            }, {
                data:dailyData.map(( { deaths } )=> deaths ),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgb(255,0,0,0.5)',
                fill: true,          

            }],
        }}
        />)
        : null
    );

    const barChart = (
        confirmed
        ? (
            <Bar 
                data = {{
                    labels : ['Infected', 'Recovered' , 'Deaths'],
                    datasets: [{
                        label : 'People',
                        backgroundColor : [
                            'rgb(0,0,255,0.5)',
                            'rgb(0,255,0,0.5)',
                            'rgb(255,0,0,0.5)',
                        ],
                        data : [confirmed.value, recovered.value, deaths.value ],
                    }]
                }}
                options={{
                    legend : { display : false },
                    title : { display:true , text:`Current state in ${country}`},
                }}
            />
        )
        : null
    );


    return(
        <div className="container">
            {country ? barChart : lineChart}
        </div>
    );
}

export default Chart;
