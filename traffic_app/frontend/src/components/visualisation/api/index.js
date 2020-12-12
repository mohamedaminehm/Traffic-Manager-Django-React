import axios from 'axios';



export const fetchDirData1 = async () => {


    try {
        
        const { data } = await axios.get('/per_30');
        
        const voie1 = data.filter((d) => {return d.voie === 'MedAmine-PC1'});
        
        
        

        
        

        return voie1 ;
    } catch (error) {
        console.log(error);
    }
};
export const fetchDirData2 = async () => {


    try {
        
        const { data } = await axios.get('/per_30');
        
        
        const voie2 = data.filter((d) => {return d.voie === 'MedAmine-PC2'});
        
        

        
        

        return voie2 ;
    } catch (error) {
        console.log(error);
    }
};