import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Snackbar  } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import axios from 'axios';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));





const ChoiseMenu = () => {
    
    
    const classes = useStyles();
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [lastUpdate, setLastUpdate] = React.useState(null);

    React.useEffect(() => {
        axios.get('/api_carf/carfour/1')
            .then(res => {
                
                setOpen1(res.data.mode == 1);
                setOpen2(res.data.mode == 2);
                setOpen3(res.data.mode == 3);
                setLastUpdate(res.data.last_update)
                
            })
            .catch(err => {
                console.log(err)
            })
            
    }, []);
    
    

    const handleClick1 = () => {
        setOpen1(true);
        setOpen2(false);
        setOpen3(false);
        axios.patch('/api_carf/carfour/1' , { mode : 1 });
        axios.get('/api_carf/carfour/1')
            .then(res => {
                
                setLastUpdate(res.data.last_update)
                
            })
            .catch(err => {
                console.log(err)
            })
    };
    const handleClick2 = () => {
        setOpen1(false);
        setOpen2(true);
        setOpen3(false);
        axios.patch('/api_carf/carfour/1' , { mode : 2 });
        axios.get('/api_carf/carfour/1')
        
        .then(res => {
            
            setLastUpdate(res.data.last_update)
            
        })
        .catch(err => {
            console.log(err)
        });
        axios.patch('/api_carf/tricolor/1' , { red_seconds : 40 , green_seconds : 40  });
        axios.patch('/api_carf/tricolor/2' , { red_seconds : 40 , green_seconds : 40  });
        
        
    };
    const handleClick3 = () => {
        setOpen1(false);
        setOpen2(false);
        setOpen3(true);
        axios.patch('/api_carf/carfour/1' , { mode : 3 });
        axios.get('/api_carf/carfour/1')
        .then(res => {
            
            setLastUpdate(res.data.last_update)
            
        })
        .catch(err => {
            console.log(err)
        })
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        //setOpen1(false);
        return;
        
    };
    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        //setOpen2(false);
    };
    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        //setOpen3(false);
    };

    
        
        
        
    
    
    

    return(
        <div className={classes.root} >
            <p style={{ text : 'center' , color: 'red' }} ><strong> la dernière mise à jour de mode de controle de ce carfour est : {new Date(lastUpdate).toString()} </strong></p><br/><br/>
            <Button variant="outlined" onClick={handleClick1}>
                Mode 1
            </Button>
            <Snackbar open={open1} autoHideDuration={4000} onClose={handleClose1} 
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}>
            <Alert onClose={handleClose1} severity="info">
                    {open1 ? 
                     
                    <h2>Observez les Transitions <Link to='/realstat' style ={{ color:'red' }}>ici</Link> </h2> 
                     : 
                     'Mode intelligent désactivé'}
            </Alert>
            </Snackbar>
            <Alert severity={open1 ? 'success' : 'warning'}>  {open1 ? 'Mode intelligent activé' : 'Mode intelligent désactivé'}</Alert>

            <Button variant="outlined" onClick={handleClick2}>
                Mode 2
            </Button>
            <Snackbar open={open2} autoHideDuration={4000} onClose={handleClose2} anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}>
            <Alert onClose={handleClose2} severity="info">
                     {open2 ? <h2>Temps de cycle est fixe : 40s - 5s - 40s</h2> : 'Mode normale désactivé'}
            </Alert>
            </Snackbar>
            <Alert severity={open2 ? 'success' : 'warning'}>  {open2 ? 'Mode normale activé' : 'Mode normale désactivé'}</Alert>

            <Button variant="outlined" onClick={handleClick3}>
                Mode 3
            </Button>
            <Snackbar open={open3} autoHideDuration={4000} onClose={handleClose3}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}>
            <Alert onClose={handleClose3} severity="info">
            {open3 ? <h2>Allez vers L'interface de commande <Link to='/manuelle' style={{ color:'red' }}> <DirectionsIcon /> </Link> </h2> : 'Mode manuelle désactivé'}
            </Alert>
            </Snackbar>
            <Alert severity={open3 ? 'success' : 'warning'}> {open3 ? 'Mode manuelle activé' : 'Mode manuelle désactivé'}</Alert>

            <br/>
            <br/>
            <br/><br/><br/><br/><br/><br/>


                
        </div>
    );
};


export default ChoiseMenu ;