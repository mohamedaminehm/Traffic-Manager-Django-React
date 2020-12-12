import React, { Component } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

import { Line } from 'react-chartjs-2';
import './CardGraph.css';

const CartGraph = ( {data1 , data2}  ) => {
    
    
    if ( !data1 || !data2) { return 'loading ...' }
    console.log(data2)
    console.log(data1)
        return (
            <div className="container">
                <Grid container spacing={2} justify="center">
                <Grid item component={Card} xs={9} md={6} className="card voie1">
                        <CardContent className="graph">
                        <Typography color="textSecondary" gutterBottom> Voie "Beb Saadoun vers Bardo"</Typography>
                        <Line 
                                data={{
                                    labels: data1.map(({ last_update }) => new Date(last_update).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]),
                                    datasets: [{
                                        data:data1.map(( { moy_voiture } )=> moy_voiture ),
                                        label: 'variation voiture en moy',
                                        borderColor: '#3333ff',
                                        fill: true,
    
                                    }, {
                                        data:data1.map(( { moy_personne } )=> moy_personne ),
                                        label: 'Variation personne en moy',
                                        borderColor: 'red',
                                        backgroundColor: 'rgb(255,0,0,0.5)',
                                        fill: true,          
    
                                    }],
                                }}
                            />
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={9} md={6} className="card voie2">
                        <CardContent className="graph">
                        <Typography color="textSecondary" gutterBottom> Voie "Ibn Khaldoun vers Bardo"</Typography>
                            <Line 
                                data={{
                                    labels: data2.map(({ last_update }) =>  new Date(last_update).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]),
                                    datasets: [{
                                        data:data2.map(( { moy_voiture } )=> moy_voiture ),
                                        label: 'variation voiture en moy',
                                        borderColor: '#3333ff',
                                        fill: true,
    
                                    }, {
                                        data:data2.map(( { moy_personne } )=> moy_personne ),
                                        label: 'Variation personne en moy',
                                        borderColor: 'red',
                                        backgroundColor: 'rgb(255,0,0,0.5)',
                                        fill: true,          
    
                                    }],
                                }}
                            />
                        </CardContent>
                    </Grid>
                    
                </Grid>
            
            </div>
        );
    
}

export default CartGraph;

//({ data: {accidents , dead , injured, last_update}}
/*
<Grid item component={Card} xs={9} md={3} className="card recovered">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>recovered</Typography>
                            <Typography variant="h5" >
                            <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                            <Typography variant="body2" >Number of recovered cases of COVID-19</Typography>
                        </CardContent>
                    </Grid>
                    */




                  