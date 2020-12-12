import axios from 'axios';
import { returnErrors } from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// CHECK the token and load the USER
export const loadUser = () => (dispatch , getState) => {
    //User loading
    dispatch({ type: USER_LOADING });

    

    axios.get('/api/auth/user', tokenConfig(getState) )
        .then (res => {
            dispatch({
                type : USER_LOADED,
                payload : res.data
            });
        
        }).catch(err => {
            dispatch(returnErrors(err.response.data , err.response.status));
                dispatch({
                    type: AUTH_ERROR
                });
        });

}

// LOGIN USER
export const login = (username, password) => dispatch => {
    

    

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //Request BODY

    const body = JSON.stringify({username, password});
  

    axios.post('/api/auth/login', body , config)
        .then (res => {
            dispatch({
                type : LOGIN_SUCCESS,
                payload : res.data
            });
        
        }).catch(err => {
            dispatch(returnErrors(err.response.data , err.response.status));
                dispatch({
                    type: LOGIN_FAIL
                });
        });

};

//Register User
export const register = ({username, password, email}) => dispatch => {
    

    

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //Request BODY

    const body = JSON.stringify({username, email ,password});
  

    axios.post('/api/auth/register', body , config)
        .then (res => {
            dispatch({
                type : REGISTER_SUCCESS,
                payload : res.data
            });
        
        }).catch(err => {
            dispatch(returnErrors(err.response.data , err.response.status));
                dispatch({
                    type: REGISTER_FAIL
                });
        });

};

//LOGOUT USER

export const logout = () => (dispatch , getState) => {
   


    axios.post('/api/auth/logout', null, tokenConfig(getState))
        .then (res => {
            dispatch({
                type : LOGOUT_SUCCESS,
                payload : res.data
            });
        
        }).catch(err => {
            dispatch(returnErrors(err.response.data , err.response.status));
               
        });

};

//Setup config with token - helper function
export const tokenConfig = getState => {
    //GET token from state
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // If token ; add to header config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};


//setup config with token for form data - helper
export const tokenConfigForm = getState => {
    //GET token from state
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    // If token ; add to header config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};
