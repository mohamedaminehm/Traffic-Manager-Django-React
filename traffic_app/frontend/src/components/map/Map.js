import React, { Component } from 'react';
import axios from 'axios';
import mapboxgl from "mapbox-gl";
import './styles.css';



const mapbox_token = "pk.eyJ1IjoiaGFtbWFtaSIsImEiOiJjazkxbWZiZDUwMWJxM29vZW9qZHgzMWZxIn0.vAWREC4HJfCriqo04I831A"
mapboxgl.accessToken = mapbox_token;

const getColorFromAccCount = count => {
    if (count>68){
        console.log("red");
        return"red" ;
    }
    if (count >20){
        return "blue" ;
    
    }
    return "gray";
}
export class Map extends Component {
    constructor(props){
        super(props)
        this.state = {
            lng : 8.9,
            lat : 33.8,
            zoom : 2.5,
            
        };
        

    }
    
    

    
      

    componentDidMount(){
        axios.get("/api_acc/accident")
            .then(response => {
                const data_ = response.data ;
                data_
                //.filter(element => element.accidents > 20)
                .forEach(element => {
                    const { governorate , accidents , dead , injured , latitude , longitude } = element;
                    new mapboxgl.Marker({
                        color :  getColorFromAccCount(accidents)
                    })
                    .setLngLat([longitude, latitude]).addTo(map);
                });
            });
        const map = new mapboxgl.Map({
            container : this.mapContainer , 
            style : 'mapbox://style/mapbox/dark-v10',
            centre : [10 , 34],
            zoom : 3.5
        });
        map.on('move', () => {
            this.setState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2)
            });
            });
        
        };
        
    
    

    render() {
        
        
        return (
            
            
                <div className="body container">
                    <div>
                        Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
                    </div>
                    <div  ref ={e1 => this.mapContainer = e1} className="mapContainer" />
                </div>
                
               
            
        
            
            );
    }
}

export default Map;
