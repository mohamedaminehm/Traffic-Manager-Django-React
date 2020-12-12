import MapGL, {NavigationControl, Marker,Popup } from 'react-map-gl';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';

import React, { Component } from 'react';

import { fetchDirData1 , fetchDirData2 } from '../visualisation/api';

const mapboxgl =  require('mapbox-gl') ;
mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js');

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
    };
    
export class AlertMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
        viewport: {
        latitude: 36.81372976870191,
        longitude: 10.146607497680682,
        zoom: 16,
        bearing: 0,
        pitch: 0,
        width: '100%',
        height: 500,
        },
        markerList : [{
            lat: 36.81372976870191,
            long: 10.146607497680682,
            name: "Le Carfour de bardo1:",
            info: 'hors service' },
            {
            lat: 36.80221054988933,
            long: 10.111652949798602,
            name: "Le Carfour de DanDan:",
            info: 'hors service' },
            {
            lat: 36.807553758748746,
            long: 10.136983731735247,
            name: "Le Carfour de 20 mars :",
            info: 'hors service' },],
        popupInfo : null,
        coleur1 : 'blue',
        coleur2 : 'blue',
        etat : 'hors service',
        
    }
    };

    async componentDidMount(){
        const voie1 = await fetchDirData1();
        const voie2 = await fetchDirData2();
        const last_moy1 = voie1[ voie1.length - 1].moy_voiture;
        const last_moy2 = voie2[ voie2.length - 1].moy_voiture;
        
        if (last_moy1 && last_moy2){
            if(last_moy1 + last_moy2 < 2 ){ 
                this.setState({ coleur1 : '#388E3C' });
                this.setState( prevState => ({ markerList : prevState.markerList.map( obj => (obj.name === "Le Carfour de bardo1:" ? Object.assign(obj , { info :'pas de congestion' }) :  obj ) ) }) );
            }else if (last_moy1 + last_moy2 < 4){
                this.setState ({ coleur1 : 'yellow'  });
                this.setState( prevState => ({ markerList : prevState.markerList.map( obj => (obj.name === "Le Carfour de bardo1:" ? Object.assign(obj , { info :'passable' }) :  obj ) ) }) );
            }else { 
                this.setState({ coleur1 : 'red', });
                this.setState( prevState => ({ markerList : prevState.markerList.map( obj => (obj.name === "Le Carfour de bardo1:" ? Object.assign(obj , { info :'passage bloqué' }) :  obj ) ) }) );
            };
        }else { this.setState({ coleur1 : 'blue',  }) };
        
        
    }

    renderPopup(index){
        const {markerList} = this.state;
        return this.state.popupInfo && (
        <Popup tipSize={5}
        anchor="bottom-left"
        longitude={markerList[index].long}
        latitude={markerList[index].lat}
        onMouseLeave={() => this.setState({popupInfo: null})}
        closeOnClick={true}>
        <p><strong>{markerList[index].name}</strong><br/>
        [Etat de congestion]: {markerList[index].info}</p>
        </Popup>
        )
        }
    
    render() {
        const {markerList} = this.state;
        const {viewport} = this.state;
        const mapbox_token = "pk.eyJ1IjoiaGFtbWFtaSIsImEiOiJjazkxbWZiZDUwMWJxM29vZW9qZHgzMWZxIn0.vAWREC4HJfCriqo04I831A"
        
        return (
            <MapGL 
                {...viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
                                                    
                mapStyle="mapbox://styles/mapbox/dark-v10"
                mapboxApiAccessToken={mapbox_token}>
                <div className="nav" style={navStyle}>
                <NavigationControl onViewportChange={(viewport) => this.setState({viewport})}/>

                {markerList.map((marker, index)=>{
                return(<div key={index} >
                { marker.lat == 36.81372976870191 ?
                <Marker longitude={marker.long}
                latitude={marker.lat}>
                <DepartureBoardIcon style={{ color: this.state.coleur1 }} fontSize="large" onMouseEnter={()=>this.setState({popupInfo: true})}
                onMouseLeave={()=>this.setState({popupInfo: null})}/>
                </Marker>
                :
                <Marker longitude={marker.long}
                latitude={marker.lat}>
                <DepartureBoardIcon style={{ color: this.state.coleur2 }} fontSize="large" onMouseEnter={()=>this.setState({popupInfo: true})}
                onMouseLeave={()=>this.setState({popupInfo: null})}/>
                </Marker>
                 }
                
                {this.renderPopup(index)} </div> ); })}

                </div>
                
            </MapGL>
        )
    }
};

export default AlertMap;
