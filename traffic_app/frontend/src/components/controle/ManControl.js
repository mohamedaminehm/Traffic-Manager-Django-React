import React, { Component } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import './Control.css'

const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });

export default function ManControl () {

    const classes = useStyles();

    const [value1, setValue1] = React.useState(40);
    const [value2, setValue2] = React.useState(40);
    const [lastUpdate1, setLastUpdate1] = React.useState(null);
    const [voie1, setVoie1] = React.useState('');
    const [voie2, setVoie2] = React.useState('');
    

    React.useEffect(() => {
        axios.get('/api_carf/tricolor')
            .then(res => {
                setVoie1(res.data[1].direction);
                setVoie2(res.data[0].direction);
                setValue1(res.data[1].red_seconds);
                setValue2(res.data[0].red_seconds);
                setLastUpdate1(res.data[1].last_update);
                
            })
            .catch(err => console.log(err))
    }, []);

    const handleChange = (event , newValue) => {
        axios.patch('/api_carf/tricolor/2' , { red_seconds : 80 - newValue , green_seconds : newValue });
        axios.patch('/api_carf/tricolor/1' , { red_seconds : newValue , green_seconds : 80 - newValue });
        
        setValue1(newValue);
        setValue2(80- newValue);
    };
    
        return (
            <div>
                    <h1 style= {{ text: 'center' }} ><strong>Controle manuelle de traffic</strong></h1><br/>
                    <Grid container  justify="center">
                    <Grid item component={Card} xs={12} md={12} className="cardControl" >
                        <CardContent>
                        <Typography variant="body2" gutterBottom>Fixé ici le temps prochain d'attente sur la voie :</Typography>
                        <Typography id="discrete-slider" gutterBottom>
                            Attente : {voie1}
                        </Typography><br/>
                        <div className= {classes.root} >
                        <Slider
                            value={value1}
                            
                            aria-labelledby="discrete-slider"
                            onChange={handleChange}
                            step={5}
                            marks
                            min={10}
                            max={70}
                            valueLabelDisplay="on"
                        />
                        <Typography id="discrete-slider" gutterBottom>
                            Attente : {voie2}
                        </Typography><br/>
                        <Slider
                            value={value2}
                            
                            aria-labelledby="discrete-slider"
                            
                            step={5}
                            marks
                            min={10}
                            max={70}
                            valueLabelDisplay="on"
                            disabled
                        />
                        </div>

                            <Typography color="textSecondary" >dernier changement : {new Date(lastUpdate1).toString()}</Typography>
                            
                        </CardContent>
                    </Grid>
                    </Grid>


                
            </div>
        )
    
};


