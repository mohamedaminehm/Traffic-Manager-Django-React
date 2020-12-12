import React, { Fragment, Component } from 'react';
//import Map from './Map';
//import Chart from './Chart';
import Cards from './Cards/Cards';
import Chart from './Chart/Chart';
import CountryPicker from './CountryPicker/CountryPicker';
import Typography from '@material-ui/core/Typography';

import './Analytics.css';

import { fetchData, fetchDatareg } from './api';

//import safeImage from '/static/safety.jpg';




//hooks

export class AccAnalytics extends Component {
    state = {
        data1 : {},
        data2 : {},
        country : 'gg',
    }

    async componentDidMount(){
        if (this.state.country == 'gg') {
            const fetchedData = await fetchData();
            this.setState({ data1: fetchedData,
                            data2 : fetchedData });
            
            
        } else {
            const fetchedData = await fetchData();
            this.setState({ data1: fetchedData });
            const fetchedData2 = await fetchDatareg(this.state.country);
            this.setState({ data2: fetchedData2 });
            console.log(this.state.data2)
        }

        
    };
    

    handleCountryChange = async (country) => {
        if (country == "gg"){
            const fetchedData = await fetchData();
            this.setState({ data2 : fetchedData, country: country })
        }else {
            const fetchedData = await fetchDatareg(country);
            this.setState({ data2 : fetchedData, country: country })};
        
        
        //fetch the data
        //set the state
    }


    render(){
        const { data1,data2, country } = this.state; 
        return(
            <div className="container">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                 <h1> <strong>Analyse des données </strong></h1>
                </Typography>
                
                <Cards data={data2} />
                <CountryPicker handleCountryChange= {this.handleCountryChange}/>
                <Chart data={data2} country={country} />
                
                
            </div>
        );
    }
}

export default AccAnalytics ;

/*<CountryPicker handleCountryChange= {this.handleCountryChange}/>
                <Chart data={data} country={country} />*/


//<img  className="image" src={'/static/safety.jpg'} alt="BE-SAFE"/>
//.image {
 //   width : 370px ;
 //   margin-top: 20px;
 //   margin-bottom: 20px;
    
//}
//.image {
//    width : 100%;
//}
