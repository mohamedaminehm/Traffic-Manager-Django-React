import { ADD_IMAGE , GET_IMAGE } from './types';
import { createMessage } from './messages';

import axios from 'axios';
import { tokenConfig } from './auth';

//GET IMAGE
export const getImage = () => ( dispatch , getState ) => {
    axios 
        .get('/api_img/rounds' , tokenConfig(getState))

        .then(res => {
            dispatch({
                type : GET_IMAGE ,
                payload : res.data
            });
        })
        .catch(err => console.log(err))
};

//ADD IMAGE

export const addImage = (image) => (dispatch , getState) => {
    axios
        .post('/api_img/rounds', image , tokenConfig(getState))

        .then(res => {
            dispatch( createMessage({message : "image added"}));
            dispatch ({
                type : ADD_IMAGE ,
                dispatch : payload.data
            });

        })
        .catch(err => console.log(err))
}; 