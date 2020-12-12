import React, { Component } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import './Cards.css';
import CountUp from 'react-countup';


const Cards = ({ data: {accidents , dead , injured, last_update}}) => {
       
        if (!accidents || !dead || !injured || !last_update ){
            return 'Loding ...'
        }
       
        console.log(accidents);
        return (
            <div className="container">
                <Grid container spacing={3} justify="center">
                    <Grid item component={Card} xs={9} md={3} className="carddd confirmed">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Total des accidents</Typography>
                            <Typography variant="h5" >
                                <CountUp start={0} end={accidents} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary" >dernière mise à jour: {new Date(last_update).toDateString()}</Typography>
                            <Typography variant="body2" >Nombre des accidents pendant l'année courante</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={9} md={3} className="carddd recovered">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Total des blessées</Typography>
                            <Typography variant="h5" >
                            <CountUp start={0} end={injured} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary" >dernière mise à jour: {new Date(last_update).toDateString()}</Typography>
                            <Typography variant="body2" >nombre des blessées des accidents</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={9} md={3} className="carddd deaths">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Total des morts</Typography>
                            <Typography variant="h5" >
                            <CountUp start={0} end={dead} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary" >dernière mise à jour: {new Date(last_update).toDateString()}</Typography>
                            <Typography variant="body2" >nombre des morts dus au accidents</Typography>
                        </CardContent>
                    </Grid>
                </Grid>           
            </div>
        )
    
}

export default Cards;
