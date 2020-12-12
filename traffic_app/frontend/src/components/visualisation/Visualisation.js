import React, { Component } from 'react';
import CartGraph from './CartGraph';
import { fetchDirData1, fetchDirData2 } from './api';

export class Visualisation extends Component {
    state = {
        data1 : [],
        data2 : []
    };

    async componentDidMount(){
        const voie1 = await fetchDirData1();
        this.setState({ data1: voie1  });
                        
        const voie2 = await fetchDirData2();
        this.setState({ data2 : voie2});
                                     
    };
    render() {
        const {data1 , data2} = this.state;
        return (
            <div>
                <h1 style={{textAlign: 'center' , marginBottom:'20px' }}><strong>Suivre les analyses de votre carfour le longue de cette journé :</strong></h1>
                <CartGraph data1={data1} data2={data2}  />
            </div>
        )
    }
}

export default Visualisation
