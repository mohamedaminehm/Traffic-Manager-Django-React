import React, { Component, useState, useEffect } from 'react';

import { Line, Bar } from 'react-chartjs-2';

import './Chart.css';
import { fetchDatareg } from '../api';

const Chart = ( {data : {accidents , dead , injured,latitude,longitude,last_update } , country } ) => {
    
    
    
    
    const text = (
        country == "gg" ? 'situation global' : `la situation courante dans ${country}`
    );
    

    const barChart = (
        accidents
        ? (
            <Bar 
                data = {{
                    labels : ['accidents', 'blessés' , 'tués'],
                    datasets: [{
                        label : 'Nombre',
                        backgroundColor : [
                            'rgb(0,0,255,0.5)',
                            'rgb(0,255,0,0.5)',
                            'rgb(255,0,0,0.5)',
                        ],
                        data : [accidents, injured, dead ],
                    }]
                }}
                options={{
                    legend : { display : false },
                    title : { display:true , text: text},
                }}
            />
        )
        : <Bar 
            data = {{
                labels : ['accidents', 'blessés' , 'tués'],
                datasets: [{
                    label : 'Nombre',
                    backgroundColor : [
                        'rgb(0,0,255,0.5)',
                        'rgb(0,255,0,0.5)',
                        'rgb(255,0,0,0.5)',
                    ],
                    data : [0, 0, 0 ],
                }]
            }}
            options={{
                legend : { display : false },
                title : { display:true , text: text},
            }}
    />
    );


    return(
        <div className="container">
            {barChart}
            
        </div>
    );
}

export default Chart;


//{country ? barChart : lineChart}

/*else {
            const fetchedData = await fetchDatareg(this.state.country);
            this.setState({ data: fetchedData });
        }*/