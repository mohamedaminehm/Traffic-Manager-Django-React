
import axios from 'axios';

require("babel-polyfill");

const url = 'http://127.0.0.1:8000/api_acc/accident';

export const fetchData = async () => {


    try {
        
        const { data } = await axios.get(url);
        
        const { t_accidents, t_deaths , t_injured , last_update  } = data[0];
        const modifiedData = {
            accidents : t_accidents,
            dead : t_deaths,
            injured : t_injured,
            last_update : last_update, }

        
        

        return modifiedData ;
    } catch (error) {
        console.log(error);
    }
};
export const fetchDatareg = async (country) => {

    let url2 = `/api_acc/accidentreg/${country}` ;

    try {
        const { data: { accidents , dead , injured ,latitude ,longitude ,last_update } } = await axios.get(url2);

        const modifiedData = {
            accidents : accidents,
            dead : dead,
            injured : injured,
            last_update :last_update,
            /*latitude : latitude,
            longitude : longitude,*/
            

        }
        console.log(modifiedData);
        

        return modifiedData ;
    } catch (error) {
        console.log(error);
    }
};


export const fetchDailyData = async () => {
    try {
        const { data }  = await axios.get(`${url}/daily`);
        
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths : dailyData.deaths.total,
            date: dailyData.reportDate,
        }) );
        console.log(data);
        return modifiedData;

    }catch (error){

    }
}

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(url);
        const { details } = data[0];
        
        return details.map((detail) => detail.governorate);
    }catch(error) {
        console.log(error);
    }
}
