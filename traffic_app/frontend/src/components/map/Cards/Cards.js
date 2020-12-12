import React, { Component } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import './Cards.css';
import CountUp from 'react-countup';


const Cards = ({ data: {confirmed , recovered , deaths, lastUpdate}}) => {
       
        if (!confirmed || !recovered || !deaths || !lastUpdate ){
            return 'Loding ...'
        }
       
        console.log(recovered);
        return (
            <div className="container">
                <Grid container spacing={3} justify="center">
                    <Grid item component={Card} xs={9} md={3} className="cardd confirmed">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Infected</Typography>
                            <Typography variant="h5" >
                                <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                            <Typography variant="body2" >Number of active cases of COVID-19</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={9} md={3} className="cardd recovered">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>recovered</Typography>
                            <Typography variant="h5" >
                            <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                            <Typography variant="body2" >Number of recovered cases of COVID-19</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={9} md={3} className="cardd deaths">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>deaths</Typography>
                            <Typography variant="h5" >
                            <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                            <Typography variant="body2" >Number of deaths cases of COVID-19</Typography>
                        </CardContent>
                    </Grid>
                </Grid>           
            </div>
        )
    
}

export default Cards;
