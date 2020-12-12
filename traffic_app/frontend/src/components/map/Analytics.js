import React, { Fragment, Component } from 'react';
import Map from './Map';
//import Chart from './Chart';
import Cards from './Cards/Cards';
import Chart from './Chart/Chart';
import CountryPicker from './CountryPicker/CountryPicker';
//import { Cards, Chart , CountryPicker } from './';
import './Analytics.css';

import { fetchData } from './api';

//import safeImage from '/static/safety.jpg';




//hooks

export class Analytics extends Component {
    state = {
        data : {},
        country : '',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    };

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        
        this.setState({ data:fetchedData, country: country })
        //fetch the data
        //set the state
    }


    render(){
        const { data, country } = this.state; 
        return(
            <div className="container">
                
                <Cards data={data} />
                <CountryPicker handleCountryChange= {this.handleCountryChange}/>
                <Chart data={data} country={country} />
                
            </div>
        );
    }
}

export default Analytics ;

//<img  className="image" src={'/static/safety.jpg'} alt="BE-SAFE"/>
//.image {
 //   width : 370px ;
 //   margin-top: 20px;
 //   margin-bottom: 20px;
    
//}
//.image {
//    width : 100%;
//}
