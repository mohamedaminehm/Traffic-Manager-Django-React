import React, { Component, Fragment } from 'react';
import AlertMap from './AlertMap';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import BlockIcon from '@material-ui/icons/Block';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';

import BeenhereIcon from '@material-ui/icons/Beenhere';


const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },}))

class TrafficAlert extends Component {
    

    render() {
        return (
            <Fragment>
            <Container maxWidth="sm" component="main" className={useStyles.heroContent}  >
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                L'état de la ville 
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    <BeenhereIcon style={{ color: '#388E3C' }} fontSize="large" />
                    Le couleur vert indique qu'il n'y a pas de congestion sur le carfour
                    <br/>
                    <AspectRatioIcon style={{ color: 'yellow' }} fontSize="large" />
                    Le couleur jaune indique que l'état de congestion normale et passable
                    <br/>
                    <BlockIcon style={{ color: 'red' }} fontSize="large" />
                    Le couleur rouge indique un passage bloqué donc il est préfirable de changer le trajet 
                    <br/>
                    <AlarmOffIcon style={{ color: 'blue' }} fontSize="large" />
                    Le couleur bleu indique le carfour est hors service
                    <br/> 


                </Typography>
            </Container>
            <br/>
            <AlertMap  />

            </Fragment>
        )
    }
}

export default TrafficAlert;
