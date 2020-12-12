import React, { Component } from 'react';
// import './lesson.css';
//import ResponsivePlayer from "../video/ResponsivePlayer";
//import ReactPlayer from 'react-player';
import axios from 'axios';
import { fetchDirData2 } from '../visualisation/api'; 
import './chaine.css';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button , CardHeader
  } from 'reactstrap';

  

class  Chaine2 extends Component  {
    state= {
        debit : 0 ,
        last_update : null
        
    }

    async componentDidMount(){
        const voie2 = await fetchDirData2();
        this.setState({ debit: voie2[ voie2.length - 1 ].debit ,
                        last_update :voie2[ voie2.length - 1 ].last_update });
        
    }
    
    handleChange = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };
    handleSubmit(e) {
        e.preventDefault();
        
    }
    
    render(){
        return(
            <div>
                <Card className="streamcard">
                    <CardHeader>*** Chaine 2 *** </CardHeader>
                    <CardImg top width="100%" src={'http://127.0.0.1:8000/detect2'}  alt="Card image cap" />
                    <CardBody>
                        
                        <CardSubtitle> Voie Ibn Khaldoun vers Bardo </CardSubtitle>
                        <CardText>
                            <h1> le debit instantané (FPS) est:</h1><br/><p style ={{ color: 'blue', textAlign :'center' }}>  {this.state.debit} frame/seconde </p>
                            <h1>dernier mise à jour de debit: </h1><br/><p style ={{ color: 'blue', textAlign :'center' }}>{ new Date(this.state.last_update).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0] }</p>
                        </CardText>
                        <Button>Actualisé</Button>
                    </CardBody>
                </Card> 
            </div>     
           
        );
}
}

export default Chaine2 ;
