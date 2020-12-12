import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getImage,addImage } from '../../actions/round';
import { Redirect } from 'react-router-dom';
import Iframe from "react-iframe";


export class Rounds extends Component {
    static propTypes = {
        isAuthenticated : PropTypes.bool,
        getImage : PropTypes.func.isRequired ,
        addImage : PropTypes.func.isRequired,
        image : PropTypes.object.isRequired
    } 


    render() {
        if (this.props.isAuthenticated == false){
            return <Redirect to="/" />
        };
        return (
            <div>
                <Iframe url="http://127.0.0.1:8000/detect"
                    width="450px"
                    height="450px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                />
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,

});

export default connect(mapStateToProps, { getImage,addImage})(Rounds);
